import { request as httpsRequest } from "node:https";
import { site } from "@/lib/site";

/**
 * POST JSON using node:https rather than fetch.
 *
 * Node's fetch (undici) parses HTTP with a WebAssembly build of llhttp. On
 * hosts that cap per-process virtual memory — like the production server — a
 * long-lived process can fail to instantiate that module, and every fetch dies
 * with "WebAssembly.instantiate(): Out of memory" before opening a socket.
 * node:https uses the native C++ parser and has no such dependency.
 */
function postJson(
  url: string,
  headers: Record<string, string>,
  body: string,
  timeoutMs = 15_000,
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const target = new URL(url);

    const req = httpsRequest(
      {
        hostname: target.hostname,
        port: target.port || 443,
        path: `${target.pathname}${target.search}`,
        method: "POST",
        headers: { ...headers, "Content-Length": Buffer.byteLength(body) },
      },
      (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode ?? 0, body: data }));
      },
    );

    req.setTimeout(timeoutMs, () => req.destroy(new Error(`Timed out after ${timeoutMs}ms`)));
    req.on("error", reject);
    req.end(body);
  });
}

/** Submissions are attacker-controlled — escape before embedding in the email. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type MailConfig = { apiKey: string; to: string[]; from: string };

/** Reads mail settings from the environment, or null if any are missing. */
export function mailConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return null;
  return { apiKey, from, to: to.split(",").map((address) => address.trim()) };
}

type Notification = {
  heading: string;
  subject: string;
  replyTo: string;
  rows: [label: string, value: string][];
  message?: string;
};

/** Sends an owner notification through Resend. Throws on failure. */
export async function sendNotification(config: MailConfig, n: Notification) {
  const rowHtml = n.rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:12px 24px;border-bottom:1px solid #241a08;color:#9c8a63;font-size:12px;letter-spacing:.12em;text-transform:uppercase;width:120px;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:12px 24px;border-bottom:1px solid #241a08;color:#f4e7c8;font-size:15px;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");

  const messageHtml = n.message
    ? `
      <tr>
        <td style="padding:16px 24px;color:#9c8a63;font-size:12px;letter-spacing:.12em;text-transform:uppercase;vertical-align:top;">Message</td>
        <td style="padding:16px 24px;color:#f4e7c8;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(n.message)}</td>
      </tr>`
    : "";

  const html = `
<div style="margin:0;padding:24px;background:#0b0907;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#12100c;border:1px solid #3a2606;border-radius:8px;overflow:hidden;">
    <div style="padding:18px 24px;background:#191309;border-bottom:1px solid #3a2606;">
      <p style="margin:0;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#d4af37;">
        ${escapeHtml(site.name)} — ${escapeHtml(n.heading)}
      </p>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
      ${rowHtml}${messageHtml}
    </table>
    <div style="padding:14px 24px;background:#0e0b07;border-top:1px solid #241a08;">
      <p style="margin:0;color:#7a6b4c;font-size:12px;">Reply directly to this email to respond to ${escapeHtml(n.replyTo)}.</p>
    </div>
  </div>
</div>`.trim();

  const text = [
    `${site.name} — ${n.heading}`,
    "",
    ...n.rows.map(([label, value]) => `${label}: ${value}`),
    ...(n.message ? ["", "Message:", n.message] : []),
  ].join("\n");

  const res = await postJson(
    "https://api.resend.com/emails",
    { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    JSON.stringify({
      from: config.from,
      to: config.to,
      reply_to: n.replyTo,
      subject: n.subject,
      html,
      text,
    }),
  );

  if (res.status < 200 || res.status >= 300) {
    throw new Error(`Resend returned HTTP ${res.status}: ${res.body.slice(0, 500)}`);
  }

  return (JSON.parse(res.body) as { id?: string }).id;
}

import { NextResponse } from "next/server";
import { mailConfig, sendNotification } from "@/lib/mail";
import { site } from "@/lib/site";

/**
 * One endpoint for every form on the site. `kind` selects the validation and
 * the notification email:
 *
 *   contact  — name, email, message
 *   apply    — name, email, goal, optional message
 *   recipes  — email only
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 254, message: 4000 } as const;

/**
 * Best-effort throttle: 5 submissions per IP per 10 minutes.
 *
 * This lives in module memory, so it resets on restart and is per-instance
 * rather than global. It deters casual abuse; put a real rate limiter or a
 * CAPTCHA in front if the site starts attracting spam.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) hits.clear(); // crude guard against unbounded growth
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Strip CR/LF so a submitted value can't inject extra email headers. */
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

const bad = (message = "Please check your details and try again.") =>
  NextResponse.json({ message }, { status: 400 });

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const kind = body.kind ?? "contact";
  if (kind !== "contact" && kind !== "apply" && kind !== "recipes") return bad();

  // Honeypot filled in => bot. Answer as if it worked, send nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ message: "Thanks — we'll be in touch." });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { message: "That's a few submissions already — please try again a little later." },
      { status: 429 },
    );
  }

  const str = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");

  const email = singleLine(str("email")).toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) return bad();

  const name = singleLine(str("name"));
  const message = str("message");
  const goal = singleLine(str("goal"));

  if (kind !== "recipes" && (!name || name.length > LIMITS.name)) return bad();
  if (message.length > LIMITS.message) return bad();
  if (kind === "contact" && !message) return bad();
  if (kind === "apply" && !(site.goals as readonly string[]).includes(goal)) return bad();

  const config = mailConfig();
  if (!config) {
    console.error("[contact] Missing config. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.");
    return NextResponse.json(
      { message: "This form isn't connected yet. Please message us on Instagram." },
      { status: 503 },
    );
  }

  const notification =
    kind === "apply"
      ? {
          heading: "Coaching application",
          subject: `Coaching application: ${name} — ${goal}`,
          rows: [
            ["Name", name],
            ["Email", email],
            ["Goal", goal],
          ] as [string, string][],
          message: message || undefined,
          success: "Application received. We'll review it and be in touch personally.",
        }
      : kind === "recipes"
        ? {
            heading: "Recipe subscriber",
            subject: `New recipe subscriber: ${email}`,
            rows: [["Email", email]] as [string, string][],
            message: undefined,
            success: "You're on the list — recipes are on their way.",
          }
        : {
            heading: "New message",
            subject: `New message from ${name}`,
            rows: [
              ["Name", name],
              ["Email", email],
            ] as [string, string][],
            message,
            success: "Message sent. We'll get back to you soon.",
          };

  try {
    const id = await sendNotification(config, { ...notification, replyTo: email });
    console.info(`[contact] ${kind} sent`, id);
  } catch (error) {
    // undici and node:https both bury the real reason in `cause` — surface it.
    const err = error as Error & { cause?: unknown };
    console.error(`[contact] ${kind} failed:`, err?.message, "| cause:", err?.cause);
    return NextResponse.json(
      { message: "We couldn't send that just now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: notification.success });
}

"use client";

import { useState } from "react";

export type FormKind = "contact" | "apply" | "recipes";
export type FormState = "idle" | "submitting" | "success" | "error";

/**
 * Posts a form to /api/contact and tracks its state. Every form on the site
 * shares the endpoint; `kind` tells the server which fields to expect.
 */
export function useSubmit(kind: FormKind) {
  const [state, setState] = useState<FormState>("idle");
  const [note, setNote] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());

    setState("submitting");
    setNote("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, kind }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };

      if (!res.ok) {
        setState("error");
        setNote(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setState("success");
      setNote(data.message ?? "Thanks — we'll be in touch.");
      form.reset();
    } catch {
      setState("error");
      setNote("Network hiccup — please try again in a moment.");
    }
  }

  return { state, note, onSubmit };
}

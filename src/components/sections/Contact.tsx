"use client";

import { FormNote, Honeypot, SubmitButton } from "../FormBits";
import { useSubmit } from "../useSubmit";

export default function Contact() {
  const { state, note, onSubmit } = useSubmit("contact");

  return (
    <section
      id="contact"
      className="border-t border-line py-20 sm:py-28"
      style={{ background: "radial-gradient(circle at 10% 30%, rgba(212,175,55,.07), transparent 30%), #070707" }}
    >
      <div className="shell grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow" data-reveal>
            Contact Team Bodymechanik
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            Got a question?
            <br />
            <span className="shine-text">Get in touch.</span>
          </h2>
          <p className="copy mt-5" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            Not ready to apply yet? Send us a message and we can point you in the right direction.
          </p>
        </div>

        <form className="form-panel" onSubmit={onSubmit} noValidate data-reveal="right">
          <label className="field-label">
            Full Name
            <input className="field" type="text" name="name" autoComplete="name" required maxLength={100} />
          </label>
          <label className="field-label">
            Email
            <input className="field" type="email" name="email" autoComplete="email" required maxLength={254} />
          </label>
          <label className="field-label">
            Message
            <textarea className="field resize-y" name="message" rows={5} required maxLength={4000} />
          </label>
          <Honeypot />
          <SubmitButton state={state}>Contact Us</SubmitButton>
          <FormNote state={state} note={note} fallback="We usually reply within a day." />
        </form>
      </div>
    </section>
  );
}

"use client";

import { FormNote, Honeypot, SubmitButton } from "../FormBits";
import { useSubmit } from "../useSubmit";
import { site } from "@/lib/site";

export default function Apply() {
  const { state, note, onSubmit } = useSubmit("apply");

  return (
    <section
      id="apply"
      className="relative overflow-hidden border-t border-line py-20 sm:py-28"
      style={{ background: "linear-gradient(135deg, #090909 0%, #111 52%, #080808 100%)" }}
    >
      <div className="glow top-0 right-[5%] size-[350px]" aria-hidden="true" />
      <div className="shell relative z-[2] grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow" data-reveal>
            Ready to transform?
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            Your next phase
            <br />
            <span className="shine-text">starts here.</span>
          </h2>
          <p className="copy mt-5" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            Apply for Team Bodymechanik coaching and tell us exactly what you want to achieve.
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
            Main Goal
            <select className="field" name="goal" required defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              {site.goals.map((goal) => (
                <option key={goal}>{goal}</option>
              ))}
            </select>
          </label>
          <label className="field-label">
            Tell us about your goal
            <textarea className="field resize-y" name="message" rows={4} maxLength={4000} />
          </label>
          <Honeypot />
          <SubmitButton state={state}>Apply for Coaching</SubmitButton>
          <FormNote state={state} note={note} fallback="Every application is reviewed personally by Coach Krish and Coach Nicky." />
        </form>
      </div>
    </section>
  );
}

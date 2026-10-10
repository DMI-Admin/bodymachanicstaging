"use client";

import { useState } from "react";
import { FormNote, Honeypot, SubmitButton } from "../FormBits";
import { useSubmit } from "../useSubmit";
import { site } from "@/lib/site";

/**
 * One form for both the coaching application and general questions. The
 * select is literally named `kind`, so its value is what the API receives and
 * validates against ("apply" needs a goal, "contact" needs a message).
 */
export default function Enquiry() {
  const [kind, setKind] = useState<"apply" | "contact">("apply");
  const { state, note, onSubmit } = useSubmit(kind);
  const applying = kind === "apply";

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line py-20 sm:py-28"
      style={{ background: "linear-gradient(135deg, #090909 0%, #111 52%, #080808 100%)" }}
    >
      <div className="glow top-0 right-[5%] size-[350px]" aria-hidden="true" />

      {/* Both "Apply" and "Contact Us" links land here */}
      <span id="apply" className="absolute -top-20" aria-hidden="true" />

      <div className="shell relative z-[2] grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow" data-reveal>
            1:1 coaching &amp; questions
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            Want it fully
            <br />
            <span className="shine-text">personalised?</span>
          </h2>
          <p className="copy mt-5" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            Apply for 1:1 coaching and tell us exactly what you want to achieve — or send us a question about the
            membership or coaching.
          </p>

          <ul className="mt-8 grid list-none gap-3 p-0">
            {[
              "Every enquiry is read personally by your coaches",
              "We reply with honest advice, not a sales script",
              `1:1 coaching: ${site.plans.coaching.price} per month, ${site.plans.coaching.terms}`,
            ].map((line, i) => (
              <li
                key={line}
                className="check-item text-[15px] text-[#e6e0d2]"
                data-reveal="left"
                style={{ "--d": `${200 + i * 80}ms` } as React.CSSProperties}
              >
                {line}
              </li>
            ))}
          </ul>
        </div>

        <form className="form-panel" onSubmit={onSubmit} noValidate data-reveal="right">
          <label className="field-label">
            What&rsquo;s this about?
            <select
              className="field"
              name="kind"
              value={kind}
              onChange={(e) => setKind(e.target.value as "apply" | "contact")}
            >
              <option value="apply">Applying for 1:1 coaching</option>
              <option value="contact">A general question</option>
            </select>
          </label>

          <label className="field-label">
            Full Name
            <input className="field" type="text" name="name" autoComplete="name" required maxLength={100} />
          </label>

          <label className="field-label">
            Email
            <input className="field" type="email" name="email" autoComplete="email" required maxLength={254} />
          </label>

          {/* Only applications need a goal — animate it in rather than jumping */}
          <div className="field-reveal" data-open={applying}>
            <div>
              <label className="field-label pb-[1px]">
                Main Goal
                <select className="field" name="goal" required={applying} disabled={!applying} defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  {site.goals.map((goal) => (
                    <option key={goal}>{goal}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <label className="field-label">
            {applying ? "Tell us about your goal" : "Message"}
            <textarea
              className="field resize-y"
              name="message"
              rows={4}
              required={!applying}
              maxLength={4000}
              placeholder={applying ? "Where you're starting from, and what you want to achieve" : "How can we help?"}
            />
          </label>

          <Honeypot />
          <SubmitButton state={state}>{applying ? "Apply for 1:1 Coaching" : "Send Message"}</SubmitButton>
          <FormNote
            state={state}
            note={note}
            fallback={
              applying
                ? "Every application is reviewed personally by Coach Krish and Coach Nicky."
                : "We usually reply within a day."
            }
          />
        </form>
      </div>
    </section>
  );
}

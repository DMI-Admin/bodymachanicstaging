"use client";

import { FormNote, Honeypot, SubmitButton } from "../FormBits";
import { useSubmit } from "../useSubmit";

export default function RecipeStrip() {
  const { state, note, onSubmit } = useSubmit("recipes");

  return (
    <section
      id="recipes"
      className="relative overflow-hidden border-b border-line py-16 sm:py-20"
      style={{
        background:
          "radial-gradient(circle at 15% 50%, rgba(212,175,55,.13), transparent 30%), linear-gradient(100deg, #080808, #10100d 50%, #070707)",
      }}
    >
      <div className="shell grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-20">
        <div>
          <p className="eyebrow" data-reveal>
            New from Team Bodymechanik
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            Recipes that fit
            <br />
            <span className="shine-text">your goals.</span>
          </h2>
          <p className="copy mt-5" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            Subscribe for high-protein recipes, macro-friendly desserts, meal ideas and healthier Desi favourites from
            Team Bodymechanik.
          </p>
        </div>

        <form
          className="form-panel"
          onSubmit={onSubmit}
          noValidate
          data-reveal="right"
          style={{ "--d": "150ms" } as React.CSSProperties}
        >
          <label className="field-label">
            Your email address
            <input className="field" type="email" name="email" placeholder="you@example.com" autoComplete="email" required maxLength={254} />
          </label>
          <Honeypot />
          <SubmitButton state={state}>Subscribe to Recipes</SubmitButton>
          <FormNote state={state} note={note} fallback="No spam — just recipes worth making." />
        </form>
      </div>
    </section>
  );
}

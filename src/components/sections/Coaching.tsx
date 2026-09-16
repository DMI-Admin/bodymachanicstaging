import { site } from "@/lib/site";

export default function Coaching() {
  return (
    <section id="coaching" className="py-20 sm:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow" data-reveal>
            Our coaching programme
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            More than a plan.
            <br />
            <span className="shine-text">It&rsquo;s a system.</span>
          </h2>
          <p className="copy mt-6" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            We don&rsquo;t believe in random workouts, crash diets or one-size-fits-all plans. Your coaching is built
            around your body, your schedule, your training ability and the result you want to achieve.
          </p>

          <ul className="my-8 grid list-none gap-3 p-0">
            {site.coaching.map((item, i) => (
              <li
                key={item}
                className="check-item text-[#e6e0d2]"
                data-reveal="left"
                style={{ "--d": `${200 + i * 70}ms` } as React.CSSProperties}
              >
                {item}
              </li>
            ))}
          </ul>

          <div data-reveal style={{ "--d": "300ms" } as React.CSSProperties}>
            <a className="btn" href="#apply">
              Start Your Application
            </a>
          </div>
        </div>

        <div
          className="card flex flex-col justify-center p-7 sm:p-12 lg:min-h-[480px]"
          data-reveal="right"
          data-accent="true"
          style={{ "--d": "150ms" } as React.CSSProperties}
        >
          <p className="eyebrow">TBM Recipes</p>
          <h3 className="display text-[clamp(32px,4vw,44px)]">
            High-protein food.
            <br />
            <span>Without boring meals.</span>
          </h3>
          <p className="my-6 max-w-[480px] text-muted">
            Get Team Bodymechanik recipes, macro-friendly ideas and healthier versions of the foods you actually want
            to eat.
          </p>
          <a className="btn self-start" href="#recipes">
            Subscribe to Recipes
          </a>
        </div>
      </div>
    </section>
  );
}

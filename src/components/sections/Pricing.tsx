import { ArrowRightIcon } from "../icons";
import { site } from "@/lib/site";

/** Two ways to work with TBM: the membership (main offer) and 1:1 coaching. */
export default function Pricing() {
  const { membership, coaching } = site.plans;
  const plans = [
    { ...membership, featured: true, external: true },
    { ...coaching, featured: false, external: false },
  ];

  return (
    <section
      id="pricing"
      className="border-t border-line py-20 sm:py-28"
      style={{ background: "radial-gradient(circle at 50% 0, rgba(212,175,55,.09), transparent 34%), #080808" }}
    >
      <div className="shell max-w-[1040px]">
        <div className="mb-12 text-center sm:mb-14">
          <p className="eyebrow" data-reveal>
            Pricing
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            Choose how you <span className="shine-text">start</span>
          </h2>
          <p className="copy mx-auto mt-4" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            Start with the membership, or apply for fully personalised 1:1 coaching.
          </p>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-2">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className="card flex flex-col p-7 sm:p-9"
              data-accent={plan.featured ? "true" : undefined}
              data-reveal={i === 0 ? "left" : "right"}
            >
              <span
                className={`self-start border px-2.5 py-1 text-[10px] font-black tracking-[0.14em] uppercase ${
                  plan.featured ? "border-gold bg-gold text-ink" : "border-line text-muted"
                }`}
              >
                {plan.badge}
              </span>
              <h3 className="display mt-4 text-[clamp(26px,3vw,32px)] text-gold-2">{plan.name}</h3>

              <p className="mt-5 flex items-baseline gap-1.5">
                <strong className="font-display text-[52px] leading-none text-cream">{plan.price}</strong>
                <span className="text-sm text-muted">{plan.period}</span>
              </p>

              <p className="mt-4 text-[15px] text-muted">{plan.blurb}</p>

              <ul className="my-7 grid list-none gap-3 p-0">
                {plan.features.map((f) => (
                  <li key={f} className="check-item text-[15px] text-[#e6e0d2]">
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                {...(plan.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`btn group mt-auto w-full justify-center ${plan.featured ? "" : "btn-outline"}`}
              >
                {plan.cta}
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

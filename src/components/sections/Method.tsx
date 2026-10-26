import { site } from "@/lib/site";

export default function Method() {
  return (
    <section
      id="method"
      className="border-y border-line py-20 sm:py-28"
      style={{ background: "radial-gradient(circle at 50% 0, rgba(212,175,55,.09), transparent 30%), #0b0b0b" }}
    >
      <div className="shell">
        <div className="mb-12 text-center sm:mb-14">
          <p className="eyebrow" data-reveal>
            How it works
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {site.method.heading.plain} <span className="shine-text">{site.method.heading.gold}</span>
          </h2>
        </div>

        <ol className="relative grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line through the numbers on desktop */}
          <span
            className="absolute top-[63px] right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent lg:block"
            data-reveal="scale"
            aria-hidden="true"
          />
          {site.method.steps.map((step, i) => (
            <li
              key={step.title}
              className="card p-7 lg:min-h-[295px]"
              data-reveal
              style={{ "--d": `${i * 120}ms` } as React.CSSProperties}
            >
              <div className="num-ring relative mb-10 bg-[#0b0b0b] lg:mb-14">0{i + 1}</div>
              <h3 className="display text-[28px] text-gold-2">{step.title}</h3>
              <p className="mt-3 text-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

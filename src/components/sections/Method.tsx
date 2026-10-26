import { site } from "@/lib/site";

export default function Method() {
  return (
    <section
      id="method"
      className="border-y border-line py-16 sm:py-24"
      style={{ background: "radial-gradient(circle at 50% 0, rgba(212,175,55,.09), transparent 30%), #0b0b0b" }}
    >
      <div className="shell">
        <div className="mb-8 text-center sm:mb-12">
          <p className="eyebrow" data-reveal>
            How it works
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {site.method.heading.plain} <span className="shine-text">{site.method.heading.gold}</span>
          </h2>
        </div>

        {/* Phones: a tight list, number beside each step. Tablet and up: short cards. */}
        <ol className="grid list-none gap-3 p-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {site.method.steps.map((step, i) => (
            <li
              key={step.title}
              className="card flex items-start gap-4 p-5 sm:flex-col sm:gap-5 sm:p-6"
              data-reveal
              style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
            >
              <div className="num-ring num-ring--sm flex-none bg-[#0b0b0b]">0{i + 1}</div>
              <div>
                <h3 className="display text-[22px] text-gold-2 sm:text-2xl">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { ArrowRightIcon, Glyph } from "../icons";
import { site } from "@/lib/site";

export default function Included() {
  const { included, pricing } = site;

  return (
    <section
      id="included"
      className="border-t border-line py-20 sm:py-28"
      style={{
        background:
          "radial-gradient(circle at 50% 0, rgba(212,175,55,.08), transparent 32%), linear-gradient(180deg,#0a0a0a,#060606)",
      }}
    >
      <div className="shell">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="display h2" data-reveal>
            <span className="shine-text">{included.title}</span>
          </h2>
          <p className="copy mx-auto mt-4" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            {included.subtitle}
          </p>
        </div>

        {/* Two columns with a gold divider between them, as on the flyer */}
        {/* grid-flow-col keeps the flyer's grouping: items 1-4 left, 5-8 right */}
        <ul className="grid list-none gap-x-12 gap-y-9 p-0 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-4 lg:gap-x-16">
          {included.items.map((item, i) => (
            <li
              key={item.title}
              className={`group flex gap-4 sm:gap-5 ${
                i >= 4 ? "lg:border-l lg:border-line lg:pl-12 xl:pl-16" : ""
              }`}
              data-reveal={i % 2 === 0 ? "left" : "right"}
              style={{ "--d": `${(i % 4) * 90}ms` } as React.CSSProperties}
            >
              <span className="grid size-14 flex-none place-items-center rounded-full border border-gold/70 bg-ink text-gold-2 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:border-gold-2 group-hover:bg-gold group-hover:text-ink">
                <Glyph name={item.icon} className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-base tracking-[0.04em] text-gold-2 uppercase sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Pricing band */}
        <div
          id="pricing"
          className="card mt-14 flex flex-col items-center gap-7 p-7 sm:mt-16 sm:p-10 lg:flex-row lg:gap-12"
          data-accent="true"
          data-reveal="scale"
        >
          <p className="font-display text-center text-[clamp(26px,4vw,38px)] leading-[1.05] text-gold-2 uppercase lg:text-left">
            {pricing.script}
          </p>

          <div className="flex flex-1 flex-col items-center gap-6 sm:flex-row sm:justify-center lg:justify-start">
            {pricing.terms.map((term) => (
              <div key={term.label} className="flex items-center gap-3">
                <Glyph name={term.icon} className="size-7 flex-none text-gold-2" />
                <span>
                  <strong className="block font-display text-xl text-cream uppercase">{term.value}</strong>
                  <span className="text-[11px] tracking-[0.12em] whitespace-nowrap text-muted uppercase">{term.label}</span>
                </span>
              </div>
            ))}
          </div>

          <a href="#apply" className="btn group w-full px-7 lg:w-auto">
            {pricing.cta}
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <p className="mt-5 text-center text-sm text-muted" data-reveal>
          {pricing.note}
        </p>
      </div>
    </section>
  );
}

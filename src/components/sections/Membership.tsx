import { ArrowRightIcon, Glyph } from "../icons";
import { site } from "@/lib/site";

/** What members get inside the membership, then a join prompt. */
export default function Membership() {
  const { inside, membership } = site;

  return (
    <section
      id="membership"
      className="border-t border-line py-20 sm:py-28"
      style={{
        background:
          "radial-gradient(circle at 50% 0, rgba(212,175,55,.08), transparent 32%), linear-gradient(180deg,#0a0a0a,#060606)",
      }}
    >
      <div className="shell">
        <div className="mb-12 text-center sm:mb-16">
          <p className="eyebrow" data-reveal>
            The membership
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            <span className="shine-text">{inside.title}</span>
          </h2>
          <p className="copy mx-auto mt-4" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            {inside.subtitle}
          </p>
        </div>

        {/* Two columns with a gold divider; items 1-4 left, 5-8 right */}
        <ul className="grid list-none gap-x-12 gap-y-9 p-0 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-4 lg:gap-x-16">
          {inside.items.map((item, i) => (
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

        {/* Join band */}
        <div
          className="card mt-14 flex flex-col items-center gap-7 p-7 sm:mt-16 sm:p-10 xl:flex-row xl:gap-12"
          data-accent="true"
          data-reveal="scale"
        >
          <div className="text-center xl:text-left">
            <p className="font-display text-[clamp(26px,4vw,38px)] leading-[1.05] text-gold-2 uppercase">
              Team Bodymechanik <span className="text-cream">Membership</span>
            </p>
            <p className="mt-2 text-sm text-muted">{membership.tagline}</p>
          </div>

          <div className="flex flex-1 items-center justify-center gap-3 xl:justify-start">
            <strong className="font-display text-[44px] leading-none text-cream">{membership.price}</strong>
            <span>
              <span className="block text-[11px] tracking-[0.12em] whitespace-nowrap text-muted uppercase">per {membership.period}</span>
              <span className="block text-[11px] tracking-[0.12em] whitespace-nowrap text-gold-2 uppercase">{membership.priceNote}</span>
            </span>
          </div>

          <a
            href={membership.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn group w-full px-7 py-3 text-center leading-tight whitespace-normal xl:w-auto"
          >
            {membership.cta}
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

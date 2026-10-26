import { Glyph } from "../icons";
import { site } from "@/lib/site";

/** What members get inside the membership. */
export default function Membership() {
  const { inside } = site;

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
      </div>
    </section>
  );
}

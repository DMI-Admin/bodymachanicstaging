import { Glyph } from "../icons";
import { site } from "@/lib/site";

/** The five outcomes strip, sitting under the stats bar. */
export default function Outcomes() {
  return (
    <section id="outcomes" className="border-b border-line py-12 sm:py-16" aria-label="What coaching delivers">
      <div className="shell">
        <p className="eyebrow text-center" data-reveal>
          {site.promise}
        </p>

        <ul className="mt-8 grid list-none grid-cols-2 gap-x-4 gap-y-8 p-0 sm:grid-cols-3 lg:grid-cols-5">
          {site.outcomes.map((item, i) => (
            <li
              key={item.line2}
              className="group flex flex-col items-center gap-3 text-center"
              data-reveal
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
            >
              <span className="grid size-[62px] place-items-center rounded-full border border-gold text-gold-2 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:bg-gold group-hover:text-ink group-hover:shadow-[0_0_30px_rgba(212,175,55,.4)]">
                <Glyph name={item.icon} className="size-7" />
              </span>
              <span className="font-display text-sm leading-tight tracking-[0.06em] text-cream uppercase sm:text-base">
                {item.line1}
                <br />
                {item.line2}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

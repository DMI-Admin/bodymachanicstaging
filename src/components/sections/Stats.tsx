import { site } from "@/lib/site";

export default function Stats() {
  const ticker = [...site.ticker, ...site.ticker];

  return (
    <>
      <section className="border-b border-line bg-[#090909]" aria-label="What you get">
        <div className="shell grid grid-cols-2 lg:grid-cols-4">
          {site.stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              className={[
                "border-line px-3 py-7 text-center",
                i % 2 === 0 ? "border-r" : "",
                i < 2 ? "border-b lg:border-b-0" : "",
                i === 1 ? "lg:border-r" : "",
              ].join(" ")}
            >
              <strong className="block font-display text-[clamp(22px,4vw,30px)] text-gold-2 uppercase">
                {stat.value}
              </strong>
              <span className="mt-1 block text-[11px] tracking-[0.09em] text-muted uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="overflow-hidden border-b border-line bg-gradient-to-r from-[#8f6812] via-gold to-[#8f6812] py-3" aria-hidden="true">
        <div className="ticker">
          {ticker.map((word, i) => (
            <span key={i} className="flex items-center font-display text-lg tracking-[0.12em] whitespace-nowrap text-ink uppercase">
              <span className="px-6">{word}</span>
              <span className="size-1.5 rotate-45 bg-ink" />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

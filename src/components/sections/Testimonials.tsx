import { QuoteIcon } from "../icons";
import { site } from "@/lib/site";

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-line py-20 sm:py-28">
      <div className="shell">
        <div className="mb-12 text-center sm:mb-14">
          <p className="eyebrow" data-reveal>
            Client love
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            What our clients <span className="shine-text">say</span>
          </h2>
          <p className="copy mx-auto mt-4" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            Real feedback from Team Bodymechanik clients about the programme, coaching, confidence, consistency and
            results.
          </p>
        </div>

        <div className="testimonial-track sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {site.testimonials.map((t, i) => {
            const featured = "featured" in t && t.featured;
            return (
              <blockquote
                key={t.name}
                className="card m-0 flex flex-col p-7 sm:p-8"
                data-accent={featured || undefined}
                data-reveal
                style={{ "--d": `${(i % 3) * 110}ms` } as React.CSSProperties}
              >
                <QuoteIcon className="mb-5 h-7 w-9 text-gold-2" />
                <p className={`m-0 flex-1 leading-[1.75] text-[#e8e3d9] text-[15px]`}>
                  {t.quote}
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-gold-2 to-gold-3 font-display text-lg text-ink">
                    {t.name[0]}
                  </span>
                  <cite className="text-xs font-extrabold tracking-[0.08em] text-gold-2 not-italic uppercase">
                    {t.name}
                    <span className="mt-0.5 block text-[10px] font-semibold tracking-normal text-muted normal-case">
                      Team Bodymechanik client
                    </span>
                  </cite>
                </footer>
              </blockquote>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs text-muted sm:hidden">Swipe for more →</p>
      </div>
    </section>
  );
}

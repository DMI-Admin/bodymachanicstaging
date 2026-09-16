import Image from "next/image";
import { InstagramIcon } from "../icons";
import { site } from "@/lib/site";

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-line py-20 sm:py-28"
      style={{ background: "linear-gradient(90deg, rgba(212,175,55,.05), transparent 35%), #080808" }}
    >
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="frame group overflow-hidden" data-reveal="left">
          <div className="overflow-hidden">
            <Image
              src="/images/coach-krish-nicky.webp"
              alt="Coach Krish and Coach Nicky"
              width={880}
              height={1563}
              className="h-[clamp(440px,70vw,620px)] w-full object-cover object-[center_30%] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
          </div>
          <div className="absolute right-6 bottom-6 left-6 border border-line bg-ink/85 px-5 py-4 backdrop-blur">
            <span className="block text-[10px] font-black tracking-[0.18em] text-gold-2 uppercase">Your coaches</span>
            <strong className="mt-1 block font-display text-[22px] uppercase">Coach Krish &amp; Coach Nicky</strong>
          </div>
        </div>

        <div>
          <p className="eyebrow" data-reveal>
            About Team Bodymechanik
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            We coach.
            <br />
            We care.
            <br />
            <span className="shine-text">We get results.</span>
          </h2>
          <p className="copy mt-6" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            Team Bodymechanik is built around high-standard coaching, personal accountability and a clear system that
            removes the guesswork from body transformation.
          </p>
          <p className="copy mt-4" data-reveal style={{ "--d": "220ms" } as React.CSSProperties}>
            You will know exactly what to do, why you are doing it and what needs to change as your body progresses.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5" data-reveal style={{ "--d": "280ms" } as React.CSSProperties}>
            {site.socials.map((s, i) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gold px-3.5 py-2.5 text-[11px] font-extrabold tracking-[0.08em] text-gold-2 uppercase transition-colors hover:bg-gold hover:text-ink"
              >
                <InstagramIcon className="size-4" />
                {i === 0 ? "Team Bodymechanik" : "Coach Krish"}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

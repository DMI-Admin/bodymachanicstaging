import Image from "next/image";
import { ArrowRightIcon } from "../icons";
import { site } from "@/lib/site";

// Fixed positions so server and client render identically.
const EMBERS = [
  { left: "58%", dur: "11s", delay: "0s", drift: "30px" },
  { left: "66%", dur: "9s", delay: "2.5s", drift: "-24px" },
  { left: "72%", dur: "13s", delay: "1.2s", drift: "18px" },
  { left: "80%", dur: "10s", delay: "4s", drift: "-30px" },
  { left: "88%", dur: "12s", delay: "6s", drift: "22px" },
  { left: "12%", dur: "14s", delay: "3s", drift: "26px" },
  { left: "34%", dur: "12s", delay: "7s", drift: "-18px" },
  { left: "50%", dur: "15s", delay: "5s", drift: "14px" },
];

const LINES = site.hero.lines;

export default function Hero() {
  return (
    <section className="hero border-b border-line pt-[84px]">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="glow top-[5%] right-[5%] size-[350px]" aria-hidden="true" />
      <div className="glow -bottom-40 left-0 size-[350px]" style={{ animationDelay: "-4s" }} aria-hidden="true" />
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="ember"
          aria-hidden="true"
          style={{ left: e.left, "--dur": e.dur, "--delay": e.delay, "--drift": e.drift } as React.CSSProperties}
        />
      ))}

      <div className="shell relative z-[2] grid items-center gap-8 py-10 lg:min-h-[calc(100svh-84px)] lg:grid-cols-[1.15fr_.85fr] lg:gap-12 lg:py-16">
        <div>
          <p
            className="fade-up mb-4 flex items-center gap-3 font-display text-[11px] tracking-[0.3em] text-gold-2 uppercase sm:text-xs"
            style={{ "--d": "60ms" } as React.CSSProperties}
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold" aria-hidden="true" />
            {site.motto}
          </p>

          <p className="eyebrow fade-up" style={{ "--d": "100ms" } as React.CSSProperties}>
            {site.hero.eyebrow}
          </p>

          <h1 className="display text-[clamp(44px,11.5vw,76px)] tracking-[-0.03em] lg:text-[clamp(56px,5.6vw,88px)]">
            {LINES.map((line, i) => (
              <span key={line.text} className="line-mask">
                <span
                  className={line.gold ? "shine-text" : undefined}
                  style={{ "--d": `${200 + i * 130}ms` } as React.CSSProperties}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="copy fade-up mt-7 mb-8" style={{ "--d": "650ms" } as React.CSSProperties}>
            {site.hero.lead}
          </p>

          <div
            className="fade-up flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5"
            style={{ "--d": "780ms" } as React.CSSProperties}
          >
            <a className="btn" href={site.membership.url} target="_blank" rel="noopener noreferrer">
              Join for {site.membership.price}/{site.membership.period}
            </a>
            <a className="btn btn-outline" href="#results">
              See the Results
            </a>
            <a
              className="group inline-flex items-center justify-center gap-2 py-2 text-[13px] font-extrabold text-[#e4c55a] hover:text-gold-2"
              href="#pricing"
            >
              Prefer 1:1 coaching?
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {site.hero.features.map((f, i) => (
              <div
                key={f.title}
                className="fade-up flex items-start gap-3 border-t border-line pt-4"
                style={{ "--d": `${900 + i * 110}ms` } as React.CSSProperties}
              >
                <span className="grid size-[34px] flex-none place-items-center rounded-full border border-gold font-display text-[13px] text-gold-2">
                  0{i + 1}
                </span>
                <div>
                  <strong className="block text-xs uppercase">{f.title}</strong>
                  <small className="mt-0.5 block text-[11px] leading-snug text-muted">{f.text}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="logo-stage order-first mx-auto w-[min(78vw,420px)] lg:order-none lg:w-full lg:max-w-[560px]">
          <div className="logo-halo" aria-hidden="true" />
          <div className="logo-ring" aria-hidden="true" />
          <div className="logo-ring logo-ring--inner" aria-hidden="true" />
          <Image
            className="hero-logo h-auto w-full"
            src="/images/tbm-logo.webp"
            alt="Team Bodymechanik gold logo"
            width={640}
            height={640}
            priority
          />
        </div>
      </div>

    </section>
  );
}

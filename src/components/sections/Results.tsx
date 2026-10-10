"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronIcon, CloseIcon, PlusIcon } from "../icons";
import { site } from "@/lib/site";

const items = site.transformations;

export default function Results() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback((dir: number) => setIndex((i) => (i + dir + items.length) % items.length), []);

  // Arrow keys page through results while the lightbox is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const current = items[index];

  return (
    <section id="results" className="py-20 sm:py-28">
      <div className="shell">
        <div className="mb-12 text-center sm:mb-14">
          <p className="eyebrow" data-reveal>
            Real people. Real results.
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            <span className="shine-text">Transformations</span>
          </h2>
          <p className="copy mx-auto mt-4" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            Before-and-after results from Team Bodymechanik clients. Tap any result to see it full size.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => open(i)}
              className="result-card card block overflow-hidden p-0 text-left"
              data-reveal="scale"
              style={{ "--d": `${(i % 3) * 110}ms` } as React.CSSProperties}
              aria-label={`View ${item.title} full size`}
            >
              <div className="relative aspect-square overflow-hidden bg-ink-2">
                <Image src={item.src} alt={item.alt} width={900} height={900} className="h-full w-full object-cover" />
                <span className="absolute bottom-3.5 left-3.5 border border-gold bg-ink/85 px-2.5 py-2 text-[9px] font-black tracking-[0.12em] text-gold-2 uppercase backdrop-blur">
                  Real client result
                </span>
                <span className="zoom-hint absolute top-3.5 right-3.5 grid size-10 place-items-center rounded-full border border-gold bg-ink/80 text-gold-2">
                  <PlusIcon className="size-4" />
                </span>
              </div>
              <div className="flex min-h-[70px] items-center justify-between gap-5 border-t border-line px-5">
                <strong className="text-[13px] text-cream uppercase">{item.title}</strong>
                <span className="text-xs text-gold-2">Team Bodymechanik Coaching</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center" data-reveal>
          <p className="copy mx-auto">
            Get the same training, nutrition and coach support inside the {site.membership.name}.
          </p>
          <a className="btn" href={site.membership.url} target="_blank" rel="noopener noreferrer">
            Start for {site.membership.price}/{site.membership.period}
          </a>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Transformation viewer"
        onClick={(e) => e.target === dialogRef.current && close()}
      >
        <div className="relative">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={900}
            height={900}
            className="block h-auto max-h-[80svh] w-full object-contain"
          />
          <button
            type="button"
            onClick={close}
            className="absolute top-3 right-3 grid size-10 place-items-center rounded-full border border-gold bg-ink/85 text-gold-2 hover:bg-gold hover:text-ink"
            aria-label="Close"
          >
            <CloseIcon className="size-4" />
          </button>
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => step(dir)}
              className={`absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-gold bg-ink/85 text-gold-2 hover:bg-gold hover:text-ink ${dir < 0 ? "left-3" : "right-3"}`}
              aria-label={dir < 0 ? "Previous result" : "Next result"}
            >
              <ChevronIcon className={`size-5 ${dir > 0 ? "rotate-180" : ""}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-line px-5 py-3.5 text-sm">
          <strong className="text-cream uppercase">{current.title}</strong>
          <span className="text-muted">
            {index + 1} / {items.length}
          </span>
        </div>
      </dialog>
    </section>
  );
}

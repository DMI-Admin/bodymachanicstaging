"use client";

import { useId, useState } from "react";
import { site } from "@/lib/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section id="faq" className="border-t border-line bg-[#090909] py-20 sm:py-28">
      <div className="shell max-w-[900px]">
        <div className="mb-10 text-center sm:mb-12">
          <p className="eyebrow" data-reveal>
            FAQ
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            Before you <span className="shine-text">apply</span>
          </h2>
        </div>

        <div className="border-t border-line">
          {site.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-line" data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                <h3 className="m-0">
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={`flex w-full items-center justify-between gap-6 py-6 text-left text-base font-extrabold transition-colors sm:text-lg ${isOpen ? "text-gold-2" : "text-[#eee8db] hover:text-gold-2"}`}
                  >
                    {item.q}
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`} className="faq-panel" data-open={isOpen}>
                  <div inert={!isOpen}>
                    <p className="m-0 max-w-[720px] pb-6 text-[15px] text-muted">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

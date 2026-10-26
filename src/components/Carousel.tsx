"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ChevronIcon } from "./icons";

/**
 * A swipeable row of slides: one per view on phones, two on tablets, three on
 * desktop. Native scroll-snap does the swiping; the arrows and dots page
 * through it. No library needed.
 */
export default function Carousel({ label, children }: { label: string; children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  // Width of one slide plus the gap: the distance one arrow press moves.
  const step = () => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    return first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  };

  // Positions = slides that can sit first in view; follows the scroll position.
  const measure = useCallback(() => {
    const track = trackRef.current;
    const one = step();
    if (!track || !one) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const perView = Math.max(1, Math.round((track.clientWidth + gap) / one));
    const total = Math.max(1, slides.length - perView + 1);
    const max = track.scrollWidth - track.clientWidth;
    setPages(total);
    setPage(track.scrollLeft >= max - 2 ? total - 1 : Math.min(total - 1, Math.round(track.scrollLeft / one)));
  }, [slides.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), measure()));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    const resize = new ResizeObserver(measure);
    resize.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      resize.disconnect();
    };
  }, [measure]);

  const goTo = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(Math.max(target, 0), pages - 1);
    track.scrollTo({ left: clamped * step(), behavior: "smooth" });
  };

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={trackRef} className="carousel-track" tabIndex={0}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className="carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="mt-7 flex items-center justify-center gap-5">
          <button
            type="button"
            className="carousel-arrow"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            aria-label="Previous"
          >
            <ChevronIcon className="size-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                className="carousel-dot"
                aria-current={i === page}
                aria-label={`Go to ${i + 1} of ${pages}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="carousel-arrow"
            onClick={() => goTo(page + 1)}
            disabled={page === pages - 1}
            aria-label="Next"
          >
            <ChevronIcon className="size-5 rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
}

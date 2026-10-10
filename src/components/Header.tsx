"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpIcon } from "./icons";
import { site } from "@/lib/site";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [showTop, setShowTop] = useState(false);

  // Scroll state + reading progress. Progress is written straight to a CSS
  // variable so scrolling never re-renders React.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      headerRef.current?.style.setProperty("--progress", String(max > 0 ? window.scrollY / max : 0));
      setScrolled(window.scrollY > 24);
      setShowTop(window.scrollY > 700);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Highlight the nav link for whichever section sits under the header.
  useEffect(() => {
    const sections = site.nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: Escape closes it, and it closes if the viewport grows past
  // the breakpoint so it can't get stuck open behind the desktop nav.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const wide = window.matchMedia("(min-width: 1280px)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className="site-header"
        data-scrolled={scrolled}
        data-open={open}
      >
        <div className="shell flex items-center gap-8" style={{ minHeight: scrolled ? 70 : 84, transition: "min-height .4s var(--ease-out-expo)" }}>
          <a href="#top" className="mr-auto" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
            <Image
              src="/images/tbm-logo-sm.webp"
              alt=""
              width={256}
              height={256}
              priority
              className="brand-logo object-contain drop-shadow-[0_0_16px_rgba(212,175,55,.2)]"
              style={{ width: scrolled ? 52 : 64, height: scrolled ? 52 : 64 }}
            />
          </a>

          <nav className="hidden gap-6 xl:flex" aria-label="Main">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href} className="nav-link" aria-current={active === item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={site.membership.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm hidden sm:inline-flex"
          >
            Join the Membership
          </a>

          <button
            type="button"
            className="grid h-11 w-11 place-content-center gap-[5px] border border-line xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-bar" />
            <span className="menu-bar" />
            <span className="menu-bar" />
          </button>
        </div>

        <div id="mobile-menu" className="mobile-menu xl:hidden" data-open={open}>
          <div>
            <nav className="shell flex flex-col pb-6" aria-label="Mobile">
              {site.nav.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  style={{ "--i": i } as React.CSSProperties}
                  className="display border-b border-line py-3.5 text-2xl tracking-wide text-cream hover:text-gold-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={site.membership.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                style={{ "--i": site.nav.length } as React.CSSProperties}
                className="btn mt-6"
              >
                Join the Membership
              </a>
            </nav>
          </div>
        </div>

        <span className="scroll-progress" aria-hidden="true" />
      </header>

      <a
        href="#top"
        className="to-top fixed right-4 bottom-4 z-40 grid h-12 w-12 place-items-center border border-gold bg-ink/90 text-gold-2 backdrop-blur hover:bg-gold hover:text-ink sm:right-6 sm:bottom-6"
        data-show={showTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUpIcon className="size-5" />
      </a>
    </>
  );
}

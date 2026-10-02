type IconProps = { className?: string };

function Svg({ className, children, strokeWidth = 1.8 }: IconProps & { children: React.ReactNode; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <Svg className={className} strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function ArrowUpIcon({ className }: IconProps) {
  return (
    <Svg className={className} strokeWidth={2}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </Svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <Svg className={className} strokeWidth={2}>
      <path d="M15 5l-7 7 7 7" />
    </Svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <Svg className={className} strokeWidth={2}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </Svg>
  );
}

export function QuoteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M0 24V14.4C0 6.1 4.6 1.3 12.2 0l1.3 3.2C9.1 4.4 6.9 7 6.6 10.8H13V24H0Zm19 0V14.4C19 6.1 23.6 1.3 31.2 0l1.3 3.2c-4.4 1.2-6.6 3.8-6.9 7.6H32V24H19Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Flyer icons — keyed by the `icon` strings in site.ts
------------------------------------------------------------------ */

const GLYPHS: Record<string, React.ReactNode> = {
  dumbbell: <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />,
  flame: <path d="M12 2.5c3 3.6 5 6 5 9.2a5 5 0 0 1-10 0c0-1.8.6-3.2 1.8-4.4.1 1.3.7 2.1 1.7 2.5-.6-2.8 0-5.3 1.5-7.3Z" />,
  pulse: <path d="M3 12h3.5l2-4 3 8 2.5-5 1.5 3H21" />,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  lotus: (
    <>
      <path d="M12 4c2 2 3 4 3 6s-1 4-3 6c-2-2-3-4-3-6s1-4 3-6Z" />
      <path d="M9 16c-2.4-.6-4-2-5-4 2.3-.7 4.2-.4 6 .8M15 16c2.4-.6 4-2 5-4-2.3-.7-4.2-.4-6 .8" />
    </>
  ),
  fork: <path d="M7 3v6a2 2 0 0 0 4 0V3M9 9v12M17 3c-1.5 1.5-2 3-2 5s.7 3 2 3v10" />,
  app: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10.5 5.5h3" />
      <path d="M9 13l2 2 4-4" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M17.5 14.6A5.5 5.5 0 0 1 20.5 20" />
    </>
  ),
  chat: <path d="M20 13.5a3.5 3.5 0 0 1-3.5 3.5H9l-4 3v-3H7.5A3.5 3.5 0 0 1 4 13.5v-6A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5Z" />,
  education: (
    <>
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" />
      <path d="M6.5 11v5c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-5M21.5 8.5v5" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  price: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 8.3A2.7 2.7 0 0 0 10 10.3c0 2.2-.4 3.6-1.3 4.6h6.3M9 12.3h3.6" />
    </>
  ),
};

export type GlyphName = keyof typeof GLYPHS;

export function Glyph({ name, className }: { name: string; className?: string }) {
  return <Svg className={className}>{GLYPHS[name] ?? GLYPHS.heart}</Svg>;
}

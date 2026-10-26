import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const oswald = Oswald({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

// Staging servers set NOINDEX=true so search engines don't index a duplicate
// of the live site. Read at build time, so rebuild after changing it.
const noindex = process.env.NOINDEX === "true";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const INTRO_SCRIPT = "(function(){var d=document.documentElement;d.classList.add('js');var done=0;function ready(){if(!done){done=1;d.classList.add('ready')}}function logo(){d.classList.add('logo-ready')}setTimeout(ready,1200);setTimeout(logo,5000);function hold(){var w=[];try{var cs=getComputedStyle(d);var o=cs.getPropertyValue('--font-oswald').split(',')[0].trim(),n=cs.getPropertyValue('--font-inter').split(',')[0].trim();if(o){w.push(document.fonts.load('500 1em '+o));w.push(document.fonts.load('700 1em '+o))}if(n)w.push(document.fonts.load('400 1em '+n))}catch(e){}Promise.all(w).then(ready,ready);var img=document.querySelector('.hero-logo');if(!img){logo()}else if(img.complete&&img.naturalWidth){(img.decode?img.decode():Promise.resolve()).then(logo,logo)}else{img.addEventListener('load',function(){(img.decode?img.decode():Promise.resolve()).then(logo,logo)});img.addEventListener('error',logo)}}function reveal(){var els=document.querySelectorAll('[data-reveal]');if(!('IntersectionObserver' in window)){for(var i=0;i<els.length;i++)els[i].classList.add('is-visible');return}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})},(matchMedia('(max-width: 1023px), (hover: none)').matches?{rootMargin:'0px 0px 8% 0px',threshold:0}:{rootMargin:'0px 0px -10% 0px',threshold:0.12}));for(var j=0;j<els.length;j++)io.observe(els[j])}function start(){hold();reveal()}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start()})();";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before first paint. Marks the page as having JS (so reveal styles
            apply), adds `ready` once the hero's fonts have actually loaded (1.2s at
            most) so its background and text come in together, adds `logo-ready`
            once the logo image has loaded so the logo and its rings appear as one, and reveals sections as
            they scroll into view without waiting for React to load. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

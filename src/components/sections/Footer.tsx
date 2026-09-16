import Image from "next/image";
import { InstagramIcon } from "../icons";
import { site } from "@/lib/site";

const LINKS = [
  { label: "Coaching", href: "#coaching" },
  { label: "Results", href: "#results" },
  { label: "About Us", href: "#about" },
  { label: "Recipes", href: "#recipes" },
  { label: "Contact Us", href: "#contact" },
  { label: "Apply", href: "#apply" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#040404] py-12">
      <div className="shell grid items-start gap-9 md:grid-cols-[auto_1.3fr_1fr]">
        <Image src="/images/tbm-logo-sm.webp" alt={`${site.name} logo`} width={256} height={256} className="h-auto w-[110px]" />

        <div>
          <h4 className="display mb-2 text-xl text-gold-2">{site.name}</h4>
          <p className="m-0 text-sm text-muted">Premium online body transformation coaching.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            {site.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-cream transition-colors hover:text-gold-2"
              >
                <InstagramIcon className="size-4 text-gold-2" />
                {s.label}
              </a>
            ))}
          </div>
          <p className="mt-4 mb-0 text-xs text-muted">
            © {new Date().getFullYear()} {site.name}.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:justify-items-end" aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

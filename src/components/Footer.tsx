import Link from "next/link";
import { Logo } from "@/components/Logo";

const sectionHeader =
  "text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold";
const linkClass = "text-neutral-400 transition-colors hover:text-brand-gold";

const explore = [
  { href: "/items", label: "Items" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "All products" },
];

const info = [
  { href: "/about", label: "About" },
  { href: "/track-order", label: "Track order" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-brand-navy-light bg-brand-navy text-neutral-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Col 1: Logo + blurb + social */}
        <div>
          <Logo variant="light" showText={false} className="inline-block" />
          <p className="mt-4 max-w-xs text-sm text-neutral-400">
            Wholesale items and trade services for clients worldwide.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="text-neutral-400 transition-colors hover:text-brand-gold"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.2V14h2.3v7h3z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-neutral-400 transition-colors hover:text-brand-gold"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="3.6" />
                <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-neutral-400 transition-colors hover:text-brand-gold"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6.94 7.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88zM5.4 9h3.1v10.5H5.4zM10.4 9h2.97v1.44h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74v5.92h-3.1v-5.25c0-1.25-.02-2.86-1.74-2.86-1.74 0-2.01 1.36-2.01 2.77v5.34h-3.1z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Explore */}
        <div>
          <p className={sectionHeader}>Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Info / Support */}
        <div>
          <p className={sectionHeader}>Support</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {info.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact */}
        <div>
          <p className={sectionHeader}>Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
            <li>AG Traders, Industrial Area, Peshawar, Pakistan</li>
            <li>
              <a href="mailto:info@agtraders.com" className={linkClass}>
                info@agtraders.com
              </a>
            </li>
            <li>
              <a href="tel:+923000000000" className={linkClass}>
                +92 300 0000000
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-navy-light">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 text-xs text-neutral-500 sm:flex-row sm:justify-between">
          <p>
            © {year} AG Traders. Wholesale supply &amp; trade services.
          </p>
          <nav className="flex items-center gap-5">
            <Link href="#" className="transition-colors hover:text-brand-gold">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-brand-gold">
              Terms
            </Link>
            <Link href="#" className="transition-colors hover:text-brand-gold">
              Shipping
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

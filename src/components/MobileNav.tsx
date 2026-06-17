"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/items", label: "Items" },
  { href: "/services", label: "Services" },
  { href: "/track-order", label: "Track order" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-navy-light text-neutral-200 transition-colors hover:text-brand-gold"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="relative block h-4 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      {/* Scrim */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <nav
        className={`absolute left-0 right-0 top-full z-40 border-b border-brand-navy-light bg-brand-navy px-4 shadow-lg transition-all duration-300 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className="divide-y divide-brand-navy-light/50">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`block py-3 text-sm font-medium transition-colors ${
                    active
                      ? "text-brand-gold"
                      : "text-neutral-200 hover:text-brand-gold"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

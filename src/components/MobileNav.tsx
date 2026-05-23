"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/products", label: "Shop" },
  { href: "/products?category=shoes", label: "Shoes" },
  { href: "/products?category=blankets", label: "Blankets" },
  { href: "/track-order", label: "Track order" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg border border-brand-navy-light px-3 py-2 text-sm text-zinc-200"
        aria-expanded={open}
        aria-label="Menu"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <nav className="absolute left-0 right-0 top-full z-50 border-b border-brand-navy-light bg-brand-navy px-4 py-3 shadow-lg">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-zinc-200 hover:text-brand-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

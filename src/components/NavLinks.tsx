"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/items", label: "Items" },
  { href: "/services", label: "Services" },
  { href: "/track-order", label: "Track order" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden flex-1 items-center justify-center gap-7 text-sm font-medium text-neutral-300 lg:flex">
      {navLinks.map((link) => {
        const active =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`group relative py-1 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-brand-gold after:transition-all after:duration-300 ${
              active
                ? "text-brand-gold after:w-full"
                : "text-neutral-300 after:w-0 hover:text-brand-gold hover:after:w-full"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

import Link from "next/link";
import { getCart, getCartItemCount } from "@/lib/cart";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";
import { MobileNav } from "@/components/MobileNav";
import { NavLinks } from "@/components/NavLinks";

export async function Header() {
  const cart = await getCart();
  const count = getCartItemCount(cart);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-navy-light bg-brand-navy shadow-header">
      {/* Utility bar */}
      <div className="border-b border-brand-navy-light/60 bg-navy-950">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-4 text-xs text-neutral-400">
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-brand-gold"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
            </svg>
            Worldwide shipping · Trusted wholesale supplier
          </span>
          <span className="sm:hidden">AG Traders</span>
          <nav className="flex items-center gap-4">
            <Link href="/track-order" className="transition-colors hover:text-brand-gold">
              Track order
            </Link>
            <Link href="/contact" className="transition-colors hover:text-brand-gold">
              Contact
            </Link>
            <span className="hidden items-center gap-2 sm:inline-flex">
              <span aria-hidden="true" className="text-brand-gold/50">
                |
              </span>
              <span className="font-medium text-brand-gold">USD $</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Main bar: logo (left) · menu (center) · cart + search (right) */}
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex h-20 items-center gap-4">
          {/* Left: logo */}
          <div className="flex flex-1 items-center">
            <Logo variant="light" showText={false} size="lg" />
          </div>

          {/* Center: menu */}
          <NavLinks />

          {/* Right: cart, then search */}
          <div className="flex flex-1 items-center justify-end gap-3">
            <Link
              href="/cart"
              className="group relative inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-gold-light"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-colors"
                aria-hidden="true"
              >
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
                <path d="M2.5 3h2l2.2 12.2a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.3L21 7H6" />
              </svg>
              Cart
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-navy">
                  {count}
                </span>
              )}
            </Link>
            <div className="hidden w-full max-w-[260px] md:block">
              <SearchBar />
            </div>
            <MobileNav />
          </div>
        </div>

        {/* Search drops below on small screens */}
        <div className="pb-3 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { getCart, getCartItemCount } from "@/lib/cart";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";
import { MobileNav } from "@/components/MobileNav";

export async function Header() {
  const cart = await getCart();
  const count = getCartItemCount(cart);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-navy-light bg-brand-navy">
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
          <Logo variant="light" showText={false} />
          <div className="hidden flex-1 justify-center md:flex">
            <SearchBar />
          </div>
          <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-300 lg:flex">
            <Link href="/products" className="hover:text-brand-gold">
              Shop
            </Link>
            <Link href="/products?category=shoes" className="hover:text-brand-gold">
              Shoes
            </Link>
            <Link href="/products?category=blankets" className="hover:text-brand-gold">
              Blankets
            </Link>
            <Link href="/track-order" className="hover:text-brand-gold">
              Track order
            </Link>
            <Link href="/about" className="hover:text-brand-gold">
              About
            </Link>
            <Link href="/contact" className="hover:text-brand-gold">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <MobileNav />
            <Link
              href="/cart"
              className="relative shrink-0 rounded-full bg-brand-gold px-3 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light sm:px-4"
            >
              Cart
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-navy">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
        <div className="pb-3 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

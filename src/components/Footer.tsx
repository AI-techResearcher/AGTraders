import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-navy-light bg-brand-navy text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <Logo variant="light" showText={false} className="inline-block" />
          <p className="mt-3 text-sm text-zinc-400">
            Quality shoes, blankets, and home goods delivered across Pakistan.
          </p>
        </div>
        <div>
          <p className="font-semibold text-brand-gold">Shop</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link href="/products" className="hover:text-brand-gold">
                All products
              </Link>
            </li>
            <li>
              <Link href="/products?category=shoes" className="hover:text-brand-gold">
                Shoes
              </Link>
            </li>
            <li>
              <Link href="/products?category=blankets" className="hover:text-brand-gold">
                Blankets
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-brand-gold">Info</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link href="/about" className="hover:text-brand-gold">
                About
              </Link>
            </li>
            <li>
              <Link href="/track-order" className="hover:text-brand-gold">
                Track order
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-gold">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-navy-light py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} AG Traders. All prices in PKR.
      </div>
    </footer>
  );
}

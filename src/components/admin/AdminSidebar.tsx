"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/settings", label: "Payment settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between border-b border-brand-navy-light bg-brand-navy px-4 py-3 lg:hidden">
        <Image
          src="/ag-traders-logo.png"
          alt="AG Traders"
          width={100}
          height={32}
          className="h-8 w-auto"
        />
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="admin-sidebar-nav"
          className="rounded-lg border border-brand-navy-light px-3 py-1.5 text-sm text-neutral-200"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <aside
        id="admin-sidebar-nav"
        className={`${
          open ? "block" : "hidden"
        } w-full shrink-0 border-r border-brand-navy-light bg-brand-navy text-neutral-300 lg:block lg:w-56`}
      >
        <div className="hidden border-b border-brand-navy-light px-4 py-5 lg:block">
          <Link href="/admin">
            <Image
              src="/ag-traders-logo.png"
              alt="AG Traders"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-brand-gold">
              Admin
            </p>
          </Link>
        </div>
        <nav aria-label="Admin navigation" className="space-y-1 px-3 py-4">
          {links.map((link) => {
            const active =
              link.exact ? pathname === link.href : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                  active
                    ? "border-l-2 border-brand-gold bg-brand-navy-light text-brand-gold"
                    : "border-l-2 border-transparent hover:bg-brand-navy-light hover:text-brand-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-2 border-t border-brand-navy-light px-3 py-4">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm hover:bg-brand-navy-light hover:text-white"
          >
            View store
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-300 hover:bg-brand-navy-light"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

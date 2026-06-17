"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTION_LABELS: Record<string, string> = {
  orders: "Orders",
  products: "Products",
  categories: "Categories",
  settings: "Payment settings",
};

type Crumb = { label: string; href?: string };

function buildCrumbs(pathname: string): Crumb[] {
  const parts = pathname.split("/").filter(Boolean); // e.g. ["admin", "orders", "123"]
  const crumbs: Crumb[] = [{ label: "Dashboard", href: "/admin" }];

  if (parts.length >= 2) {
    const section = parts[1];
    crumbs.push({
      label: SECTION_LABELS[section] ?? section,
      href: `/admin/${section}`,
    });
    if (parts.length > 2) {
      crumbs.push({ label: parts[2] === "new" ? "New" : "Details" });
    }
  }

  // The last crumb is the current page — drop its link.
  crumbs[crumbs.length - 1].href = undefined;
  return crumbs;
}

export function AdminTopBar() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);

  return (
    <div className="sticky top-0 z-30 hidden items-center justify-between border-b border-border bg-surface px-6 py-3 shadow-header lg:flex">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => (
          <span key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" className="text-neutral-300">
                /
              </span>
            )}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="text-muted transition-colors hover:text-brand-gold"
              >
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-brand-navy">
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand-gold"
      >
        View store
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
          <path
            d="M7 13l6-6M8 7h5v5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}

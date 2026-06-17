import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

function ChevronSeparator() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 shrink-0 text-neutral-300"
    >
      <path
        d="M7.5 4.5L13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-brand-gold"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "font-medium text-brand-navy" : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronSeparator />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

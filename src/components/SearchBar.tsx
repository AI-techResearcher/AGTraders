"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBar({
  defaultQuery = "",
  variant = "dark",
}: {
  defaultQuery?: string;
  variant?: "dark" | "light";
}) {
  const router = useRouter();
  const [q, setQ] = useState(defaultQuery);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed) {
      router.push(`/products?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/products");
    }
  }

  const inputClasses =
    variant === "light"
      ? "border-border bg-surface text-neutral-900 placeholder:text-neutral-400"
      : "border-brand-navy-light bg-brand-navy-light text-white placeholder:text-neutral-400";

  const iconClasses =
    variant === "light" ? "text-neutral-400" : "text-neutral-400";

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
      <div className="relative min-w-0 flex-1">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClasses}`}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products…"
          className={`w-full rounded-xl border py-2 pl-10 pr-3 text-sm transition-colors focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${inputClasses}`}
          aria-label="Search products"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-brand-gold px-3 py-2 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-gold-light"
      >
        Search
      </button>
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBar({ defaultQuery = "" }: { defaultQuery?: string }) {
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

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products…"
        className="min-w-0 flex-1 rounded-lg border border-brand-navy-light bg-brand-navy-light px-3 py-2 text-sm text-white placeholder:text-zinc-400 focus:border-brand-gold focus:outline-none"
        aria-label="Search products"
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-brand-gold px-3 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light"
      >
        Search
      </button>
    </form>
  );
}

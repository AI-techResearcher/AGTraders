"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { buildProductsQueryString, type ProductFilters } from "@/lib/products-query";

type Category = { slug: string; name: string };

export function ProductFilters({
  categories,
  filters,
}: {
  categories: Category[];
  filters: ProductFilters;
}) {
  const router = useRouter();

  function onFilterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const qs = buildProductsQueryString(filters, {
      q: String(fd.get("q") ?? "").trim() || undefined,
      category: String(fd.get("category") ?? "") || undefined,
      sort: String(fd.get("sort") ?? "newest"),
      minPrice: String(fd.get("minPrice") ?? "").trim() || undefined,
      maxPrice: String(fd.get("maxPrice") ?? "").trim() || undefined,
      inStock: fd.get("inStock") === "on" ? "1" : undefined,
    });
    router.push(qs ? `/products?${qs}` : "/products");
  }

  const sortLinks = [
    { sort: "newest", label: "Newest" },
    { sort: "price-asc", label: "Price ↑" },
    { sort: "price-desc", label: "Price ↓" },
  ];

  return (
    <aside className="lg:w-56">
      <form onSubmit={onFilterSubmit} className="space-y-6 rounded-xl border border-zinc-200 bg-white p-4 lg:sticky lg:top-24">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Search</label>
          <input
            name="q"
            defaultValue={filters.q ?? ""}
            placeholder="Name or keyword"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Category</label>
          <select
            name="category"
            defaultValue={filters.category ?? ""}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-zinc-600">Min Rs.</label>
            <input
              name="minPrice"
              type="number"
              min={0}
              defaultValue={filters.minPrice ?? ""}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600">Max Rs.</label>
            <input
              name="maxPrice"
              type="number"
              min={0}
              defaultValue={filters.maxPrice ?? ""}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-2 py-1.5 text-sm"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            name="inStock"
            defaultChecked={filters.inStock === "1"}
            className="rounded border-zinc-300"
          />
          In stock only
        </label>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Sort</label>
          <select
            name="sort"
            defaultValue={filters.sort ?? "newest"}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-brand-gold py-2 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light"
        >
          Apply filters
        </button>

        {(filters.q || filters.category || filters.minPrice || filters.maxPrice || filters.inStock) && (
          <Link href="/products" className="block text-center text-sm text-brand-gold hover:underline">
            Clear all
          </Link>
        )}
      </form>

      <div className="mt-4 hidden flex-wrap gap-2 text-sm sm:flex lg:hidden">
        {sortLinks.map(({ sort, label }) => (
          <Link
            key={sort}
            href={`/products?${buildProductsQueryString(filters, { sort })}`}
            className={
              (filters.sort ?? "newest") === sort
                ? "font-medium text-brand-gold"
                : "text-zinc-600"
            }
          >
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}

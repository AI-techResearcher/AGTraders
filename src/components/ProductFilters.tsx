"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { buildProductsQueryString, type ProductFilters } from "@/lib/products-query";

type Category = { slug: string; name: string };

const fieldClasses =
  "mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30";

const selectClasses =
  "mt-1 w-full appearance-none rounded-lg border border-border bg-surface bg-[length:1rem] bg-[right_0.625rem_center] bg-no-repeat px-3 py-2 pr-9 text-sm text-neutral-900 transition-colors focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/30 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23737373%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')]";

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

  const hasActiveFilters =
    !!filters.q ||
    !!filters.category ||
    !!filters.minPrice ||
    !!filters.maxPrice ||
    !!filters.inStock;

  return (
    <aside className="lg:w-56">
      <form
        onSubmit={onFilterSubmit}
        className="rounded-card border border-border bg-surface p-4 shadow-card lg:sticky lg:top-24"
      >
        <div className="flex items-center justify-between pb-4">
          <h2 className="flex items-center gap-2 font-display text-base font-semibold text-brand-navy">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-brand-gold"
            >
              <path d="M3 4h18l-7 8v6l-4 2v-8L3 4Z" />
            </svg>
            Filters
          </h2>
          {hasActiveFilters && (
            <Link
              href="/products"
              className="text-xs font-medium text-brand-gold hover:underline"
            >
              Clear all
            </Link>
          )}
        </div>

        <div className="divide-y divide-neutral-100">
          <div className="py-4">
            <label className="block text-sm font-medium text-neutral-700">Search</label>
            <input
              name="q"
              defaultValue={filters.q ?? ""}
              placeholder="Name or keyword"
              className={fieldClasses}
            />
          </div>

          <div className="py-4">
            <label className="block text-sm font-medium text-neutral-700">Category</label>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link
                href={`/products?${buildProductsQueryString(filters, { category: undefined })}`}
                className={
                  !filters.category
                    ? "rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-brand-navy"
                    : "rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-neutral-700 transition-colors hover:border-brand-gold hover:text-brand-navy"
                }
              >
                All
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/products?${buildProductsQueryString(filters, { category: c.slug })}`}
                  className={
                    filters.category === c.slug
                      ? "rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-brand-navy"
                      : "rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-neutral-700 transition-colors hover:border-brand-gold hover:text-brand-navy"
                  }
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <select
              name="category"
              defaultValue={filters.category ?? ""}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="py-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-neutral-600">Min Rs.</label>
                <input
                  name="minPrice"
                  type="number"
                  min={0}
                  defaultValue={filters.minPrice ?? ""}
                  className={fieldClasses}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600">Max Rs.</label>
                <input
                  name="maxPrice"
                  type="number"
                  min={0}
                  defaultValue={filters.maxPrice ?? ""}
                  className={fieldClasses}
                />
              </div>
            </div>
          </div>

          <div className="py-4">
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                name="inStock"
                defaultChecked={filters.inStock === "1"}
                className="rounded border-border text-brand-gold focus:ring-2 focus:ring-brand-gold/30"
              />
              In stock only
            </label>
          </div>

          <div className="py-4">
            <label className="block text-sm font-medium text-neutral-700">Sort</label>
            <select
              name="sort"
              defaultValue={filters.sort ?? "newest"}
              className={selectClasses}
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-brand-gold py-2 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-gold-light"
        >
          Apply filters
        </button>
      </form>

      <div className="mt-4 hidden flex-wrap gap-2 text-sm sm:flex lg:hidden">
        {sortLinks.map(({ sort, label }) => (
          <Link
            key={sort}
            href={`/products?${buildProductsQueryString(filters, { sort })}`}
            className={
              (filters.sort ?? "newest") === sort
                ? "font-medium text-brand-gold"
                : "text-neutral-600"
            }
          >
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { getFilteredProducts, type ProductFilters as Filters } from "@/lib/products-query";

export const revalidate = 60;

type SearchParams = Promise<{
  q?: string;
  category?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
}>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const filters: Filters = {
    q: params.q,
    category: params.category,
    sort: params.sort,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    inStock: params.inStock,
  };

  const [categories, sorted] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    getFilteredProducts(filters),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <p className="eyebrow">Catalog</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
        {filters.q ? `Results for “${filters.q}”` : "Shop"}
      </h1>
      <p className="mt-2 max-w-2xl text-neutral-600">
        Browse our full range of wholesale products, filtered to match your
        sourcing needs.
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <ProductFilters categories={categories} filters={filters} />

        <div className="min-w-0 flex-1">
          <p className="mb-4 text-sm text-neutral-600">
            {sorted.length} product{sorted.length !== 1 ? "s" : ""}
          </p>

          {sorted.length === 0 ? (
            <div className="flex flex-col items-center rounded-card border border-border bg-surface py-16 px-6 text-center shadow-card">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-neutral-300"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
                <path d="M8 11h6" />
              </svg>
              <h2 className="mt-4 font-display text-xl font-bold text-brand-navy">
                No products found
              </h2>
              <p className="mt-2 max-w-sm text-sm text-neutral-600">
                We couldn&apos;t find anything matching your filters. Try
                broadening your search or clearing the filters.
              </p>
              <Link href="/products" className="btn-primary mt-6">
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-4">
              {sorted.map((product) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  name={product.name}
                  images={product.images}
                  minPrice={product.minPrice}
                  categoryName={product.category.name}
                  inStock={product.totalStock > 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

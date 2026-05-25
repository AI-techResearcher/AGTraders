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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
        {filters.q ? `Results for “${filters.q}”` : "Shop"}
      </h1>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        <ProductFilters categories={categories} filters={filters} />

        <div className="min-w-0 flex-1">
          <p className="mb-4 text-sm text-zinc-600">
            {sorted.length} product{sorted.length !== 1 ? "s" : ""}
          </p>

          {sorted.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center">
              <p className="text-zinc-600">No products match your filters.</p>
              <Link href="/products" className="mt-2 inline-block text-sm font-medium text-brand-gold hover:underline">
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
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

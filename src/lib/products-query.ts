import { prisma } from "@/lib/prisma";

export type ProductFilters = {
  q?: string;
  category?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
};

export async function getFilteredProducts(filters: ProductFilters) {
  const { q, category, sort = "newest", minPrice, maxPrice, inStock } = filters;

  const min = minPrice ? parseInt(minPrice, 10) : undefined;
  const max = maxPrice ? parseInt(maxPrice, 10) : undefined;

  const products = await prisma.product.findMany({
    where: {
      ...(category ? { category: { slug: category } } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" as const } },
              { description: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    },
    include: {
      category: true,
      variants: { select: { price: true, stock: true } },
    },
    orderBy: sort === "newest" ? { createdAt: "desc" } : undefined,
  });

  let results = products.map((p) => {
    const prices = p.variants.map((v) => v.price);
    const minP = prices.length ? Math.min(...prices) : 0;
    const maxP = prices.length ? Math.max(...prices) : 0;
    const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
    return { ...p, minPrice: minP, maxPrice: maxP, totalStock };
  });

  if (inStock === "1") {
    results = results.filter((p) => p.totalStock > 0);
  }
  if (min !== undefined && !isNaN(min)) {
    results = results.filter((p) => p.maxPrice >= min);
  }
  if (max !== undefined && !isNaN(max)) {
    results = results.filter((p) => p.minPrice <= max);
  }

  if (sort === "price-asc") {
    results = [...results].sort((a, b) => a.minPrice - b.minPrice);
  }
  if (sort === "price-desc") {
    results = [...results].sort((a, b) => b.minPrice - a.minPrice);
  }

  return results;
}

export function buildProductsQueryString(
  current: ProductFilters,
  updates: Partial<ProductFilters>
): string {
  const merged = { ...current, ...updates };
  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  if (merged.category) params.set("category", merged.category);
  if (merged.sort && merged.sort !== "newest") params.set("sort", merged.sort);
  if (merged.minPrice) params.set("minPrice", merged.minPrice);
  if (merged.maxPrice) params.set("maxPrice", merged.maxPrice);
  if (merged.inStock === "1") params.set("inStock", "1");
  return params.toString();
}

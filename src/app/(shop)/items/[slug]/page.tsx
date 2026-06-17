import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Category not found · AG Traders" };
  return {
    title: `${category.name} · AG Traders`,
    description: category.description ?? `Wholesale ${category.name.toLowerCase()}.`,
  };
}

export default async function ItemCategoryPage({ params }: Params) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
        include: { variants: { select: { price: true, stock: true } } },
      },
    },
  });

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Items", href: "/items" },
          { label: category.name },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy lg:text-4xl">
        {category.name}
      </h1>
      {category.description && (
        <p className="mt-2 max-w-prose leading-7 text-neutral-600">
          {category.description}
        </p>
      )}

      {category.products.length === 0 ? (
        <p className="mt-10 text-neutral-500">No products in this category yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {category.products.map((product) => {
            const prices = product.variants.map((v) => v.price);
            const minPrice = prices.length ? Math.min(...prices) : 0;
            const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
            return (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                images={product.images}
                minPrice={minPrice}
                categoryName={category.name}
                inStock={totalStock > 0}
                minOrderQty={product.minOrderQty}
                unit={product.unit}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

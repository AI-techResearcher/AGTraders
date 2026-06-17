import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Items · AG Traders",
  description: "Wholesale footwear, blankets, and hardware for clients worldwide.",
};

export default async function ItemsPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <p className="eyebrow">Catalog</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
        Items
      </h1>
      <p className="mt-2 max-w-2xl text-neutral-600">
        Browse our wholesale catalog by category. Every item ships with a minimum
        order quantity suited to bulk buyers.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/items/${cat.slug}`}
            className="group overflow-hidden rounded-card border border-border bg-surface shadow-card transition-shadow duration-300 hover:-translate-y-0.5 hover:border-brand-gold hover:shadow-card-hover"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-brand-navy/5">
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-6xl font-bold text-brand-navy/30">
                    {cat.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-navy/70 to-transparent" />
              <h2 className="absolute bottom-3 left-4 right-4 font-display text-lg font-semibold text-white drop-shadow-sm">
                {cat.name}
              </h2>
            </div>
            <div className="p-5">
              {cat.description && (
                <p className="text-sm text-neutral-600">{cat.description}</p>
              )}
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-brand-gold">
                {cat._count.products} product{cat._count.products === 1 ? "" : "s"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

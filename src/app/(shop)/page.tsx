import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true },
      include: {
        category: true,
        variants: { select: { price: true, stock: true } },
      },
      take: 4,
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-gold">
            AG Traders · Delivered across Pakistan
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Shoes, blankets & home essentials
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-300">
            Browse our catalog, pick your size and color, and pay easily via JazzCash,
            EasyPaisa, or bank transfer.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block rounded-xl bg-brand-gold px-6 py-3 font-semibold text-brand-navy hover:bg-brand-gold-light"
          >
            Shop now
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-zinc-900">Categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="rounded-xl border border-zinc-200 bg-white p-6 text-center font-semibold text-zinc-800 shadow-sm hover:border-brand-gold hover:text-brand-navy"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-zinc-900">Featured products</h2>
          <Link href="/products" className="text-sm font-medium text-brand-gold hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => {
            const minPrice = Math.min(...product.variants.map((v) => v.price));
            const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
            return (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                images={product.images}
                minPrice={minPrice}
                categoryName={product.category.name}
                inStock={totalStock > 0}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

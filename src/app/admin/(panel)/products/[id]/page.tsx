import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { variants: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/products" className="text-sm text-brand-gold hover:underline">
        ← Products
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900">Edit product</h1>
      <div className="mt-8">
        <ProductForm
          categories={categories}
          product={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            categoryId: product.categoryId,
            featured: product.featured,
            images: product.images,
            variants: product.variants.map((v) => ({
              sku: v.sku,
              size: v.size,
              color: v.color,
              price: v.price,
              stock: v.stock,
            })),
          }}
        />
      </div>
    </div>
  );
}

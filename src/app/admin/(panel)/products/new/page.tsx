import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <Link href="/admin/products" className="text-sm text-brand-gold hover:underline">
        ← Products
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900">New product</h1>
      <div className="mt-8">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}

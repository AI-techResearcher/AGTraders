import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <AdminPageHeader
        title="New product"
        backHref="/admin/products"
        backLabel="Products"
      />
      <ProductForm categories={categories} />
    </div>
  );
}

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveCategory } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

type Props = { params: Promise<{ id: string }> };

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div>
      <AdminPageHeader
        title="Edit category"
        backHref="/admin/categories"
        backLabel="Categories"
      />
      <form action={saveCategory} className="max-w-md space-y-4">
        <input type="hidden" name="id" value={category.id} />
        <div>
          <label className="block text-sm font-medium text-neutral-700">Name *</label>
          <input
            name="name"
            required
            defaultValue={category.name}
            className="input mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Slug</label>
          <input
            name="slug"
            defaultValue={category.slug}
            className="input mt-1"
          />
        </div>
        <button type="submit" className="btn-primary">
          Save changes
        </button>
      </form>
    </div>
  );
}

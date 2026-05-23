import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCategory } from "@/app/admin/actions";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Categories</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light"
        >
          Add category
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-100 bg-zinc-50 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Products</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-zinc-50">
                <td className="px-4 py-3 font-medium">{cat.name}</td>
                <td className="px-4 py-3 text-zinc-500">{cat.slug}</td>
                <td className="px-4 py-3">{cat._count.products}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/categories/${cat.id}`}
                      className="text-brand-gold hover:underline"
                    >
                      Edit
                    </Link>
                    {cat._count.products === 0 && (
                      <form action={deleteCategory}>
                        <input type="hidden" name="id" value={cat.id} />
                        <button
                          type="submit"
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

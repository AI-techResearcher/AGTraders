import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCategory } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import {
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTbody,
  AdminTr,
  AdminTd,
  AdminTableEmpty,
} from "@/components/admin/AdminTable";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        action={
          <Link href="/admin/categories/new" className="btn-primary">
            Add category
          </Link>
        }
      />

      <AdminTable>
        <AdminThead>
          <AdminTh>Name</AdminTh>
          <AdminTh>Slug</AdminTh>
          <AdminTh>Products</AdminTh>
          <AdminTh>Actions</AdminTh>
        </AdminThead>
        <AdminTbody>
          {categories.length === 0 ? (
            <AdminTableEmpty colSpan={4}>
              <p className="text-sm text-muted">No categories yet.</p>
              <Link href="/admin/categories/new" className="btn-primary mt-4 inline-flex">
                Add category
              </Link>
            </AdminTableEmpty>
          ) : (
            categories.map((cat) => (
              <AdminTr key={cat.id}>
                <AdminTd className="font-medium text-neutral-900">{cat.name}</AdminTd>
                <AdminTd className="text-muted">{cat.slug}</AdminTd>
                <AdminTd className="tabular-nums">{cat._count.products}</AdminTd>
                <AdminTd>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/categories/${cat.id}`}
                      className="text-brand-gold hover:underline"
                    >
                      Edit
                    </Link>
                    {cat._count.products === 0 && (
                      <form action={deleteCategory}>
                        <input type="hidden" name="id" value={cat.id} />
                        <ConfirmButton message="Delete this category? This cannot be undone.">
                          Delete
                        </ConfirmButton>
                      </form>
                    )}
                  </div>
                </AdminTd>
              </AdminTr>
            ))
          )}
        </AdminTbody>
      </AdminTable>
    </div>
  );
}

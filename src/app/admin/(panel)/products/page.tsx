import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/format";
import { deleteProduct } from "@/app/admin/actions";
import { AdminSearch } from "@/components/admin/AdminSearch";
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

type Props = { searchParams: Promise<{ q?: string }> };

export default async function AdminProductsPage({ searchParams }: Props) {
  const { q } = await searchParams;

  const products = await prisma.product.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
            { variants: { some: { sku: { contains: q, mode: "insensitive" } } } },
          ],
        }
      : undefined,
    include: {
      category: true,
      variants: { select: { price: true, stock: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Products"
        action={
          <Link href="/admin/products/new" className="btn-primary">
            Add product
          </Link>
        }
      />

      <div className="mb-6">
        <AdminSearch placeholder="Search name, slug, or SKU…" defaultValue={q ?? ""} />
      </div>

      <AdminTable minWidth="min-w-[640px]">
        <AdminThead>
          <AdminTh>Name</AdminTh>
          <AdminTh>Category</AdminTh>
          <AdminTh align="right">Variants</AdminTh>
          <AdminTh align="right">From</AdminTh>
          <AdminTh>Featured</AdminTh>
          <AdminTh>Actions</AdminTh>
        </AdminThead>
        <AdminTbody>
          {products.length === 0 ? (
            <AdminTableEmpty colSpan={6}>No products found.</AdminTableEmpty>
          ) : (
            products.map((p) => {
              const minPrice = Math.min(...p.variants.map((v) => v.price));
              const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
              return (
                <AdminTr key={p.id}>
                  <AdminTd className="font-medium text-neutral-900">{p.name}</AdminTd>
                  <AdminTd>{p.category.name}</AdminTd>
                  <AdminTd numeric>
                    {p.variants.length} SKUs · {totalStock} stock
                  </AdminTd>
                  <AdminTd numeric>{formatPKR(minPrice)}</AdminTd>
                  <AdminTd>{p.featured ? "Yes" : "—"}</AdminTd>
                  <AdminTd>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="text-brand-gold hover:underline"
                      >
                        Edit
                      </Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={p.id} />
                        <ConfirmButton message="Delete this product? This cannot be undone.">
                          Delete
                        </ConfirmButton>
                      </form>
                    </div>
                  </AdminTd>
                </AdminTr>
              );
            })
          )}
        </AdminTbody>
      </AdminTable>
    </div>
  );
}

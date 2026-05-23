import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/format";
import { deleteProduct } from "@/app/admin/actions";
import { AdminSearch } from "@/components/admin/AdminSearch";

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex justify-center rounded-lg bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light"
        >
          Add product
        </Link>
      </div>

      <div className="mt-4">
        <AdminSearch placeholder="Search name, slug, or SKU…" defaultValue={q ?? ""} />
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-zinc-100 bg-zinc-50 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Variants</th>
              <th className="px-4 py-3 font-medium">From</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const minPrice = Math.min(...p.variants.map((v) => v.price));
              const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
              return (
                <tr key={p.id} className="border-b border-zinc-50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{p.category.name}</td>
                  <td className="px-4 py-3">
                    {p.variants.length} SKUs · {totalStock} stock
                  </td>
                  <td className="px-4 py-3">{formatPKR(minPrice)}</td>
                  <td className="px-4 py-3">{p.featured ? "Yes" : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="text-brand-gold hover:underline"
                      >
                        Edit
                      </Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={p.id} />
                        <button type="submit" className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="px-4 py-8 text-center text-zinc-500">No products found.</p>
        )}
      </div>
    </div>
  );
}

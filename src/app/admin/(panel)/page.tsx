import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/format";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function AdminDashboardPage() {
  const [productCount, orderCount, pendingCount, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: "awaiting_payment" } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { items: true },
    }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
      <p className="mt-1 text-sm text-zinc-600">AG Traders admin overview</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Products</p>
          <p className="mt-1 text-3xl font-bold text-brand-navy">{productCount}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Total orders</p>
          <p className="mt-1 text-3xl font-bold text-brand-navy">{orderCount}</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-800">Awaiting payment</p>
          <p className="mt-1 text-3xl font-bold text-amber-900">{pendingCount}</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">Recent orders</h2>
          <Link href="/admin/orders" className="text-sm font-medium text-brand-gold hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="border-b border-zinc-100 bg-zinc-50 text-zinc-600">
              <tr>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-zinc-50 hover:bg-zinc-50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-medium text-brand-navy hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{order.guestName}</td>
                    <td className="px-4 py-3">{formatPKR(order.total)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

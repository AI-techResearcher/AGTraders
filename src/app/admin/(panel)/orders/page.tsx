import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/format";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminSearch } from "@/components/admin/AdminSearch";

type Props = { searchParams: Promise<{ status?: string; q?: string }> };

export default async function AdminOrdersPage({ searchParams }: Props) {
  const { status, q } = await searchParams;

  const orders = await prisma.order.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(q
        ? {
            OR: [
              { orderNumber: { contains: q, mode: "insensitive" } },
              { guestName: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
              { phone: { contains: q } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const statuses = [
    "all",
    "awaiting_payment",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Orders</h1>

      <div className="mt-4">
        <AdminSearch
          placeholder="Search order #, name, email, phone…"
          defaultValue={q ?? ""}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {statuses.map((s) => {
          const params = new URLSearchParams();
          if (s !== "all") params.set("status", s);
          if (q) params.set("q", q);
          const href = params.toString() ? `/admin/orders?${params}` : "/admin/orders";
          return (
            <Link
              key={s}
              href={href}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                (s === "all" && !status) || status === s
                  ? "bg-brand-navy text-white"
                  : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
              }`}
            >
              {s === "all" ? "All" : s.replace(/_/g, " ")}
            </Link>
          );
        })}
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-zinc-100 bg-zinc-50 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-zinc-50 hover:bg-zinc-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-medium text-brand-navy hover:underline"
                  >
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3 text-zinc-600">
                  {order.createdAt.toLocaleDateString("en-PK")}
                </td>
                <td className="px-4 py-3">{order.guestName}</td>
                <td className="px-4 py-3">{order.phone}</td>
                <td className="px-4 py-3">{formatPKR(order.total)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="px-4 py-8 text-center text-zinc-500">No orders found.</p>
        )}
      </div>
    </div>
  );
}

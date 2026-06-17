import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/format";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTbody,
  AdminTr,
  AdminTd,
  AdminTableEmpty,
} from "@/components/admin/AdminTable";

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
      <AdminPageHeader title="Dashboard" subtitle="AG Traders admin overview" />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card-panel p-5">
          <p className="text-sm text-muted">Products</p>
          <p className="mt-1 text-3xl font-bold text-brand-navy">{productCount}</p>
        </div>
        <div className="card-panel p-5">
          <p className="text-sm text-muted">Total orders</p>
          <p className="mt-1 text-3xl font-bold text-brand-navy">{orderCount}</p>
        </div>
        <div className="card-panel bg-warning-soft p-5">
          <p className="text-sm text-warning">Awaiting payment</p>
          <p className="mt-1 text-3xl font-bold text-warning">{pendingCount}</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Recent orders</h2>
          <Link href="/admin/orders" className="text-sm font-medium text-brand-gold hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-4">
          <AdminTable minWidth="min-w-[480px]">
            <AdminThead>
              <AdminTh>Order</AdminTh>
              <AdminTh>Customer</AdminTh>
              <AdminTh align="right">Total</AdminTh>
              <AdminTh>Status</AdminTh>
            </AdminThead>
            <AdminTbody>
              {recentOrders.length === 0 ? (
                <AdminTableEmpty colSpan={4}>No orders yet</AdminTableEmpty>
              ) : (
                recentOrders.map((order) => (
                  <AdminTr key={order.id}>
                    <AdminTd>
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-medium text-brand-navy hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                    </AdminTd>
                    <AdminTd>{order.guestName}</AdminTd>
                    <AdminTd numeric>{formatPKR(order.total)}</AdminTd>
                    <AdminTd>
                      <StatusBadge status={order.status} />
                    </AdminTd>
                  </AdminTr>
                ))
              )}
            </AdminTbody>
          </AdminTable>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/format";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminSearch } from "@/components/admin/AdminSearch";
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
      <AdminPageHeader title="Orders" />

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
          const isActive = (s === "all" && !status) || status === s;
          return (
            <Link
              key={s}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isActive
                  ? "bg-brand-navy text-white"
                  : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
              }`}
            >
              {s === "all" ? "All" : s.replace(/_/g, " ")}
            </Link>
          );
        })}
      </div>

      <div className="mt-6">
        <AdminTable minWidth="min-w-[720px]">
          <AdminThead>
            <AdminTh>Order</AdminTh>
            <AdminTh>Date</AdminTh>
            <AdminTh>Customer</AdminTh>
            <AdminTh>Phone</AdminTh>
            <AdminTh align="right">Total</AdminTh>
            <AdminTh>Status</AdminTh>
          </AdminThead>
          <AdminTbody>
            {orders.length === 0 ? (
              <AdminTableEmpty colSpan={6}>No orders found.</AdminTableEmpty>
            ) : (
              orders.map((order) => (
                <AdminTr key={order.id}>
                  <AdminTd>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-brand-navy hover:underline"
                    >
                      {order.orderNumber}
                    </Link>
                  </AdminTd>
                  <AdminTd className="text-muted">
                    {order.createdAt.toLocaleDateString("en-PK")}
                  </AdminTd>
                  <AdminTd>{order.guestName}</AdminTd>
                  <AdminTd>{order.phone}</AdminTd>
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
  );
}

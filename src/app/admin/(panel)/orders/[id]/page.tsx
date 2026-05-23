import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/format";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { OrderStatusForm } from "@/components/admin/OrderStatusForm";

type Props = { params: Promise<{ id: string }> };

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">{order.orderNumber}</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {order.createdAt.toLocaleString("en-PK")}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6">
        <OrderStatusForm orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="font-semibold text-zinc-900">Customer</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-zinc-500">Name</dt>
              <dd className="font-medium">{order.guestName}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Phone</dt>
              <dd className="font-medium">{order.phone}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Email</dt>
              <dd className="font-medium">{order.email}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Address</dt>
              <dd className="font-medium">
                {order.address}, {order.city}, {order.province}
                {order.postalCode ? ` ${order.postalCode}` : ""}
              </dd>
            </div>
            {order.preferredPayment && (
              <div>
                <dt className="text-zinc-500">Preferred payment</dt>
                <dd className="font-medium capitalize">{order.preferredPayment.replace(/_/g, " ")}</dd>
              </div>
            )}
            {order.paymentNote && (
              <div>
                <dt className="text-zinc-500">Payment note</dt>
                <dd className="font-medium">{order.paymentNote}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="font-semibold text-zinc-900">Items</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between border-b border-zinc-100 pb-2">
                <span>
                  {item.productName}
                  <br />
                  <span className="text-zinc-500">
                    {item.size} / {item.color} · {item.sku} × {item.quantity}
                  </span>
                </span>
                <span className="font-medium">{formatPKR(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 border-t border-zinc-100 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-500">Subtotal</dt>
              <dd>{formatPKR(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">Shipping</dt>
              <dd>{formatPKR(order.shipping)}</dd>
            </div>
            <div className="flex justify-between text-base font-bold">
              <dt>Total</dt>
              <dd>{formatPKR(order.total)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

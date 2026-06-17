import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/format";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { OrderStatusForm } from "@/components/admin/OrderStatusForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

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
      <AdminPageHeader
        title={order.orderNumber}
        subtitle={order.createdAt.toLocaleString("en-PK")}
        backHref="/admin/orders"
        backLabel="Orders"
        action={<StatusBadge status={order.status} />}
      />

      <div className="card-panel p-6">
        <OrderStatusForm orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-panel p-6">
          <h2 className="font-semibold text-neutral-900">Customer</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-muted">Name</dt>
              <dd className="font-medium">{order.guestName}</dd>
            </div>
            <div>
              <dt className="text-muted">Phone</dt>
              <dd className="font-medium">{order.phone}</dd>
            </div>
            <div>
              <dt className="text-muted">Email</dt>
              <dd className="font-medium">{order.email}</dd>
            </div>
            <div>
              <dt className="text-muted">Address</dt>
              <dd className="font-medium">
                {order.address}, {order.city}, {order.province}
                {order.postalCode ? ` ${order.postalCode}` : ""}
              </dd>
            </div>
            {order.preferredPayment && (
              <div>
                <dt className="text-muted">Preferred payment</dt>
                <dd className="font-medium capitalize">{order.preferredPayment.replace(/_/g, " ")}</dd>
              </div>
            )}
            {order.paymentNote && (
              <div>
                <dt className="text-muted">Payment note</dt>
                <dd className="font-medium">{order.paymentNote}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="card-panel p-6">
          <h2 className="font-semibold text-neutral-900">Items</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between border-b border-neutral-100 pb-2">
                <span>
                  {item.productName}
                  <br />
                  <span className="text-muted">
                    {item.size} / {item.color} · {item.sku} × {item.quantity}
                  </span>
                </span>
                <span className="font-medium tabular-nums">{formatPKR(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 border-t border-neutral-100 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="tabular-nums">{formatPKR(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="tabular-nums">{formatPKR(order.shipping)}</dd>
            </div>
            <div className="flex justify-between text-base font-bold">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatPKR(order.total)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

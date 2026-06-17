import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/format";
import { getPaymentDetails } from "@/lib/payment";
import { PaymentInstructions } from "@/components/PaymentInstructions";
import { OrderStatusStepper } from "@/components/OrderStatusStepper";

type Props = { params: Promise<{ orderNumber: string }> };

export default async function OrderConfirmationPage({ params }: Props) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });

  if (!order) notFound();

  const payment = await getPaymentDetails();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-card border border-success/30 border-l-4 border-l-success bg-success-soft p-6">
        <p className="eyebrow text-success">Order placed</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-brand-navy">
          Thank you, {order.guestName}!
        </h1>
        <p className="mt-2 text-neutral-700">
          Order <strong className="text-brand-navy">{order.orderNumber}</strong> · Status:{" "}
          <span className="capitalize">{order.status.replace("_", " ")}</span>
        </p>
      </div>

      <div className="mt-6 rounded-card border border-border bg-surface p-6 shadow-card">
        <OrderStatusStepper status={order.status} />
      </div>

      <PaymentInstructions
        orderNumber={order.orderNumber}
        total={order.total}
        payment={payment}
      />

      <div className="mt-8 rounded-card border border-border bg-surface p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold text-brand-navy">Order details</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between gap-4 border-b border-border pb-3"
            >
              <span className="text-neutral-700">
                {item.productName} — {item.size} / {item.color} × {item.quantity}
              </span>
              <span className="font-medium text-neutral-900">
                {formatPKR(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="font-medium text-neutral-900">{formatPKR(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Shipping</dt>
            <dd className="font-medium text-neutral-900">{formatPKR(order.shipping)}</dd>
          </div>
          <div className="flex justify-between pt-1 font-bold text-brand-navy">
            <dt>Total</dt>
            <dd>{formatPKR(order.total)}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-muted">
          Ship to: {order.address}, {order.city}, {order.province}
          {order.postalCode ? ` ${order.postalCode}` : ""}
        </p>
        <p className="text-sm text-muted">
          Contact: {order.phone} · {order.email}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
        <Link href="/track-order" className="font-semibold text-brand-gold hover:underline">
          Track this order later
        </Link>
        <Link href="/products" className="text-muted transition-colors hover:text-brand-navy">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

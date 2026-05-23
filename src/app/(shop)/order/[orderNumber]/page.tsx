import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/format";
import { getPaymentDetails } from "@/lib/payment";
import { PaymentInstructions } from "@/components/PaymentInstructions";

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
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-sm font-medium uppercase text-green-800">Order placed</p>
        <h1 className="mt-2 text-2xl font-bold text-green-900">
          Thank you, {order.guestName}!
        </h1>
        <p className="mt-2 text-green-800">
          Order <strong>{order.orderNumber}</strong> · Status:{" "}
          <span className="capitalize">{order.status.replace("_", " ")}</span>
        </p>
      </div>

      <PaymentInstructions
        orderNumber={order.orderNumber}
        total={order.total}
        payment={payment}
      />

      <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="font-semibold text-zinc-900">Order details</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 border-b border-zinc-100 pb-3">
              <span>
                {item.productName} — {item.size} / {item.color} × {item.quantity}
              </span>
              <span className="font-medium">{formatPKR(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1 border-t border-zinc-100 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-zinc-600">Subtotal</dt>
            <dd>{formatPKR(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-600">Shipping</dt>
            <dd>{formatPKR(order.shipping)}</dd>
          </div>
          <div className="flex justify-between font-bold">
            <dt>Total</dt>
            <dd>{formatPKR(order.total)}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-zinc-600">
          Ship to: {order.address}, {order.city}, {order.province}
          {order.postalCode ? ` ${order.postalCode}` : ""}
        </p>
        <p className="text-sm text-zinc-600">
          Contact: {order.phone} · {order.email}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
        <Link href="/track-order" className="text-brand-gold hover:underline">
          Track this order later
        </Link>
        <Link href="/products" className="text-zinc-600 hover:text-brand-navy">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

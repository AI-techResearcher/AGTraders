"use client";

import { useState } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { OrderStatusStepper } from "@/components/OrderStatusStepper";

type TrackResult = {
  orderNumber: string;
  status: string;
  statusLabel: string;
  total: string;
  createdAt: string;
  preferredPayment: string | null;
  items: { name: string; size: string; color: string; quantity: number; lineTotal: string }[];
};

export function TrackOrderForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<TrackResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/track-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber: form.get("orderNumber"),
        email: form.get("email"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Could not find order.");
      return;
    }

    setOrder(data);
  }

  const paymentLabels: Record<string, string> = {
    jazzcash: "JazzCash",
    easypaisa: "EasyPaisa",
    bank: "Bank transfer",
  };

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="card max-w-md space-y-4 p-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Order number *</label>
          <input
            name="orderNumber"
            required
            placeholder="e.g. ORD-250519-AB12"
            className="input mt-1 font-mono uppercase"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Email used at checkout *
          </label>
          <input name="email" type="email" required className="input mt-1" />
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? "Looking up…" : "Track order"}
        </button>
      </form>

      {order && (
        <div className="card p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold text-brand-navy">
                {order.orderNumber}
              </h2>
              <p className="text-sm text-muted">
                Placed {new Date(order.createdAt).toLocaleString("en-PK")}
              </p>
            </div>
            <StatusBadge status={order.status} />
          </div>

          <div className="mt-6">
            <OrderStatusStepper status={order.status} />
          </div>

          <p className="mt-6 text-sm text-neutral-700">
            Total: <strong className="text-brand-navy">{order.total}</strong>
            {order.preferredPayment && (
              <> · Payment: {paymentLabels[order.preferredPayment] ?? order.preferredPayment}</>
            )}
          </p>
          <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span className="text-neutral-700">
                  {item.name} ({item.size} / {item.color}) × {item.quantity}
                </span>
                <span className="font-medium text-neutral-900">{item.lineTotal}</span>
              </li>
            ))}
          </ul>
          {order.status === "awaiting_payment" && (
            <p className="mt-4 rounded-lg border border-warning/30 bg-warning-soft px-3 py-2 text-sm text-amber-800">
              Payment pending — use the details from your order confirmation email or page.
            </p>
          )}
          <Link
            href={`/order/${order.orderNumber}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-gold hover:underline"
          >
            View payment instructions
          </Link>
        </div>
      )}
    </div>
  );
}

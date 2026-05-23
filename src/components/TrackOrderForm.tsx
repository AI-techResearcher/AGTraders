"use client";

import { useState } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";

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
      <form onSubmit={onSubmit} className="max-w-md space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Order number *</label>
          <input
            name="orderNumber"
            required
            placeholder="e.g. ORD-250519-AB12"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm uppercase"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700">Email used at checkout *</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-gold py-3 font-semibold text-brand-navy hover:bg-brand-gold-light disabled:opacity-50"
        >
          {loading ? "Looking up…" : "Track order"}
        </button>
      </form>

      {order && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-zinc-900">{order.orderNumber}</h2>
              <p className="text-sm text-zinc-500">
                Placed {new Date(order.createdAt).toLocaleString("en-PK")}
              </p>
            </div>
            <StatusBadge status={order.status} />
          </div>
          <p className="mt-4 text-sm text-zinc-600">
            Total: <strong>{order.total}</strong>
            {order.preferredPayment && (
              <> · Payment: {paymentLabels[order.preferredPayment] ?? order.preferredPayment}</>
            )}
          </p>
          <ul className="mt-4 space-y-2 border-t border-zinc-100 pt-4 text-sm">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span>
                  {item.name} ({item.size} / {item.color}) × {item.quantity}
                </span>
                <span className="font-medium">{item.lineTotal}</span>
              </li>
            ))}
          </ul>
          {order.status === "awaiting_payment" && (
            <p className="mt-4 text-sm text-amber-800">
              Payment pending — use the details from your order confirmation email or page.
            </p>
          )}
          <Link
            href={`/order/${order.orderNumber}`}
            className="mt-4 inline-block text-sm font-medium text-brand-gold hover:underline"
          >
            View payment instructions
          </Link>
        </div>
      )}
    </div>
  );
}

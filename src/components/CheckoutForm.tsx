"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPKR } from "@/lib/format";

type Props = {
  subtotal: number;
  shipping: number;
  total: number;
};

export function CheckoutForm({ subtotal, shipping, total }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const body = {
      guestName: form.get("guestName"),
      phone: form.get("phone"),
      email: form.get("email"),
      address: form.get("address"),
      city: form.get("city"),
      province: form.get("province"),
      postalCode: form.get("postalCode") || undefined,
      preferredPayment: form.get("preferredPayment"),
      paymentNote: form.get("paymentNote") || undefined,
    };

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Checkout failed. Please try again.");
      return;
    }

    const data = await res.json();
    router.push(`/order/${data.orderNumber}`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700">Full name *</label>
        <input name="guestName" required className="input mt-1" />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700">Phone *</label>
        <input
          name="phone"
          type="tel"
          required
          placeholder="03XX-XXXXXXX"
          className="input mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700">Email *</label>
        <input name="email" type="email" required className="input mt-1" />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700">Street address *</label>
        <textarea name="address" required rows={2} className="input mt-1" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-700">City *</label>
          <input name="city" required className="input mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Province *</label>
          <select name="province" required className="input mt-1" defaultValue="">
            <option value="" disabled>
              Select province
            </option>
            {[
              "Punjab",
              "Sindh",
              "Khyber Pakhtunkhwa",
              "Balochistan",
              "Islamabad",
              "Gilgit-Baltistan",
              "Azad Kashmir",
            ].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700">Postal code</label>
        <input name="postalCode" className="input mt-1" />
      </div>
      <fieldset>
        <legend className="block text-sm font-medium text-neutral-700">How will you pay? *</legend>
        <div className="mt-2 space-y-2">
          {[
            { value: "jazzcash", label: "JazzCash" },
            { value: "easypaisa", label: "EasyPaisa" },
            { value: "bank", label: "Bank transfer" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors hover:border-brand-gold focus-within:border-brand-gold focus-within:ring-2 focus-within:ring-brand-gold/30"
            >
              <input
                type="radio"
                name="preferredPayment"
                value={opt.value}
                required
                defaultChecked={opt.value === "jazzcash"}
                className="accent-brand-gold focus-visible:outline-none"
              />
              <span className="text-sm text-neutral-800">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Payment note (optional)
        </label>
        <input
          name="paymentNote"
          placeholder="Transaction reference or extra details"
          className="input mt-1"
        />
      </div>

      <div className="rounded-lg border border-border bg-neutral-50 p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-medium text-neutral-900">{formatPKR(subtotal)}</span>
        </div>
        <div className="mt-1 flex justify-between">
          <span className="text-muted">Shipping</span>
          <span className="font-medium text-neutral-900">{formatPKR(shipping)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-border pt-2 font-bold text-brand-navy">
          <span>Total</span>
          <span>{formatPKR(total)}</span>
        </div>
      </div>

      <p className="text-xs text-muted">
        After placing your order, you will receive payment details for JazzCash, EasyPaisa, or
        bank transfer.
      </p>

      {error && <p className="text-sm text-danger">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
        {loading ? "Placing order…" : "Place order"}
      </button>
    </form>
  );
}

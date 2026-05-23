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
        <label className="block text-sm font-medium text-zinc-700">Full name *</label>
        <input
          name="guestName"
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Phone *</label>
        <input
          name="phone"
          type="tel"
          required
          placeholder="03XX-XXXXXXX"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Email *</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Street address *</label>
        <textarea
          name="address"
          required
          rows={2}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-zinc-700">City *</label>
          <input
            name="city"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700">Province *</label>
          <select
            name="province"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
            defaultValue=""
          >
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
        <label className="block text-sm font-medium text-zinc-700">Postal code</label>
        <input
          name="postalCode"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <fieldset>
        <legend className="block text-sm font-medium text-zinc-700">
          How will you pay? *
        </legend>
        <div className="mt-2 space-y-2">
          {[
            { value: "jazzcash", label: "JazzCash" },
            { value: "easypaisa", label: "EasyPaisa" },
            { value: "bank", label: "Bank transfer" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 hover:border-brand-gold"
            >
              <input
                type="radio"
                name="preferredPayment"
                value={opt.value}
                required
                defaultChecked={opt.value === "jazzcash"}
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label className="block text-sm font-medium text-zinc-700">
          Payment note (optional)
        </label>
        <input
          name="paymentNote"
          placeholder="Transaction reference or extra details"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>

      <div className="rounded-lg bg-zinc-50 p-4 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPKR(subtotal)}</span>
        </div>
        <div className="mt-1 flex justify-between">
          <span>Shipping</span>
          <span>{formatPKR(shipping)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-zinc-200 pt-2 font-bold">
          <span>Total</span>
          <span>{formatPKR(total)}</span>
        </div>
      </div>

      <p className="text-xs text-zinc-500">
        After placing your order, you will receive payment details for JazzCash, EasyPaisa,
        or bank transfer.
      </p>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand-gold py-3 font-semibold text-brand-navy hover:bg-brand-gold-light disabled:opacity-50"
      >
        {loading ? "Placing order…" : "Place order"}
      </button>
    </form>
  );
}

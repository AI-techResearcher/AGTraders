"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartItemControls({
  variantId,
  quantity,
  stock,
}: {
  variantId: string;
  quantity: number;
  stock: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function update(qty: number) {
    setLoading(true);
    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variantId, quantity: qty }),
    });
    setLoading(false);
    router.refresh();
  }

  async function remove() {
    setLoading(true);
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variantId }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={loading || quantity <= 1}
        onClick={() => update(quantity - 1)}
        className="h-8 w-8 rounded border border-zinc-300 text-sm hover:bg-zinc-50 disabled:opacity-50"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-medium">{quantity}</span>
      <button
        type="button"
        disabled={loading || quantity >= stock}
        onClick={() => update(quantity + 1)}
        className="h-8 w-8 rounded border border-zinc-300 text-sm hover:bg-zinc-50 disabled:opacity-50"
      >
        +
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={remove}
        className="ml-2 text-sm text-red-600 hover:underline disabled:opacity-50"
      >
        Remove
      </button>
    </div>
  );
}

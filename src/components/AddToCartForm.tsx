"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPKR } from "@/lib/format";

type Variant = {
  id: string;
  sku: string;
  size: string;
  color: string;
  price: number;
  stock: number;
};

export function AddToCartForm({ variants }: { variants: Variant[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selected = variants.find((v) => v.id === selectedId);
  const sizes = [...new Set(variants.map((v) => v.size))];
  const colorsForSize = variants
    .filter((v) => v.size === selected?.size)
    .map((v) => v.color);
  const uniqueColors = [...new Set(colorsForSize)];

  function selectBySize(size: string) {
    const match = variants.find((v) => v.size === size && v.stock > 0);
    if (match) setSelectedId(match.id);
  }

  function selectByColor(color: string) {
    const match = variants.find(
      (v) => v.size === selected?.size && v.color === color
    );
    if (match) setSelectedId(match.id);
  }

  async function addToCart() {
    if (!selected || selected.stock < 1) {
      setError("This variant is out of stock.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variantId: selected.id, quantity }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Could not add to cart.");
      return;
    }
    router.push("/cart");
    router.refresh();
  }

  if (!selected) return <p className="text-red-600">No variants available.</p>;

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium text-zinc-700">Size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const hasStock = variants.some((v) => v.size === size && v.stock > 0);
            return (
              <button
                key={size}
                type="button"
                disabled={!hasStock}
                onClick={() => selectBySize(size)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  selected.size === size
                    ? "border-brand-gold bg-brand-gold text-white"
                    : hasStock
                      ? "border-zinc-300 hover:border-brand-gold"
                      : "cursor-not-allowed border-zinc-200 text-zinc-400 line-through"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-zinc-700">Color</p>
        <div className="flex flex-wrap gap-2">
          {uniqueColors.map((color) => {
            const variant = variants.find(
              (v) => v.size === selected.size && v.color === color
            );
            const out = !variant || variant.stock < 1;
            return (
              <button
                key={color}
                type="button"
                disabled={out}
                onClick={() => selectByColor(color)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  selected.color === color
                    ? "border-brand-gold bg-brand-gold text-white"
                    : out
                      ? "cursor-not-allowed border-zinc-200 text-zinc-400 line-through"
                      : "border-zinc-300 hover:border-brand-gold"
                }`}
              >
                {color}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold text-zinc-900">{formatPKR(selected.price)}</p>
        <p className="text-sm text-zinc-500">SKU: {selected.sku}</p>
        <p
          className={`mt-1 text-sm font-medium ${
            selected.stock > 0 ? "text-green-700" : "text-red-600"
          }`}
        >
          {selected.stock > 0 ? `${selected.stock} in stock` : "Out of stock"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-zinc-700">
          Qty
          <input
            type="number"
            min={1}
            max={selected.stock}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Math.min(selected.stock, Number(e.target.value))))
            }
            className="ml-2 w-16 rounded-lg border border-zinc-300 px-2 py-1"
          />
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={addToCart}
        disabled={loading || selected.stock < 1}
        className="w-full rounded-xl bg-brand-gold py-3 font-semibold text-white hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Adding…" : "Add to cart"}
      </button>
    </div>
  );
}

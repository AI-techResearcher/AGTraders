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

function CheckGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="h-3.5 w-3.5 text-brand-gold"
    >
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

  function changeQty(next: number) {
    if (!selected) return;
    setQuantity(Math.max(1, Math.min(selected.stock, next)));
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

  if (!selected) return <p className="text-danger">No variants available.</p>;

  const swatchBase =
    "inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2";

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium text-neutral-700">Size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const hasStock = variants.some((v) => v.size === size && v.stock > 0);
            const isSelected = selected.size === size;
            return (
              <button
                key={size}
                type="button"
                disabled={!hasStock}
                aria-pressed={isSelected}
                onClick={() => selectBySize(size)}
                className={`${swatchBase} ${
                  isSelected
                    ? "border-brand-gold bg-brand-gold/10 text-brand-navy ring-1 ring-brand-gold"
                    : hasStock
                      ? "border-border text-neutral-700 hover:border-brand-gold"
                      : "cursor-not-allowed border-border text-neutral-400 line-through"
                }`}
              >
                {isSelected && <CheckGlyph />}
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-neutral-700">Color</p>
        <div className="flex flex-wrap gap-2">
          {uniqueColors.map((color) => {
            const variant = variants.find(
              (v) => v.size === selected.size && v.color === color
            );
            const out = !variant || variant.stock < 1;
            const isSelected = selected.color === color;
            return (
              <button
                key={color}
                type="button"
                disabled={out}
                aria-pressed={isSelected}
                onClick={() => selectByColor(color)}
                className={`${swatchBase} ${
                  isSelected
                    ? "border-brand-gold bg-brand-gold/10 text-brand-navy ring-1 ring-brand-gold"
                    : out
                      ? "cursor-not-allowed border-border text-neutral-400 line-through"
                      : "border-border text-neutral-700 hover:border-brand-gold"
                }`}
              >
                {isSelected && <CheckGlyph />}
                {color}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold text-brand-navy">{formatPKR(selected.price)}</p>
        <p className="text-sm text-muted">SKU: {selected.sku}</p>
        <p
          className={`mt-1 text-sm font-medium ${
            selected.stock > 0 ? "text-success" : "text-danger"
          }`}
        >
          {selected.stock > 0 ? `${selected.stock} in stock` : "Out of stock"}
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-neutral-700">Quantity</p>
        <div className="inline-flex h-11 items-stretch overflow-hidden rounded-lg border border-border">
          <button
            type="button"
            onClick={() => changeQty(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex w-11 items-center justify-center text-lg font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-gold"
          >
            <span aria-hidden="true">&minus;</span>
          </button>
          <input
            type="number"
            min={1}
            max={selected.stock}
            value={quantity}
            onChange={(e) => changeQty(Number(e.target.value))}
            aria-label="Quantity"
            className="w-14 border-x border-border text-center text-sm font-medium text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-gold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => changeQty(quantity + 1)}
            disabled={quantity >= selected.stock}
            aria-label="Increase quantity"
            className="flex w-11 items-center justify-center text-lg font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-gold"
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <button
        type="button"
        onClick={addToCart}
        disabled={loading || selected.stock < 1}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Adding…" : "Add to cart"}
      </button>
    </div>
  );
}

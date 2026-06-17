"use client";

import { useState } from "react";
import { saveProduct, type ActionResult } from "@/app/admin/actions";

type Category = { id: string; name: string };
type Variant = { sku: string; size: string; color: string; price: number; stock: number };

type ProductFormProps = {
  categories: Category[];
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    categoryId: string;
    featured: boolean;
    images: string;
    variants: Variant[];
  };
};

export function ProductForm({ categories, product }: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [variants, setVariants] = useState<Variant[]>(
    product?.variants ?? [{ sku: "", size: "", color: "", price: 0, stock: 0 }]
  );

  const imagesText = product?.images
    ? (JSON.parse(product.images) as string[]).join("\n")
    : "";

  function addVariant() {
    setVariants([...variants, { sku: "", size: "", color: "", price: 0, stock: 0 }]);
  }

  function updateVariant(index: number, field: keyof Variant, value: string | number) {
    setVariants(variants.map((v, i) => (i === index ? { ...v, [field]: value } : v)));
  }

  function removeVariant(index: number) {
    setVariants(variants.filter((_, i) => i !== index));
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    formData.set("variants", JSON.stringify(variants));
    const result: ActionResult = await saveProduct({}, formData);
    if (result?.error) setError(result.error);
  }

  return (
    <form action={handleSubmit} className="max-w-3xl space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Name *</label>
          <input
            name="name"
            required
            defaultValue={product?.name}
            className="input mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Slug</label>
          <input
            name="slug"
            defaultValue={product?.slug}
            placeholder="auto-from-name"
            className="input mt-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">Description *</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={product?.description}
          className="input mt-1"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Category *</label>
          <select
            name="categoryId"
            required
            defaultValue={product?.categoryId}
            className="input mt-1"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={product?.featured}
              className="h-4 w-4 rounded border-border accent-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-1"
            />
            Featured on homepage
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Image URLs (one per line)
        </label>
        <textarea
          name="images"
          rows={3}
          defaultValue={imagesText}
          placeholder="https://..."
          className="input mt-1 font-mono text-sm"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-neutral-900">Variants (SKUs) *</h3>
          <button
            type="button"
            onClick={addVariant}
            className="text-sm font-medium text-brand-gold hover:underline"
          >
            + Add variant
          </button>
        </div>
        <div className="mt-3 hidden gap-2 px-3 text-xs font-medium uppercase tracking-wide text-muted sm:grid sm:grid-cols-6">
          <span className="sm:col-span-2">SKU</span>
          <span>Size</span>
          <span>Color</span>
          <span>Price</span>
          <span>Stock</span>
        </div>
        <div className="mt-2 space-y-3">
          {variants.map((v, i) => (
            <div
              key={i}
              className="grid gap-2 rounded-lg border border-border bg-neutral-50 p-3 sm:grid-cols-6"
            >
              <input
                placeholder="SKU"
                value={v.sku}
                onChange={(e) => updateVariant(i, "sku", e.target.value)}
                className="input-sm sm:col-span-2"
              />
              <input
                placeholder="Size"
                value={v.size}
                onChange={(e) => updateVariant(i, "size", e.target.value)}
                className="input-sm"
              />
              <input
                placeholder="Color"
                value={v.color}
                onChange={(e) => updateVariant(i, "color", e.target.value)}
                className="input-sm"
              />
              <input
                type="number"
                placeholder="Price PKR"
                value={v.price || ""}
                onChange={(e) => updateVariant(i, "price", Number(e.target.value))}
                className="input-sm"
              />
              <div className="flex gap-1 sm:col-span-2">
                <input
                  type="number"
                  placeholder="Stock"
                  value={v.stock || ""}
                  onChange={(e) => updateVariant(i, "stock", Number(e.target.value))}
                  className="input-sm flex-1"
                />
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    aria-label="Remove variant"
                    className="btn-danger px-2"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path
                        d="M6 6l8 8M14 6l-8 8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <button type="submit" className="btn-primary">
        {product ? "Update product" : "Create product"}
      </button>
    </form>
  );
}

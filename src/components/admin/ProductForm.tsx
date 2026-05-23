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
          <label className="block text-sm font-medium text-zinc-700">Name *</label>
          <input
            name="name"
            required
            defaultValue={product?.name}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700">Slug</label>
          <input
            name="slug"
            defaultValue={product?.slug}
            placeholder="auto-from-name"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700">Description *</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={product?.description}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Category *</label>
          <select
            name="categoryId"
            required
            defaultValue={product?.categoryId}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
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
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={product?.featured}
              className="rounded border-zinc-300"
            />
            Featured on homepage
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700">
          Image URLs (one per line)
        </label>
        <textarea
          name="images"
          rows={3}
          defaultValue={imagesText}
          placeholder="https://..."
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-zinc-900">Variants (SKUs) *</h3>
          <button
            type="button"
            onClick={addVariant}
            className="text-sm font-medium text-brand-gold hover:underline"
          >
            + Add variant
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {variants.map((v, i) => (
            <div
              key={i}
              className="grid gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-3 sm:grid-cols-6"
            >
              <input
                placeholder="SKU"
                value={v.sku}
                onChange={(e) => updateVariant(i, "sku", e.target.value)}
                className="rounded border border-zinc-300 px-2 py-1 text-sm sm:col-span-2"
              />
              <input
                placeholder="Size"
                value={v.size}
                onChange={(e) => updateVariant(i, "size", e.target.value)}
                className="rounded border border-zinc-300 px-2 py-1 text-sm"
              />
              <input
                placeholder="Color"
                value={v.color}
                onChange={(e) => updateVariant(i, "color", e.target.value)}
                className="rounded border border-zinc-300 px-2 py-1 text-sm"
              />
              <input
                type="number"
                placeholder="Price PKR"
                value={v.price || ""}
                onChange={(e) => updateVariant(i, "price", Number(e.target.value))}
                className="rounded border border-zinc-300 px-2 py-1 text-sm"
              />
              <div className="flex gap-1 sm:col-span-2">
                <input
                  type="number"
                  placeholder="Stock"
                  value={v.stock || ""}
                  onChange={(e) => updateVariant(i, "stock", Number(e.target.value))}
                  className="flex-1 rounded border border-zinc-300 px-2 py-1 text-sm"
                />
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    className="rounded border border-red-200 px-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="rounded-xl bg-brand-gold px-6 py-2.5 font-semibold text-brand-navy hover:bg-brand-gold-light"
      >
        {product ? "Update product" : "Create product"}
      </button>
    </form>
  );
}

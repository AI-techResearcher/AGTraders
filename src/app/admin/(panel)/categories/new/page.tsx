import Link from "next/link";
import { saveCategory } from "@/app/admin/actions";

export default function NewCategoryPage() {
  return (
    <div>
      <Link href="/admin/categories" className="text-sm text-brand-gold hover:underline">
        ← Categories
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900">New category</h1>
      <form action={saveCategory} className="mt-8 max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Name *</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700">Slug</label>
          <input
            name="slug"
            placeholder="auto-from-name"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-brand-gold px-6 py-2.5 font-semibold text-brand-navy hover:bg-brand-gold-light"
        >
          Create category
        </button>
      </form>
    </div>
  );
}

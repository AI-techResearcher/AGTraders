import { saveCategory } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function NewCategoryPage() {
  return (
    <div>
      <AdminPageHeader
        title="New category"
        backHref="/admin/categories"
        backLabel="Categories"
      />
      <form action={saveCategory} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Name *</label>
          <input name="name" required className="input mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Slug</label>
          <input
            name="slug"
            placeholder="auto-from-name"
            className="input mt-1"
          />
        </div>
        <button type="submit" className="btn-primary">
          Create category
        </button>
      </form>
    </div>
  );
}

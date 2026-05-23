import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}

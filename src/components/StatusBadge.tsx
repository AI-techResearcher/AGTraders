import { formatOrderStatus, statusBadgeClass } from "@/lib/order-status";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize tracking-wide ring-1 ring-inset ring-current/20 ${statusBadgeClass(status)}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {formatOrderStatus(status)}
    </span>
  );
}

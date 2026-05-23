export const ORDER_STATUSES = [
  "awaiting_payment",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export function formatOrderStatus(status: string): string {
  return status.replace(/_/g, " ");
}

export function statusBadgeClass(status: string): string {
  switch (status) {
    case "awaiting_payment":
      return "bg-amber-100 text-amber-900";
    case "paid":
      return "bg-blue-100 text-blue-900";
    case "processing":
      return "bg-indigo-100 text-indigo-900";
    case "shipped":
      return "bg-purple-100 text-purple-900";
    case "delivered":
      return "bg-green-100 text-green-900";
    case "cancelled":
      return "bg-red-100 text-red-900";
    default:
      return "bg-zinc-100 text-zinc-800";
  }
}

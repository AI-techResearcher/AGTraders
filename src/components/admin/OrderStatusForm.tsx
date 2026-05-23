"use client";

import { useActionState } from "react";
import { updateOrderStatus, type ActionResult } from "@/app/admin/actions";
import { ORDER_STATUSES } from "@/lib/order-status";

export function OrderStatusForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [state, formAction, pending] = useActionState(updateOrderStatus, {} as ActionResult);

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      <input type="hidden" name="id" value={orderId} />
      <div>
        <label className="block text-sm font-medium text-zinc-700">Order status</label>
        <select
          name="status"
          defaultValue={currentStatus}
          className="mt-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        >
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light disabled:opacity-50"
      >
        {pending ? "Saving…" : "Update status"}
      </button>
      {state?.success && <p className="text-sm text-green-700">Status updated.</p>}
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}

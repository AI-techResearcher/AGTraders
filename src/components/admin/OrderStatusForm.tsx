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
        <label className="block text-sm font-medium text-neutral-700">Order status</label>
        <select
          name="status"
          defaultValue={currentStatus}
          className="input mt-1"
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
        className="btn-primary disabled:opacity-50"
      >
        {pending ? "Saving…" : "Update status"}
      </button>
      {state?.success && <p className="text-sm text-success">Status updated.</p>}
      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
    </form>
  );
}

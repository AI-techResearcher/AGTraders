"use client";

import { useActionState } from "react";
import { savePaymentSettings, type ActionResult } from "@/app/admin/actions";
import type { PaymentDetails } from "@/lib/payment";

export function PaymentSettingsForm({ settings }: { settings: PaymentDetails }) {
  const [state, formAction, pending] = useActionState(savePaymentSettings, {} as ActionResult);

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700">JazzCash number</label>
        <input
          name="jazzcashNumber"
          required
          defaultValue={settings.jazzcash}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">EasyPaisa number</label>
        <input
          name="easypaisaNumber"
          required
          defaultValue={settings.easypaisa}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Bank name</label>
        <input
          name="bankName"
          required
          defaultValue={settings.bankName}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Account title</label>
        <input
          name="accountTitle"
          required
          defaultValue={settings.accountTitle}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Account number</label>
        <input
          name="accountNumber"
          required
          defaultValue={settings.accountNumber}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">IBAN</label>
        <input
          name="iban"
          required
          defaultValue={settings.iban}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm"
        />
      </div>

      {state?.success && (
        <p className="text-sm text-green-700">Payment settings saved.</p>
      )}
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-gold px-6 py-2.5 font-semibold text-brand-navy hover:bg-brand-gold-light disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}

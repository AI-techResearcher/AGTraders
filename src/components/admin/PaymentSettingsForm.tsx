"use client";

import { useActionState } from "react";
import { savePaymentSettings, type ActionResult } from "@/app/admin/actions";
import type { PaymentDetails } from "@/lib/payment";

export function PaymentSettingsForm({ settings }: { settings: PaymentDetails }) {
  const [state, formAction, pending] = useActionState(savePaymentSettings, {} as ActionResult);

  return (
    <form action={formAction} className="space-y-6">
      <div className="divide-y divide-border">
        <div className="pb-4">
          <label
            htmlFor="jazzcashNumber"
            className="block text-sm font-medium text-neutral-700"
          >
            JazzCash number <span className="text-danger">*</span>
          </label>
          <input
            id="jazzcashNumber"
            name="jazzcashNumber"
            required
            defaultValue={settings.jazzcash}
            className="input mt-1"
          />
        </div>
        <div className="py-4">
          <label
            htmlFor="easypaisaNumber"
            className="block text-sm font-medium text-neutral-700"
          >
            EasyPaisa number <span className="text-danger">*</span>
          </label>
          <input
            id="easypaisaNumber"
            name="easypaisaNumber"
            required
            defaultValue={settings.easypaisa}
            className="input mt-1"
          />
        </div>
        <div className="py-4">
          <label htmlFor="bankName" className="block text-sm font-medium text-neutral-700">
            Bank name <span className="text-danger">*</span>
          </label>
          <input
            id="bankName"
            name="bankName"
            required
            defaultValue={settings.bankName}
            className="input mt-1"
          />
        </div>
        <div className="py-4">
          <label
            htmlFor="accountTitle"
            className="block text-sm font-medium text-neutral-700"
          >
            Account title <span className="text-danger">*</span>
          </label>
          <input
            id="accountTitle"
            name="accountTitle"
            required
            defaultValue={settings.accountTitle}
            className="input mt-1"
          />
        </div>
        <div className="py-4">
          <label
            htmlFor="accountNumber"
            className="block text-sm font-medium text-neutral-700"
          >
            Account number <span className="text-danger">*</span>
          </label>
          <input
            id="accountNumber"
            name="accountNumber"
            required
            defaultValue={settings.accountNumber}
            className="input mt-1"
          />
        </div>
        <div className="pt-4">
          <label htmlFor="iban" className="block text-sm font-medium text-neutral-700">
            IBAN <span className="text-danger">*</span>
          </label>
          <input
            id="iban"
            name="iban"
            required
            defaultValue={settings.iban}
            className="input mt-1 font-mono text-sm"
          />
        </div>
      </div>

      {state?.success && (
        <div className="inline-flex items-center gap-2 rounded-btn bg-success-soft px-3 py-1.5 text-sm font-medium text-success">
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
              d="M5 10.5l3.5 3.5L15 6.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Payment settings saved.
        </div>
      )}
      {state?.error && (
        <div className="inline-flex items-center gap-2 rounded-btn bg-danger-soft px-3 py-1.5 text-sm font-medium text-danger">
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
              d="M10 6.5v4.5M10 14h.01"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          {state.error}
        </div>
      )}

      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-50">
        {pending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}

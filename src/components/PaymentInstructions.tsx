import { formatPKR } from "@/lib/format";
import type { PaymentDetails } from "@/lib/payment";
import { CopyButton } from "@/components/CopyButton";

type Props = {
  orderNumber: string;
  total: number;
  payment: PaymentDetails;
};

export function PaymentInstructions({ orderNumber, total, payment }: Props) {
  return (
    <div className="mt-8 rounded-card border border-warning/30 bg-warning-soft p-6">
      <h2 className="text-lg font-bold text-amber-900">Payment instructions</h2>
      <p className="mt-2 text-sm text-amber-800">
        Transfer <strong>{formatPKR(total)}</strong> using one of the methods below. Include
        your order number <strong>{orderNumber}</strong> in the payment note.
      </p>

      <div className="mt-6 space-y-4 text-sm">
        <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
          <p className="font-semibold text-neutral-800">JazzCash</p>
          <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2">
            <span className="font-mono text-brand-navy">{payment.jazzcash}</span>
            <CopyButton value={payment.jazzcash} label="JazzCash number" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
          <p className="font-semibold text-neutral-800">EasyPaisa</p>
          <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2">
            <span className="font-mono text-brand-navy">{payment.easypaisa}</span>
            <CopyButton value={payment.easypaisa} label="EasyPaisa number" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
          <p className="font-semibold text-neutral-800">Bank transfer — {payment.bankName}</p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2">
              <div className="min-w-0">
                <p className="text-xs text-muted">Account title</p>
                <p className="font-medium text-neutral-900">{payment.accountTitle}</p>
              </div>
              <CopyButton value={payment.accountTitle} label="account title" />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2">
              <div className="min-w-0">
                <p className="text-xs text-muted">Account number</p>
                <p className="break-all font-mono font-medium text-neutral-900">
                  {payment.accountNumber}
                </p>
              </div>
              <CopyButton value={payment.accountNumber} label="account number" />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2">
              <div className="min-w-0">
                <p className="text-xs text-muted">IBAN</p>
                <p className="break-all font-mono text-xs font-medium text-neutral-900">
                  {payment.iban}
                </p>
              </div>
              <CopyButton value={payment.iban} label="IBAN" />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-amber-700">
        Your order will be processed after we confirm your payment. You will be contacted on the
        phone number you provided.
      </p>
    </div>
  );
}

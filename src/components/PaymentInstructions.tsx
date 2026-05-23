import { formatPKR } from "@/lib/format";
import type { PaymentDetails } from "@/lib/payment";

type Props = {
  orderNumber: string;
  total: number;
  payment: PaymentDetails;
};

export function PaymentInstructions({ orderNumber, total, payment }: Props) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
      <h2 className="text-lg font-bold text-amber-900">Payment instructions</h2>
      <p className="mt-2 text-sm text-amber-800">
        Transfer <strong>{formatPKR(total)}</strong> using one of the methods below.
        Include your order number <strong>{orderNumber}</strong> in the payment note.
      </p>

      <div className="mt-6 space-y-4 text-sm">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="font-semibold text-zinc-800">JazzCash</p>
          <p className="mt-1 font-mono text-brand-navy">{payment.jazzcash}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="font-semibold text-zinc-800">EasyPaisa</p>
          <p className="mt-1 font-mono text-brand-navy">{payment.easypaisa}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="font-semibold text-zinc-800">Bank transfer — {payment.bankName}</p>
          <dl className="mt-2 space-y-1 text-zinc-600">
            <div className="flex justify-between gap-4">
              <dt>Account title</dt>
              <dd className="font-medium text-zinc-900">{payment.accountTitle}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Account number</dt>
              <dd className="font-mono font-medium text-zinc-900">{payment.accountNumber}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>IBAN</dt>
              <dd className="font-mono text-xs font-medium text-zinc-900">{payment.iban}</dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="mt-4 text-xs text-amber-700">
        Your order will be processed after we confirm your payment. You will be contacted on
        the phone number you provided.
      </p>
    </div>
  );
}

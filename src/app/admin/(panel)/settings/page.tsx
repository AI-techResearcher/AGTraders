import { getPaymentDetails } from "@/lib/payment";
import { PaymentSettingsForm } from "@/components/admin/PaymentSettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getPaymentDetails();

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900">Payment settings</h1>
      <p className="mt-1 text-sm text-zinc-600">
        These details are shown to customers on the order confirmation page.
      </p>
      <div className="mt-8">
        <PaymentSettingsForm settings={settings} />
      </div>
    </div>
  );
}

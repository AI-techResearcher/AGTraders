import { getPaymentDetails } from "@/lib/payment";
import { PaymentSettingsForm } from "@/components/admin/PaymentSettingsForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function AdminSettingsPage() {
  const settings = await getPaymentDetails();

  return (
    <div>
      <AdminPageHeader
        title="Payment settings"
        subtitle="These details are shown to customers on the order confirmation page."
      />
      <section className="card-panel max-w-lg p-6">
        <PaymentSettingsForm settings={settings} />
      </section>
    </div>
  );
}

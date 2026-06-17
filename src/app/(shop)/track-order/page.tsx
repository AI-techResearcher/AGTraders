import { TrackOrderForm } from "@/components/TrackOrderForm";

export const metadata = {
  title: "Track order — AG Traders",
};

export default function TrackOrderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="eyebrow">Order status</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
        Track your order
      </h1>
      <p className="mt-2 text-muted">
        Enter your order number and checkout email. No account required.
      </p>
      <div className="mt-8">
        <TrackOrderForm />
      </div>
    </div>
  );
}

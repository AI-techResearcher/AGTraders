import { TrackOrderForm } from "@/components/TrackOrderForm";

export const metadata = {
  title: "Track order — AG Traders",
};

export default function TrackOrderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Track your order</h1>
      <p className="mt-2 text-zinc-600">
        Enter your order number and checkout email. No account required.
      </p>
      <div className="mt-8">
        <TrackOrderForm />
      </div>
    </div>
  );
}

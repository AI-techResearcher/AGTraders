import { ORDER_STATUSES } from "@/lib/order-status";

// Linear fulfilment flow (cancelled is a terminal off-path state, excluded here).
const FLOW = ORDER_STATUSES.filter((s) => s !== "cancelled");

const STEP_LABELS: Record<string, string> = {
  awaiting_payment: "Awaiting payment",
  paid: "Paid",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
};

type Props = {
  status: string;
};

export function OrderStatusStepper({ status }: Props) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-2 rounded-card border border-danger/30 bg-danger-soft px-4 py-3">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-danger" aria-hidden="true" />
        <span className="text-sm font-semibold text-danger">This order was cancelled</span>
      </div>
    );
  }

  const currentIndex = FLOW.indexOf(status as (typeof FLOW)[number]);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <ol className="flex items-start" aria-label="Order progress">
      {FLOW.map((step, i) => {
        const isComplete = i < activeIndex;
        const isCurrent = i === activeIndex;
        const isDone = i <= activeIndex; // dot filled for completed + current
        const lineComplete = i < activeIndex; // connector before a done step

        return (
          <li
            key={step}
            className="relative flex flex-1 flex-col items-center text-center"
          >
            {/* connecting line (left half) */}
            {i > 0 && (
              <span
                aria-hidden="true"
                className={`absolute right-1/2 top-2 h-0.5 w-full ${
                  lineComplete || isCurrent ? "bg-brand-gold" : "bg-neutral-200"
                }`}
              />
            )}

            {/* dot */}
            <span
              aria-hidden="true"
              className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full ${
                isDone
                  ? "bg-brand-gold ring-2 ring-brand-gold/30"
                  : "bg-neutral-200"
              }`}
            >
              {isComplete && (
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-2.5 w-2.5 text-brand-navy"
                >
                  <path d="M2.5 6.2 5 8.5 9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>

            <span
              className={`mt-2 text-[11px] font-semibold leading-tight tracking-wide sm:text-xs ${
                isCurrent
                  ? "text-brand-navy"
                  : isComplete
                    ? "text-neutral-700"
                    : "text-muted"
              }`}
            >
              {STEP_LABELS[step] ?? step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

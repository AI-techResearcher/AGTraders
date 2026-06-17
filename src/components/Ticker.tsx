import Link from "next/link";

const MESSAGES = [
  "Need a product from overseas? AG Traders sources, imports & delivers it to your door.",
  "Tell us what you want and where it's made — we procure it from the origin country and ship it to you.",
  "Global sourcing · customs cleared · door-to-door delivery.",
  "From any country to your doorstep — international trade, simplified.",
  "Bulk import & export, managed end-to-end by AG Traders.",
];

function TickerSequence({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {MESSAGES.map((msg, i) => (
        <span key={i} className="flex items-center">
          <span
            aria-hidden
            className="mx-5 h-1.5 w-1.5 shrink-0 rotate-45 bg-brand-navy/40"
          />
          <span className="whitespace-nowrap text-sm font-medium text-brand-navy">
            {msg}
          </span>
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div
      className="ticker-band relative flex items-stretch border-y border-brand-gold-light bg-brand-gold"
      aria-label="Import and export announcements"
    >
      {/* Scrolling messages */}
      <div className="relative flex-1 overflow-hidden">
        <div className="ticker-track flex w-max items-center py-2">
          <TickerSequence />
          <TickerSequence ariaHidden />
        </div>

        {/* Edge fades so messages slide in/out smoothly */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-brand-gold to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-brand-gold to-transparent"
        />
      </div>

      {/* Fixed CTA at the end of the ticker */}
      <Link
        href="/services/import-export-trading"
        aria-label="Go to Import / Export Trading service"
        className="flex shrink-0 items-center gap-1.5 whitespace-nowrap bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-navy-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gold sm:px-4 sm:text-sm"
      >
        Import &amp; Export
        <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            d="M4 10h11M11 6l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}

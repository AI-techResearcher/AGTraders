export const metadata = {
  title: "Contact · AG Traders",
  description:
    "Reach the AG Traders team for wholesale orders, trade services, and support.",
};

const CONTACT_EMAIL = "support@agtraders.example";
const CONTACT_PHONE = "+92 300 0000000";
const CONTACT_PHONE_HREF = "+923000000000";

const hours = [
  { day: "Monday – Friday", time: "10:00am – 6:00pm" },
  { day: "Saturday", time: "11:00am – 4:00pm" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(60rem 30rem at 85% -10%, rgba(196,161,99,0.22), transparent 60%), radial-gradient(40rem 24rem at -10% 110%, rgba(196,161,99,0.12), transparent 60%), linear-gradient(180deg, rgba(11,21,36,0) 0%, rgba(11,21,36,0.85) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="section section-py relative">
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-3 font-display text-display font-bold tracking-tight">
            Let&apos;s talk about your next order
          </h1>
          <div className="mt-6 h-1 w-24 rounded-full bg-brand-gold" />
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-neutral-300">
            Questions about wholesale pricing, trade services, payment, or an
            existing order? Reach the AG Traders team — we typically reply within
            one business day.
          </p>
        </div>
      </section>

      {/* TWO-COLUMN BODY */}
      <section className="section section-py">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* LEFT: contact cards + hours + social */}
          <div>
            <p className="eyebrow">Contact details</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              Reach us directly
            </h2>

            <div className="mt-8 space-y-4">
              {/* Email */}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="card group flex items-start gap-4 p-5"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-brand-gold/15 text-brand-gold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-brand-navy">
                    Email
                  </span>
                  <span className="mt-0.5 block break-words text-neutral-600 transition-colors group-hover:text-brand-gold">
                    {CONTACT_EMAIL}
                  </span>
                </span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${CONTACT_PHONE_HREF}`}
                className="card group flex items-start gap-4 p-5"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-brand-gold/15 text-brand-gold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-brand-navy">
                    Phone
                  </span>
                  <span className="mt-0.5 block text-neutral-600 transition-colors group-hover:text-brand-gold">
                    {CONTACT_PHONE}
                  </span>
                </span>
              </a>

              {/* Address */}
              <div className="card flex items-start gap-4 p-5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-brand-gold/15 text-brand-gold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-brand-navy">
                    Address
                  </span>
                  <span className="mt-0.5 block text-neutral-600">
                    AG Traders, Main Trade Center, Karachi, Pakistan
                  </span>
                </span>
              </div>
            </div>

            {/* Business hours */}
            <div className="mt-10">
              <p className="eyebrow">Business hours</p>
              <h3 className="mt-2 font-display text-xl font-bold text-brand-navy">
                When we&apos;re available
              </h3>
              <dl className="mt-4 divide-y divide-border overflow-hidden rounded-card border border-border bg-surface">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <dt className="text-sm font-medium text-neutral-700">
                      {h.day}
                    </dt>
                    <dd className="text-sm text-neutral-500">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-xs text-muted">All times Pakistan (PKT).</p>
            </div>

            {/* Social row */}
            <div className="mt-10">
              <p className="eyebrow">Follow us</p>
              <div className="mt-3 flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AG Traders on Facebook"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-border bg-surface text-neutral-600 shadow-card transition hover:border-brand-gold hover:text-brand-gold hover:shadow-card-hover"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AG Traders on Instagram"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-border bg-surface text-neutral-600 shadow-card transition hover:border-brand-gold hover:text-brand-gold hover:shadow-card-hover"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/923000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AG Traders on WhatsApp"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-border bg-surface text-neutral-600 shadow-card transition hover:border-brand-gold hover:text-brand-gold hover:shadow-card-hover"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.18c-.25.69-1.45 1.32-1.99 1.4-.53.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5.01-4.36-5.16-4.56-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.31.61-.38.81-.38.2 0 .41 0 .58.01.19.01.44-.07.69.53.25.61.86 2.1.94 2.25.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.32.39-.46.53-.15.15-.31.31-.13.61.18.3.79 1.31 1.7 2.12 1.17 1.04 2.16 1.36 2.46 1.51.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.4-.25.69-.15.28.1 1.77.84 2.07.99.3.15.5.22.58.35.07.13.07.74-.18 1.43z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: inquiry form (mailto, no backend) */}
          <div>
            <div className="card p-6 sm:p-8">
              <p className="eyebrow">Send a message</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-brand-navy">
                Inquiry form
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Fill in the details below and your email client will open with the
                message ready to send to our team.
              </p>

              <form
                action={`mailto:${CONTACT_EMAIL}`}
                method="post"
                encType="text/plain"
                className="mt-6 space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Wholesale order, service inquiry…"
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us what you need, quantities, and timelines…"
                    className="input resize-y"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send message
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22l-4-9-9-4 20-7z" />
                  </svg>
                </button>

                <p className="text-center text-xs text-muted">
                  Prefer email? Write to us directly at{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-brand-gold hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

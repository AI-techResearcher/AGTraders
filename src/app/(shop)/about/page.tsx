import Link from "next/link";

export const metadata = {
  title: "About · AG Traders",
  description:
    "AG Traders supplies wholesale goods and trusted trade services to clients around the globe.",
};

const stats = [
  { value: "30+", label: "Countries served" },
  { value: "500+", label: "Wholesale SKUs" },
  { value: "12", label: "Years in trade" },
  { value: "<24h", label: "Avg. response time" },
];

export default function AboutPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        {/* navy-overlaid visual motif (pure CSS, no image) */}
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
          <p className="eyebrow">Who we are</p>
          <h1 className="mt-3 font-display text-display font-bold tracking-tight">
            Wholesale supply &amp; trade services, delivered with trust
          </h1>
          <div className="mt-6 h-1 w-24 rounded-full bg-brand-gold" />
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-neutral-300">
            AG Traders connects manufacturers and buyers across borders. We move
            footwear, blankets, and hardware in bulk, and back every shipment with
            clearing &amp; forwarding, real estate, and import/export expertise.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="section section-py">
        <p className="eyebrow">Our mission</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
          Reliable trade, simplified end to end
        </h2>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-neutral-600">
          We believe sourcing at scale should be straightforward and dependable.
          From the first quote to final delivery, AG Traders gives clients clear
          minimum order quantities, transparent pricing, and a single team that
          handles the logistics — so you can focus on growing your business.
        </p>
        <p className="mt-4 max-w-prose leading-relaxed text-neutral-600">
          We deliver across Pakistan and beyond with simple guest checkout and
          flexible payment via JazzCash, EasyPaisa, or bank transfer, while our
          services arm manages the paperwork, freight, and on-the-ground details.
        </p>
      </section>

      {/* STATS STRIP */}
      <section className="bg-brand-navy text-white">
        <div className="section section-py">
          <p className="eyebrow">By the numbers</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Trade at scale, trusted worldwide
          </h2>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-brand-navy px-6 py-8 text-center"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-bold text-brand-gold sm:text-5xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-sm font-medium uppercase tracking-wide text-neutral-300">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section section-py">
        <p className="eyebrow">What we do</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
          Two ways we serve our clients
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Link href="/items" className="card group block p-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-btn bg-brand-gold/15 text-brand-gold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M3 7l9-4 9 4-9 4-9-4z" />
                <path d="M3 7v10l9 4 9-4V7" />
                <path d="M12 11v10" />
              </svg>
            </span>
            <p className="eyebrow mt-5">Wholesale</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-brand-navy">
              Items
            </h3>
            <p className="mt-2 leading-relaxed text-neutral-600">
              Footwear, blankets, and hardware supplied in bulk with clear minimum
              order quantities and dependable lead times.
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-gold transition-colors group-hover:text-brand-navy">
              Browse items
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>

          <Link href="/services" className="card group block p-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-btn bg-brand-gold/15 text-brand-gold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M3 21h18" />
                <path d="M5 21V8l7-4 7 4v13" />
                <path d="M9 21v-6h6v6" />
              </svg>
            </span>
            <p className="eyebrow mt-5">Trade services</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-brand-navy">
              Services
            </h3>
            <p className="mt-2 leading-relaxed text-neutral-600">
              Clearing &amp; forwarding, real estate, and import/export trading —
              register your requirement and our team takes it from there.
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-gold transition-colors group-hover:text-brand-navy">
              View services
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

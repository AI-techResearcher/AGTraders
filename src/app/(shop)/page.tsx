import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ServicesSlider } from "@/components/ServicesSlider";

export const revalidate = 60;

const STATS = [
  { value: "30+", label: "Countries served" },
  { value: "5,000+", label: "Wholesale SKUs" },
  { value: "10+", label: "Years in trade" },
  { value: "24h", label: "Avg. response" },
];

const TRUST_BADGES = [
  {
    label: "Worldwide shipping",
    icon: (
      <path
        d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 0c2 1.8 3.2 4.9 3.2 8.5S12 16.7 10 18.5M10 1.5C8 3.3 6.8 6.4 6.8 10S8 16.7 10 18.5M2 7.5h16M2 12.5h16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Verified suppliers",
    icon: (
      <path
        d="M10 1.7 3 4.5v4.8c0 4.3 2.9 7.5 7 8.9 4.1-1.4 7-4.6 7-8.9V4.5L10 1.7Zm-2.6 8.1 1.9 1.9 3.5-3.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Bulk pricing",
    icon: (
      <path
        d="M3 7.5 10 3l7 4.5v5L10 17l-7-4.5v-5Zm0 0 7 4.5m0 0 7-4.5m-7 4.5V17"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

function SectionHeading({
  eyebrow,
  title,
  subhead,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subhead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
        {title}
      </h2>
      <div
        className={`mt-3 h-px w-12 bg-gradient-to-r from-brand-gold to-transparent ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      {subhead && <p className="mt-4 text-neutral-600">{subhead}</p>}
    </div>
  );
}

export default async function HomePage() {
  const [featured, services] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true },
      include: {
        category: true,
        variants: { select: { price: true, stock: true } },
      },
      take: 4,
    }),
    prisma.service.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
  ]);

  return (
    <div>
      {/* ---------------------------------------------------------------- *
       * HERO
       * ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-brand-navy to-navy-700 text-white">
        {/* Faint grid texture overlay (CSS only, no image) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* Soft radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-brand-gold/10 blur-3xl"
        />

        <div className="section relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-8 lg:py-28">
          {/* Copy column */}
          <div>
            <p className="eyebrow">
              AG Traders · Wholesale supply &amp; trade services worldwide
            </p>
            <h1 className="mt-4 max-w-2xl text-display font-display font-bold">
              Bulk items and trusted trade services for clients around the globe
            </h1>
            <p className="mt-5 max-w-xl text-lg text-neutral-300">
              Source footwear, blankets, and hardware in wholesale quantities, or
              engage our clearing &amp; forwarding, real estate, and import/export
              trading services.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/items" className="btn-primary">
                Browse items
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M4 10h12m0 0-4-4m4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="/services" className="btn-outline">
                Our services
              </Link>
            </div>
          </div>

          {/* Visual column (markup/CSS only — no image dependency) */}
          <div className="relative hidden lg:block" aria-hidden="true">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              {/* Gold-ringed translucent panel */}
              <div className="absolute inset-0 rounded-card border border-brand-gold/30 bg-white/[0.04] shadow-card backdrop-blur-sm" />
              {/* Large faded logo mark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-[12rem] font-bold leading-none text-white/5">
                  AG
                </span>
              </div>
              {/* Stacked floating cards */}
              <div className="absolute left-6 top-10 w-44 rounded-card border border-white/10 bg-navy-800/80 p-4 shadow-card-hover backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                  Wholesale
                </div>
                <div className="mt-1 text-sm text-neutral-200">
                  Footwear · Blankets · Hardware
                </div>
              </div>
              <div className="absolute bottom-10 right-5 w-48 rounded-card border border-white/10 bg-navy-800/80 p-4 shadow-card-hover backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                  Trade services
                </div>
                <div className="mt-1 text-sm text-neutral-200">
                  Clearing · Real estate · Import/Export
                </div>
              </div>
              {/* Accent ring */}
              <div className="absolute -bottom-6 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border border-brand-gold/40" />
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- *
         * TRUST / STAT STRIP
         * ---------------------------------------------------------------- */}
        <div className="relative border-t border-white/10">
          <div className="section py-8">
            <dl className="grid grid-cols-2 divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
              {STATS.map((stat) => (
                <div key={stat.label} className="px-2 py-4 text-center sm:py-0">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold text-white sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-6">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-neutral-300"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-4 w-4"
                    >
                      {badge.icon}
                    </svg>
                  </span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thin gold bottom accent */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      </section>

      {/* ---------------------------------------------------------------- *
       * CATEGORY CARDS
       * ---------------------------------------------------------------- */}
      <section className="section section-py">
        <SectionHeading
          eyebrow="What we do"
          title="Two ways to work with us"
          subhead="Buy wholesale stock by the unit, or register a trade-service requirement and let our team handle the deal."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Link
            href="/items"
            className="card group relative overflow-hidden p-8 ring-1 ring-transparent transition group-hover:ring-brand-gold/30 hover:ring-brand-gold/30"
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-gold to-brand-gold/0" />
            <p className="eyebrow">Wholesale</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-neutral-900 group-hover:text-brand-navy">
              Items
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Footwear, blankets, and hardware supplied in bulk with clear minimum
              order quantities.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold">
              Browse items
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M4 10h12m0 0-4-4m4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>

          <Link
            href="/services"
            className="card group relative overflow-hidden p-8 ring-1 ring-transparent transition group-hover:ring-brand-gold/30 hover:ring-brand-gold/30"
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-gold to-brand-gold/0" />
            <p className="eyebrow">Trade services</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-neutral-900 group-hover:text-brand-navy">
              Services
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Clearing &amp; forwarding, real estate, and import/export trading —
              register your requirement and we&apos;ll take it from there.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold">
              View services
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M4 10h12m0 0-4-4m4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * SERVICES SHOWCASE (slider)
       * ---------------------------------------------------------------- */}
      {services.length > 0 && (
        <section className="bg-neutral-50">
          <div className="section section-py">
            <SectionHeading
              eyebrow="Trade services"
              title="End-to-end support for cross-border deals"
              subhead="From customs clearance to property and import/export trading — register a requirement and our team follows up."
            />
            <div className="mt-10">
              <ServicesSlider
                services={services.map((s) => ({
                  slug: s.slug,
                  name: s.name,
                  tagline: s.tagline,
                  image: s.image,
                }))}
              />
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- *
       * FEATURED ITEMS (with graceful empty state)
       * ---------------------------------------------------------------- */}
      <section className="bg-surface">
        <div className="section section-py">
          {featured.length > 0 ? (
            <>
              <div className="flex items-end justify-between gap-4">
                <SectionHeading
                  eyebrow="Hand-picked"
                  title="Featured items"
                  subhead="A selection of wholesale lines ready to ship in bulk."
                />
                <Link
                  href="/items"
                  className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-gold hover:underline sm:inline-flex"
                >
                  View all
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4"
                  >
                    <path
                      d="M4 10h12m0 0-4-4m4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featured.map((product) => {
                  const minPrice = Math.min(
                    ...product.variants.map((v) => v.price)
                  );
                  const totalStock = product.variants.reduce(
                    (s, v) => s + v.stock,
                    0
                  );
                  return (
                    <ProductCard
                      key={product.id}
                      slug={product.slug}
                      name={product.name}
                      images={product.images}
                      minPrice={minPrice}
                      categoryName={product.category.name}
                      inStock={totalStock > 0}
                      minOrderQty={product.minOrderQty}
                      unit={product.unit}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="card flex flex-col items-center px-8 py-14 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-7 w-7"
                >
                  <path
                    d="M3 9.5 12 4l9 5.5v9L12 24l-9-5.5v-9Z"
                    transform="translate(0 -2)"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m3 7.5 9 5.5 9-5.5M12 13v9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="eyebrow mt-5">Restocking</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-navy">
                New wholesale lines arriving soon
              </h2>
              <p className="mt-3 max-w-md text-neutral-600">
                We&apos;re curating fresh bulk inventory. Browse the full catalogue
                in the meantime, or get in touch about a specific requirement.
              </p>
              <Link href="/items" className="btn-primary mt-6">
                Browse all items
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M4 10h12m0 0-4-4m4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

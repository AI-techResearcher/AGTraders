import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ServicesSlider } from "@/components/ServicesSlider";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services · AG Traders",
  description:
    "Clearing & forwarding, real estate, and import/export trading services for clients worldwide.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <p className="eyebrow">What we do</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
        Services
      </h1>
      <p className="mt-2 max-w-2xl text-neutral-600">
        From customs clearance to cross-border trade and property, register your
        requirement and our team will follow up to handle the deal.
      </p>

      <div className="mt-8">
        <ServicesSlider
          services={services.map((s) => ({
            slug: s.slug,
            name: s.name,
            tagline: s.tagline,
            image: s.image,
          }))}
        />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group flex flex-col rounded-card border border-border bg-surface p-6 shadow-card transition-shadow duration-300 hover:-translate-y-0.5 hover:border-brand-gold hover:shadow-card-hover"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 2 2 7l10 5 10-5-10-5Z" />
                <path d="m2 17 10 5 10-5" />
                <path d="m2 12 10 5 10-5" />
              </svg>
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold text-neutral-900 group-hover:text-brand-navy">
              {service.name}
            </h2>
            {service.tagline && (
              <p className="mt-2 text-sm text-neutral-600">{service.tagline}</p>
            )}
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold">
              Register
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

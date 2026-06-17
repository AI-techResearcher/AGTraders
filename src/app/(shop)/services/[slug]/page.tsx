import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/Breadcrumb";

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

type ServiceField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "date";
  options?: string[];
  required?: boolean;
};

function parseFields(json: string): ServiceField[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? (parsed as ServiceField[]) : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) return { title: "Service not found · AG Traders" };
  return {
    title: `${service.name} · AG Traders`,
    description: service.tagline ?? service.description.slice(0, 150),
  };
}

function LockGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-neutral-400"
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </svg>
  );
}

function ClockGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0 text-brand-gold"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });

  if (!service || !service.active) notFound();

  const fields = parseFields(service.fields);

  const commonRows: { label: string; required?: boolean }[] = [
    { label: "Full name", required: true },
    { label: "Company" },
    { label: "Country", required: true },
    { label: "Email", required: true },
    { label: "Phone", required: true },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      {/* Contained hero */}
      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-card border border-border bg-neutral-900 shadow-card">
        {service.image && (
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
            sizes="(max-width: 1152px) 100vw, 1152px"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          {service.tagline && (
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
              {service.tagline}
            </p>
          )}
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-white lg:text-4xl">
            {service.name}
          </h1>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Main column */}
        <div>
          <p className="eyebrow">Service overview</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            About this service
          </h2>
          <p className="mt-4 max-w-prose whitespace-pre-line leading-7 text-neutral-600">
            {service.description}
          </p>

          {/* Read-only "What we'll ask" summary */}
          <div className="mt-10 rounded-card border border-border bg-surface p-6 shadow-card">
            <div className="flex items-center gap-2">
              <LockGlyph />
              <h3 className="font-display text-xl font-bold text-brand-navy">
                What we&apos;ll ask
              </h3>
            </div>
            <p className="mt-1 text-sm text-muted">
              A quick look at the details we&apos;ll collect when you reach out.
              Nothing to fill in here.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {commonRows.map((row) => (
                <SummaryRow key={row.label} label={row.label} required={row.required} />
              ))}
              {fields.map((field) => (
                <SummaryRow
                  key={field.name}
                  label={field.label}
                  required={field.required}
                  options={field.type === "select" ? field.options : undefined}
                  full={field.type === "textarea"}
                />
              ))}
              <SummaryRow label="Message / additional details" full />
            </div>
          </div>
        </div>

        {/* Sticky summary / CTA card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border border-border bg-surface p-6 shadow-card">
            <p className="eyebrow">Get started</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-brand-navy">
              {service.name}
            </h3>
            {service.tagline && (
              <p className="mt-1 text-sm text-neutral-600">{service.tagline}</p>
            )}

            <Link href="/contact" className="btn-primary mt-6 w-full">
              Request this service
            </Link>

            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
              <ClockGlyph />
              <span>Typically responds in 24h</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  required,
  options,
  full,
}: {
  label: string;
  required?: boolean;
  options?: string[];
  full?: boolean;
}) {
  return (
    <div
      className={`rounded-lg bg-neutral-50 px-4 py-3 ${full ? "sm:col-span-2" : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-brand-navy">
          {label}
          {required && <span className="ml-0.5 text-brand-gold">*</span>}
        </span>
        <LockGlyph />
      </div>
      {options && options.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {options.map((opt) => (
            <span
              key={opt}
              className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-neutral-500"
            >
              {opt}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseImages, formatPKR } from "@/lib/format";
import { AddToCartForm } from "@/components/AddToCartForm";
import { ProductGallery } from "@/components/ProductGallery";
import { Breadcrumb } from "@/components/Breadcrumb";

export const revalidate = 30;

type Props = { params: Promise<{ slug: string }> };

function TrustIcon({ name }: { name: "verified" | "tag" | "truck" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6 text-brand-gold",
    "aria-hidden": true,
  };
  if (name === "verified") {
    return (
      <svg {...common}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  if (name === "tag") {
    return (
      <svg {...common}>
        <path d="M3 12V5a2 2 0 012-2h7l9 9-9 9-9-9z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </svg>
  );
}

const TRUST = [
  { icon: "verified" as const, label: "Verified wholesale supplier" },
  { icon: "tag" as const, label: "Bulk pricing on request" },
  { icon: "truck" as const, label: "Ships nationwide" },
];

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: { orderBy: [{ size: "asc" }, { color: "asc" }] },
    },
  });

  if (!product) notFound();

  const images = parseImages(product.images);
  const unit = product.unit ?? "unit";

  const prices = product.variants.map((v) => v.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const firstSku = product.variants[0]?.sku ?? "—";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: product.category.name, href: `/items/${product.category.slug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={images} alt={product.name} />

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">{product.category.name}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-navy lg:text-4xl">
            {product.name}
          </h1>

          {minPrice > 0 && (
            <p className="mt-3 flex items-baseline gap-1.5">
              <span className="text-sm text-muted">from</span>
              <span className="text-3xl font-semibold text-brand-navy">
                {formatPKR(minPrice)}
              </span>
              <span className="text-sm text-muted">per {unit}</span>
            </p>
          )}

          {product.minOrderQty > 1 && (
            <p className="mt-3 inline-block rounded-full bg-brand-navy/5 px-3 py-1 text-sm font-medium text-brand-navy">
              Wholesale · minimum order {product.minOrderQty} {product.unit ?? "units"}
            </p>
          )}

          <p className="mt-4 max-w-prose leading-7 text-neutral-600">
            {product.description}
          </p>

          <div className="mt-6 rounded-card border border-border bg-surface p-6 shadow-card">
            <AddToCartForm variants={product.variants} />
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {TRUST.map((t) => (
          <div key={t.label} className="card flex items-center gap-3 p-5">
            <TrustIcon name={t.icon} />
            <span className="text-sm font-medium text-brand-navy">{t.label}</span>
          </div>
        ))}
      </div>

      {/* Spec block */}
      <div className="mt-10">
        <p className="eyebrow">Specifications</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
          Product details
        </h2>
        <dl className="mt-6 max-w-2xl divide-y divide-border rounded-card border border-border bg-surface shadow-card">
          {[
            { term: "SKU", value: firstSku },
            { term: "Category", value: product.category.name },
            { term: "Unit", value: unit },
            { term: "MOQ", value: `${product.minOrderQty} ${product.unit ?? "units"}` },
            { term: "Lead time", value: "2–5 business days" },
          ].map((row) => (
            <div
              key={row.term}
              className="flex items-center justify-between gap-4 px-5 py-3.5"
            >
              <dt className="text-sm text-muted">{row.term}</dt>
              <dd className="text-sm font-medium text-brand-navy">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { formatPKR, parseImages } from "@/lib/format";

type ProductCardProps = {
  slug: string;
  name: string;
  images: string;
  minPrice: number;
  categoryName: string;
  inStock?: boolean;
  minOrderQty?: number;
  unit?: string | null;
};

export function ProductCard({
  slug,
  name,
  images,
  minPrice,
  categoryName,
  inStock = true,
  minOrderQty,
  unit,
}: ProductCardProps) {
  const imageList = parseImages(images);
  const image = imageList[0] ?? "/placeholder.svg";
  const hasMoq = !!minOrderQty && minOrderQty > 1;
  const pillLabel = hasMoq
    ? `MOQ ${minOrderQty} ${unit ?? "units"}`
    : categoryName;

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition-shadow duration-300 hover:-translate-y-0.5 hover:border-brand-gold hover:shadow-card-hover"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover transition-transform duration-300 ease-out group-hover:scale-105 ${
            !inStock ? "opacity-60 grayscale" : ""
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />

        {pillLabel && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-navy shadow-sm backdrop-blur-sm">
            {pillLabel}
          </span>
        )}

        {!inStock && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-navy/80 px-3 py-1 text-xs font-semibold text-white">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="min-h-[2.5rem] text-sm font-semibold text-neutral-900 line-clamp-2 group-hover:text-brand-navy">
          {name}
        </h3>
        <div className="mt-auto pt-3">
          <span className="block text-[11px] font-medium uppercase tracking-wide text-neutral-400">
            From
          </span>
          <span className="text-base font-bold text-brand-navy">
            {formatPKR(minPrice)}
          </span>
        </div>
      </div>
    </Link>
  );
}

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
};

export function ProductCard({
  slug,
  name,
  images,
  minPrice,
  categoryName,
  inStock = true,
}: ProductCardProps) {
  const imageList = parseImages(images);
  const image = imageList[0] ?? "/placeholder.svg";

  return (
    <Link
      href={`/products/${slug}`}
      className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-gold">
          {categoryName}
        </p>
        <h3 className="mt-1 font-semibold text-zinc-900 group-hover:text-brand-navy">
          {name}
        </h3>
        <p className="mt-2 text-sm font-medium text-zinc-700">
          From {formatPKR(minPrice)}
        </p>
        {!inStock && (
          <p className="mt-1 text-xs font-medium text-red-600">Out of stock</p>
        )}
      </div>
    </Link>
  );
}

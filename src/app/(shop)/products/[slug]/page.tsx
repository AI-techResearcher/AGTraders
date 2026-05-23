import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseImages } from "@/lib/format";
import { AddToCartForm } from "@/components/AddToCartForm";

export const revalidate = 30;

type Props = { params: Promise<{ slug: string }> };

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm font-medium text-brand-gold">{product.category.name}</p>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100">
          <Image
            src={images[0] ?? "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">{product.name}</h1>
          <p className="mt-4 leading-relaxed text-zinc-600">{product.description}</p>
          <div className="mt-8">
            <AddToCartForm variants={product.variants} />
          </div>
        </div>
      </div>
    </div>
  );
}

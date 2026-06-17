import Link from "next/link";
import Image from "next/image";
import { getCart } from "@/lib/cart";
import { prisma } from "@/lib/prisma";
import { formatPKR, parseImages } from "@/lib/format";
import { CartItemControls } from "@/components/CartItemControls";

const SHIPPING_FLAT = 250;

export default async function CartPage() {
  const cart = await getCart();

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-brand-navy">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="18" cy="20" r="1.4" />
            <path d="M2.5 3h2l1.6 11.2a1.5 1.5 0 0 0 1.5 1.3h9.1a1.5 1.5 0 0 0 1.48-1.22L20 7H5.2" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-brand-navy">
          Your cart is empty
        </h1>
        <p className="mt-2 text-muted">Add some products to get started.</p>
        <Link href="/products" className="btn-primary mt-6">
          Browse products
        </Link>
      </div>
    );
  }

  const variantIds = cart.items.map((i) => i.variantId);
  const variants = await prisma.productVariant.findMany({
    where: { id: { in: variantIds } },
    include: { product: { include: { category: true } } },
  });

  const lines = cart.items
    .map((item) => {
      const variant = variants.find((v) => v.id === item.variantId);
      if (!variant) return null;
      return { item, variant };
    })
    .filter(Boolean) as {
    item: { variantId: string; quantity: number };
    variant: (typeof variants)[0];
  }[];

  const subtotal = lines.reduce((sum, { item, variant }) => sum + variant.price * item.quantity, 0);
  const total = subtotal + SHIPPING_FLAT;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
        Shopping cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {lines.map(({ item, variant }) => {
            const images = parseImages(variant.product.images);
            return (
              <div key={variant.id} className="card flex gap-4 p-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  <Image
                    src={images[0] ?? "/placeholder.svg"}
                    alt={variant.product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                  <div>
                    <Link
                      href={`/products/${variant.product.slug}`}
                      className="font-display font-semibold text-brand-navy transition-colors hover:text-brand-gold"
                    >
                      {variant.product.name}
                    </Link>
                    <p className="text-sm text-muted">
                      {variant.size} / {variant.color} · {variant.sku}
                    </p>
                    <p className="mt-1 font-semibold text-neutral-900">{formatPKR(variant.price)}</p>
                  </div>
                  <CartItemControls variantId={variant.id} quantity={item.quantity} stock={variant.stock} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="card h-fit p-6">
          <h2 className="font-display text-lg font-semibold text-brand-navy">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-medium text-neutral-900">{formatPKR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping (flat)</dt>
              <dd className="font-medium text-neutral-900">{formatPKR(SHIPPING_FLAT)}</dd>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-3 text-base font-bold text-brand-navy">
              <dt>Total</dt>
              <dd>{formatPKR(total)}</dd>
            </div>
          </dl>
          <Link href="/checkout" className="btn-primary mt-6 w-full">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

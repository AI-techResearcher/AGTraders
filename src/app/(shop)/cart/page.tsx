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
        <h1 className="text-2xl font-bold text-zinc-900">Your cart is empty</h1>
        <p className="mt-2 text-zinc-600">Add some products to get started.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-xl bg-brand-gold px-6 py-3 font-semibold text-white hover:bg-brand-gold-light"
        >
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
      <h1 className="text-3xl font-bold text-zinc-900">Shopping cart</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {lines.map(({ item, variant }) => {
            const images = parseImages(variant.product.images);
            return (
              <div
                key={variant.id}
                className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
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
                      className="font-semibold text-zinc-900 hover:text-brand-navy"
                    >
                      {variant.product.name}
                    </Link>
                    <p className="text-sm text-zinc-500">
                      {variant.size} / {variant.color} · {variant.sku}
                    </p>
                    <p className="mt-1 font-medium">{formatPKR(variant.price)}</p>
                  </div>
                  <CartItemControls variantId={variant.id} quantity={item.quantity} stock={variant.stock} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-fit rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="font-semibold text-zinc-900">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-600">Subtotal</dt>
              <dd>{formatPKR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-600">Shipping (flat)</dt>
              <dd>{formatPKR(SHIPPING_FLAT)}</dd>
            </div>
            <div className="flex justify-between border-t border-zinc-100 pt-2 text-base font-bold">
              <dt>Total</dt>
              <dd>{formatPKR(total)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-xl bg-brand-gold py-3 text-center font-semibold text-white hover:bg-brand-gold-light"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

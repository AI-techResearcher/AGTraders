import { redirect } from "next/navigation";
import { getCart } from "@/lib/cart";
import { prisma } from "@/lib/prisma";
import { CheckoutForm } from "@/components/CheckoutForm";

const SHIPPING_FLAT = 250;

export default async function CheckoutPage() {
  const cart = await getCart();
  if (cart.items.length === 0) redirect("/cart");

  const variants = await prisma.productVariant.findMany({
    where: { id: { in: cart.items.map((i) => i.variantId) } },
  });

  const subtotal = cart.items.reduce((sum, item) => {
    const v = variants.find((x) => x.id === item.variantId);
    return sum + (v ? v.price * item.quantity : 0);
  }, 0);

  const total = subtotal + SHIPPING_FLAT;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Checkout</h1>
      <p className="mt-2 text-zinc-600">Guest checkout — no account required.</p>
      <div className="mt-8">
        <CheckoutForm subtotal={subtotal} shipping={SHIPPING_FLAT} total={total} />
      </div>
    </div>
  );
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCart, setCart } from "@/lib/cart";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/format";

const SHIPPING_FLAT = 250;

const checkoutSchema = z.object({
  guestName: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  email: z.string().email(),
  address: z.string().min(5).max(300),
  city: z.string().min(2).max(100),
  province: z.string().min(2).max(100),
  postalCode: z.string().max(20).optional(),
  preferredPayment: z.enum(["jazzcash", "easypaisa", "bank"]),
  paymentNote: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your details and try again." },
      { status: 400 }
    );
  }

  const cart = await getCart();
  if (cart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const variants = await prisma.productVariant.findMany({
    where: { id: { in: cart.items.map((i) => i.variantId) } },
    include: { product: true },
  });

  for (const item of cart.items) {
    const variant = variants.find((v) => v.id === item.variantId);
    if (!variant) {
      return NextResponse.json({ error: "A product in your cart is no longer available." }, { status: 400 });
    }
    if (variant.stock < item.quantity) {
      return NextResponse.json(
        { error: `Not enough stock for ${variant.product.name} (${variant.size}/${variant.color}).` },
        { status: 400 }
      );
    }
  }

  const subtotal = cart.items.reduce((sum, item) => {
    const v = variants.find((x) => x.id === item.variantId)!;
    return sum + v.price * item.quantity;
  }, 0);
  const total = subtotal + SHIPPING_FLAT;

  const orderNumber = generateOrderNumber();

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        orderNumber,
        guestName: parsed.data.guestName,
        phone: parsed.data.phone,
        email: parsed.data.email.trim().toLowerCase(),
        address: parsed.data.address,
        city: parsed.data.city,
        province: parsed.data.province,
        postalCode: parsed.data.postalCode ?? null,
        preferredPayment: parsed.data.preferredPayment,
        paymentNote: parsed.data.paymentNote ?? null,
        subtotal,
        shipping: SHIPPING_FLAT,
        total,
        status: "awaiting_payment",
        items: {
          create: cart.items.map((item) => {
            const v = variants.find((x) => x.id === item.variantId)!;
            return {
              variantId: v.id,
              productName: v.product.name,
              sku: v.sku,
              size: v.size,
              color: v.color,
              price: v.price,
              quantity: item.quantity,
            };
          }),
        },
      },
    });

    for (const item of cart.items) {
      await tx.productVariant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return created;
  });

  await setCart({ items: [] });

  return NextResponse.json({ orderNumber: order.orderNumber });
}

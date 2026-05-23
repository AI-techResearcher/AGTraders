import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getCart,
  setCart,
  mergeCartItem,
  updateCartItemQuantity,
  removeCartItem,
} from "@/lib/cart";
import { prisma } from "@/lib/prisma";

const addSchema = z.object({
  variantId: z.string().min(1),
  quantity: z.number().int().min(1).max(99),
});

const updateSchema = z.object({
  variantId: z.string().min(1),
  quantity: z.number().int().min(0).max(99),
});

const removeSchema = z.object({
  variantId: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = addSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const variant = await prisma.productVariant.findUnique({
    where: { id: parsed.data.variantId },
  });
  if (!variant || variant.stock < parsed.data.quantity) {
    return NextResponse.json({ error: "Not enough stock" }, { status: 400 });
  }

  const cart = await getCart();
  const updated = mergeCartItem(cart, parsed.data.variantId, parsed.data.quantity);

  const existingQty =
    cart.items.find((i) => i.variantId === parsed.data.variantId)?.quantity ?? 0;
  const newQty = existingQty + parsed.data.quantity;
  if (newQty > variant.stock) {
    return NextResponse.json({ error: "Not enough stock" }, { status: 400 });
  }

  await setCart(updated);
  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const variant = await prisma.productVariant.findUnique({
    where: { id: parsed.data.variantId },
  });
  if (!variant) {
    return NextResponse.json({ error: "Variant not found" }, { status: 404 });
  }
  if (parsed.data.quantity > 0 && parsed.data.quantity > variant.stock) {
    return NextResponse.json({ error: "Not enough stock" }, { status: 400 });
  }

  const cart = await getCart();
  const updated = updateCartItemQuantity(
    cart,
    parsed.data.variantId,
    parsed.data.quantity
  );
  await setCart(updated);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = removeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const cart = await getCart();
  const updated = removeCartItem(cart, parsed.data.variantId);
  await setCart(updated);
  return NextResponse.json({ ok: true });
}

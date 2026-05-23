import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/format";
import { formatOrderStatus } from "@/lib/order-status";

const schema = z.object({
  orderNumber: z.string().min(5).max(30),
  email: z.string().email(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid order number and email." }, { status: 400 });
  }

  const orderNumber = parsed.data.orderNumber.trim();
  const email = parsed.data.email.trim().toLowerCase();

  const order = await prisma.order.findFirst({
    where: {
      orderNumber: { equals: orderNumber },
      email: { equals: email },
    },
    include: { items: true },
  });

  if (!order) {
    return NextResponse.json(
      { error: "No order found. Check your order number and email." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    orderNumber: order.orderNumber,
    status: order.status,
    statusLabel: formatOrderStatus(order.status),
    total: formatPKR(order.total),
    createdAt: order.createdAt.toISOString(),
    preferredPayment: order.preferredPayment,
    items: order.items.map((i) => ({
      name: i.productName,
      size: i.size,
      color: i.color,
      quantity: i.quantity,
      lineTotal: formatPKR(i.price * i.quantity),
    })),
  });
}

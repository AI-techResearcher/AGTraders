"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  requireAdmin,
  setAdminSession,
  clearAdminSession,
  validateAdminCredentials,
} from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";
import { ORDER_STATUSES } from "@/lib/order-status";

export type ActionResult = { error?: string; success?: boolean };

export async function loginAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!validateAdminCredentials(email, password)) {
    return { error: "Invalid email or password." };
  }

  await setAdminSession(email);
  const from = String(formData.get("from") ?? "/admin");
  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function savePaymentSettings(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const data = {
    jazzcashNumber: String(formData.get("jazzcashNumber") ?? "").trim(),
    easypaisaNumber: String(formData.get("easypaisaNumber") ?? "").trim(),
    bankName: String(formData.get("bankName") ?? "").trim(),
    accountTitle: String(formData.get("accountTitle") ?? "").trim(),
    accountNumber: String(formData.get("accountNumber") ?? "").trim(),
    iban: String(formData.get("iban") ?? "").trim(),
  };

  if (Object.values(data).some((v) => !v)) {
    return { error: "All payment fields are required." };
  }

  await prisma.paymentSettings.upsert({
    where: { id: "default" },
    create: { id: "default", ...data },
    update: data,
  });

  revalidatePath("/admin/settings");
  return { success: true };
}

export async function saveCategory(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput || slugify(name);

  if (!name) redirect("/admin/categories?error=name-required");

  try {
    if (id) {
      await prisma.category.update({ where: { id }, data: { name, slug } });
    } else {
      await prisma.category.create({ data: { name, slug } });
    }
  } catch {
    redirect("/admin/categories?error=slug-exists");
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const count = await prisma.product.count({ where: { categoryId: id } });
  if (count > 0) redirect("/admin/categories?error=has-products");
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function saveProduct(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput || slugify(name);
  const description = String(formData.get("description") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const featured = formData.get("featured") === "on";
  const imagesRaw = String(formData.get("images") ?? "").trim();
  const images = JSON.stringify(
    imagesRaw
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean)
  );

  const variantsJson = String(formData.get("variants") ?? "[]");
  let variants: { sku: string; size: string; color: string; price: number; stock: number }[];
  try {
    variants = JSON.parse(variantsJson);
  } catch {
    return { error: "Invalid variants data." };
  }

  if (!name || !description || !categoryId) {
    return { error: "Name, description, and category are required." };
  }
  if (variants.length === 0) {
    return { error: "Add at least one variant (SKU)." };
  }

  for (const v of variants) {
    if (!v.sku || !v.size || !v.color || v.price < 0 || v.stock < 0) {
      return { error: "Each variant needs SKU, size, color, price, and stock." };
    }
  }

  try {
    if (id) {
      await prisma.product.update({
        where: { id },
        data: { name, slug, description, categoryId, featured, images },
      });
      await prisma.productVariant.deleteMany({ where: { productId: id } });
      await prisma.productVariant.createMany({
        data: variants.map((v) => ({ ...v, productId: id, price: Math.round(v.price) })),
      });
    } else {
      await prisma.product.create({
        data: {
          name,
          slug,
          description,
          categoryId,
          featured,
          images,
          variants: {
            create: variants.map((v) => ({ ...v, price: Math.round(v.price) })),
          },
        },
      });
    }
  } catch {
    return { error: "Could not save product. Check slug and SKU uniqueness." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateOrderStatus(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])) {
    return { error: "Invalid status." };
  }

  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin/orders");
  return { success: true };
}

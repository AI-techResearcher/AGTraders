import { cookies } from "next/headers";

export type CartItem = {
  variantId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};

const CART_COOKIE = "cart";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function getCart(): Promise<Cart> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CART_COOKIE)?.value;
  if (!raw) return { items: [] };
  try {
    const parsed = JSON.parse(raw) as Cart;
    if (!parsed.items || !Array.isArray(parsed.items)) return { items: [] };
    return {
      items: parsed.items.filter(
        (i) => i.variantId && typeof i.quantity === "number" && i.quantity > 0
      ),
    };
  } catch {
    return { items: [] };
  }
}

export async function setCart(cart: Cart): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, JSON.stringify(cart), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function getCartItemCount(cart: Cart): number {
  return cart.items.reduce((sum, i) => sum + i.quantity, 0);
}

export function mergeCartItem(cart: Cart, variantId: string, quantity: number): Cart {
  const existing = cart.items.find((i) => i.variantId === variantId);
  if (existing) {
    return {
      items: cart.items.map((i) =>
        i.variantId === variantId
          ? { ...i, quantity: i.quantity + quantity }
          : i
      ),
    };
  }
  return { items: [...cart.items, { variantId, quantity }] };
}

export function updateCartItemQuantity(
  cart: Cart,
  variantId: string,
  quantity: number
): Cart {
  if (quantity <= 0) {
    return { items: cart.items.filter((i) => i.variantId !== variantId) };
  }
  return {
    items: cart.items.map((i) =>
      i.variantId === variantId ? { ...i, quantity } : i
    ),
  };
}

export function removeCartItem(cart: Cart, variantId: string): Cart {
  return { items: cart.items.filter((i) => i.variantId !== variantId) };
}

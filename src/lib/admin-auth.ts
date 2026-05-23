import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  createSessionToken,
  verifySessionToken,
} from "@/lib/admin-token";

export { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-token";

const MAX_AGE_SEC = 60 * 60 * 24 * 7;

export function validateAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;
  return email === adminEmail && password === adminPassword;
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setAdminSession(email: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, await createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SEC,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function requireAdmin(): Promise<{ email: string }> {
  const session = await getAdminSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}

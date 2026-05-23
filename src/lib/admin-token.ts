export const ADMIN_COOKIE = "admin_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 7;

function getSecret(): string {
  return process.env.ADMIN_SECRET ?? "change-me-in-production";
}

function base64urlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function sign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data)
  );
  return base64urlEncode(new Uint8Array(signature));
}

export async function createSessionToken(email: string): Promise<string> {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const payload = base64urlEncode(
    new TextEncoder().encode(JSON.stringify({ email, exp }))
  );
  return `${payload}.${await sign(payload)}`;
}

export async function verifySessionToken(
  token: string
): Promise<{ email: string } | null> {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const expected = await sign(payload);
  if (!timingSafeEqual(sig, expected)) return null;

  try {
    const data = JSON.parse(base64urlDecode(payload)) as {
      email: string;
      exp: number;
    };
    if (data.exp < Date.now()) return null;
    if (data.email !== process.env.ADMIN_EMAIL) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}

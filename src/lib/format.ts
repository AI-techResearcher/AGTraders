export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

export function parseImages(imagesJson: string): string[] {
  try {
    const parsed = JSON.parse(imagesJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function generateOrderNumber(): string {
  const date = new Date();
  const ymd =
    date.getFullYear().toString().slice(-2) +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ORD-${ymd}-${rand}`;
}

import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AG Traders — Shoes, Blankets & Home Goods",
    template: "%s | AG Traders",
  },
  description:
    "AG Traders — shop quality physical goods online in Pakistan. Pay via JazzCash, EasyPaisa, or bank transfer.",
  icons: {
    icon: "/ag-traders-logo.png",
    apple: "/ag-traders-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "AG Traders",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

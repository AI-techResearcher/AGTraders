import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["500", "600", "700", "800"],
});

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
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

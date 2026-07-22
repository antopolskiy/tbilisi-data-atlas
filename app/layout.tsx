import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: "Tbilisi Data Atlas",
    template: "%s · Tbilisi Data Atlas",
  },
  description:
    "An evidence-first catalog of Tbilisi and Georgia data sources, plus bounded ideas that connect them.",
  openGraph: {
    type: "website",
    title: "Tbilisi Data Atlas",
    description:
      "Explore field-level public data sources and the unexpected, people-centered ideas created by connecting them.",
    images: [
      {
        url: `${siteUrl}/og-ideas.png`,
        width: 1731,
        height: 909,
        alt: "Tbilisi Data Atlas: 50 public data sources connected to 24 people-centered ideas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${siteUrl}/og-ideas.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

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
    "An evidence-first, field-level catalog of public and publicly observable data sources for Tbilisi and Georgia.",
  openGraph: {
    type: "website",
    title: "Tbilisi Data Atlas",
    description:
      "An evidence-first, field-level catalog of public and publicly observable data sources for Tbilisi and Georgia.",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "An editorial map-like illustration of Tbilisi as a network of civic data sources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${siteUrl}/og.png`],
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

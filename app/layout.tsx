import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import { Toaster } from "sonner";
import ChatWidget from "@/components/chat/ChatWidget";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Use deployed URL for absolute OG image URLs (required by Facebook/Twitter/WhatsApp)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://slyshair.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "SlysHair.com | The Essence of Hair",
    template: "%s | SlysHair.com",
  },
  description:
    "Premium Vietnamese human hair — bundles, wigs, frontals, closures, and extensions. Double drawn. Ethically sourced. Factory direct pricing.",
  keywords: [
    "Vietnamese hair", "human hair bundles", "HD lace wigs", "hair extensions",
    "frontals", "closures", "luxury hair", "wholesale hair", "SlysHair",
  ],
  authors: [{ name: "SlysHair" }],
  creator: "SlysHair",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "SlysHair.com",
    title: "SlysHair.com — The Essence of Hair",
    description:
      "Premium Vietnamese human hair. Double drawn, ethically sourced, factory direct.",
    url: SITE_URL,
    locale: "en_GB",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "SlysHair — The Essence of Hair",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SlysHair.com — The Essence of Hair",
    description: "Premium Vietnamese human hair. Factory direct.",
    images: ["/opengraph-image.jpg"],
    creator: "@slyshair",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${urbanist.variable} antialiased selection:bg-gold-500/30 font-sans`}
      >
        <SessionProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <ChatWidget />
          <Toaster theme="dark" richColors position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}

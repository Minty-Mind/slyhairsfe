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
  metadataBase: new URL("https://slyshair.com"),
  openGraph: {
    type: "website",
    siteName: "SlysHair.com",
    title: "SlysHair.com — The Essence of Hair",
    description:
      "Premium Vietnamese human hair. Double drawn, ethically sourced, factory direct.",
    images: [
      {
        url: "/logo.jpg",
        width: 1080,
        height: 1080,
        alt: "SlysHair Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SlysHair.com — The Essence of Hair",
    description: "Premium Vietnamese human hair. Factory direct.",
    images: ["/logo.jpg"],
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

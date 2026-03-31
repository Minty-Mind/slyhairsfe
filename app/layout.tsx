import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import { Toaster } from "sonner";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SlyHairs | Premium Vietnamese Human Hair Factory",
  description: "Luxury hair extensions, weaves, and wigs for professional stylists and hair vendors.",
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
          <Toaster theme="dark" richColors position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HideOnRoutes from "@/components/layout/HideOnRoutes";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const preferredRegion = ['sin1']

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Transmission Centre | Premium CI Hand Wheels, Disc Pack Couplings & Transmission Products in Secunderabad",
    template: "%s | Transmission Centre",
  },
  description: "Transmission Centre is a leading supplier of CI hand wheels, disc pack couplings, nylon gear couplings, rubber spiders, jaw couplings, tyre couplings, and premium transmission products in Secunderabad, Hyderabad. Established 2016. JD Verified.",
  keywords: [
    "transmission centre", "transmission products", "CI hand wheels", "cast iron hand wheels",
    "disc pack coupling", "disc pack couplings", "nylon gear coupling", "nylon gear couplings",
    "rubber spiders", "jaw couplings", "tyre couplings", "tyre coupling",
    "transmission parts Hyderabad", "transmission products Secunderabad",
    "industrial couplings", "gear coupling", "flexible coupling",
    "coupling manufacturer", "coupling supplier Hyderabad",
    "Ranigunj Secunderabad", "power transmission", "mechanical coupling",
    "industrial transmission components", "coupling dealer Telangana",
  ],
  authors: [{ name: "Transmission Centre" }],
  creator: "Transmission Centre",
  publisher: "Transmission Centre",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "Transmission Centre",
    title: "Transmission Centre | Premium CI Hand Wheels, Disc Pack Couplings & Transmission Products",
    description: "Your trusted partner for CI hand wheels, disc pack couplings, nylon gear couplings, rubber spiders and industrial transmission products in Secunderabad, Hyderabad.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Transmission Centre Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transmission Centre | Premium Transmission Products",
    description: "Leading supplier of CI hand wheels, disc pack couplings, nylon gear couplings and transmission products in Secunderabad.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "Industrial Equipment",
};

const hiddenRoutes = ["/admin", "/login", "/setup"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-white text-brand-black">
        <HideOnRoutes routes={hiddenRoutes}>
          <Navbar />
        </HideOnRoutes>
        <main className="flex-grow">{children}</main>
        <HideOnRoutes routes={hiddenRoutes}>
          <Footer />
        </HideOnRoutes>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

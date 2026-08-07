import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Transmission Centre Secunderabad | Established 2016",
  description: "Learn about Transmission Centre, Secunderabad — established in 2016 as a trusted supplier of CI hand wheels, disc pack couplings, nylon gear couplings, rubber spiders, and premium transmission products. JD Verified. Located at Ranigunj, Secunderabad.",
  keywords: [
    "about transmission centre", "transmission centre Secunderabad",
    "established 2016", "JD verified", "transmission products supplier",
    "Ranigunj Secunderabad", "industrial couplings dealer",
    "CI hand wheels supplier", "Hyderabad transmission parts",
  ],
  openGraph: {
    title: "About Transmission Centre",
    description: "Trusted supplier of transmission products in Secunderabad since 2016. JD Verified.",
    url: "/about",
    siteName: "Transmission Centre",
    images: [{ url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com'}/logo.png`, width: 512, height: 512, alt: "Transmission Centre Logo", type: "image/png" }],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Transmission Centre",
    description: "Trusted supplier of transmission products in Secunderabad since 2016. JD Verified.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com'}/logo.png`],
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="py-24 relative overflow-hidden bg-transparent">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tighter text-brand-black">About Us</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner in industrial transmission solutions since 2016.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-brand-green/10 to-brand-green/20 rounded-3xl shadow-glass border border-brand-green/30 p-8 md:p-12">
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed text-gray-700 mb-12">
              Transmission Centre in Secunderabad City, Hyderabad is known to satisfactorily cater to the demands of its customer base. We specialize in high-quality transmission components and strive to make for a positive experience through all our offerings.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="bg-gradient-to-br from-brand-yellow/5 to-brand-yellow/20 rounded-2xl p-8 border border-brand-yellow/20">
                <h2 className="text-2xl font-bold mb-6 text-brand-black tracking-tight">Our Credentials</h2>
                <p className="mb-8 text-gray-600">
                  We have earned badges of trust that substantiate the credentials of our business, ensuring you receive only the most reliable service.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 bg-white/50 px-5 py-4 rounded-xl shadow-sm border border-brand-yellow/10">
                    <CheckCircle2 className="text-brand-green w-6 h-6" />
                    <span className="font-bold text-gray-800 tracking-wide">Jd Verified</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white/50 px-5 py-4 rounded-xl shadow-sm border border-brand-yellow/10">
                    <CheckCircle2 className="text-brand-green w-6 h-6" />
                    <span className="font-bold text-gray-800 tracking-wide">Jd Pay Accepted</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white/50 px-5 py-4 rounded-xl shadow-sm border border-brand-yellow/10">
                    <CheckCircle2 className="text-brand-green w-6 h-6" />
                    <span className="font-bold text-gray-800 tracking-wide">Established Since 2016</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6 text-brand-black tracking-tight">Seamless Transactions</h2>
                <p className="mb-10 text-gray-600 leading-relaxed">
                  The accepted modes of payment such as Visa / Master Card / Rupay, Cash, UPI, Cheque / DD (Demand Draft), Net Banking make every business transaction easy and seamless, contributing to making the entire process even more effective.
                </p>
                
                <h2 className="text-2xl font-bold mb-6 text-brand-black tracking-tight">Our Product Range</h2>
                <ul className="space-y-4">
                  {["CI Hand Wheels", "Disc Pack Couplings", "Nylon Gear Couplings", "Rubber Spiders", "General Transmission Products"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-brand-yellow"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

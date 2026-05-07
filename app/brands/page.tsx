import prisma from "@/lib/prisma";
import Link from "next/link";
import { Settings } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const brands = await prisma.brand.findMany({ select: { name: true } });
  const brandKeywords = brands.map(b => b.name.toLowerCase());

  return {
    title: "Our Partner Brands - Trusted Transmission Product Manufacturers",
    description: `Shop premium transmission products from ${brands.length} trusted brands: ${brands.map(b => b.name).join(', ')}. Available at Transmission Centre, Secunderabad.`,
    keywords: [
      "transmission product brands", "coupling manufacturers",
      "industrial brand partners", ...brandKeywords,
    ],
    openGraph: {
      title: "Partner Brands | Transmission Centre",
      description: `Browse ${brands.length} trusted transmission product brands at Transmission Centre.`,
      url: "/brands",
      siteName: "Transmission Centre",
      type: "website",
    },
    alternates: { canonical: "/brands" },
  };
}

export const revalidate = 3600;

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="py-24 relative overflow-hidden bg-slate-50 min-h-[80vh]">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tighter text-brand-black">Partner Brands</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We partner with industry-leading brands to bring you the best transmission products.
          </p>
        </div>
        
        {brands.length === 0 ? (
          <div className="text-center py-32 text-gray-400 bg-white shadow-glass rounded-3xl border border-gray-100 max-w-2xl mx-auto">
            <p className="text-lg font-medium">No brands found.</p>
            <p className="text-sm mt-2">Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {brands.map(brand => (
              <Link href={`/brands/${brand.slug}`} key={brand.id} className="group">
                <div className="bg-white rounded-3xl shadow-glass hover:shadow-premium border border-white overflow-hidden flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 relative h-full">
                  <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/5 transition-colors duration-500 z-0"></div>
                  <div className="w-full h-40 flex items-center justify-center bg-slate-50 relative z-10 overflow-hidden border-b border-gray-50">
                    {brand.image ? (
                      <img src={brand.image} alt={brand.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <span className="text-4xl font-extrabold text-gray-200">{brand.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="p-8 flex flex-col items-center relative z-10 w-full flex-grow">
                    <h2 className="text-xl font-bold text-brand-black group-hover:text-brand-green transition-colors tracking-tight">{brand.name}</h2>
                    <p className="text-xs font-bold text-gray-400 mt-3 tracking-widest uppercase">{brand._count.products} Products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

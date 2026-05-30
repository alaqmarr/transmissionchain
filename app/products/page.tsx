import prisma from "@/lib/prisma";
import Link from "next/link";
import { Settings } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const products = await prisma.product.findMany({ select: { name: true } });
  const productKeywords = products.map(p => p.name.toLowerCase());

  return {
    title: "All Transmission Products - CI Hand Wheels, Disc Pack Couplings & More",
    description: `Browse ${products.length}+ premium transmission products including CI hand wheels, disc pack couplings, nylon gear couplings, rubber spiders, jaw couplings, and more. Available at Transmission Centre, Secunderabad.`,
    keywords: [
      "transmission products catalog", "CI hand wheels", "disc pack coupling",
      "nylon gear coupling", "rubber spiders", "industrial couplings",
      "transmission parts Hyderabad", "coupling supplier Secunderabad",
      ...productKeywords,
    ],
    openGraph: {
      title: "Products | Transmission Centre",
      description: `Browse ${products.length}+ premium transmission products at Transmission Centre, Secunderabad.`,
      url: "/products",
      siteName: "Transmission Centre",
      type: "website",
    },
    alternates: {
      canonical: "/products",
    },
  };
}

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      brand: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com';

  // JSON-LD ItemList for product catalog
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Transmission Products Catalog",
    "description": "Complete catalog of transmission products available at Transmission Centre, Secunderabad.",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": product.name,
      "url": `${baseUrl}/products/${product.slug}`,
    })),
  };

  return (
    <div className="py-24 relative overflow-hidden bg-transparent min-h-[80vh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tighter text-brand-black">Our Products</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Browse our comprehensive catalog of high-performance transmission components.
          </p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-32 text-gray-400 bg-white shadow-glass rounded-3xl border border-gray-100 max-w-2xl mx-auto">
            <p className="text-lg font-medium">No products found.</p>
            <p className="text-sm mt-2">Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-gradient-to-br from-brand-yellow/5 to-brand-yellow/20 rounded-2xl shadow-glass hover:shadow-premium border border-brand-yellow/20 overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300">
                <Link href={`/products/${product.slug}`} className="aspect-[4/3] bg-slate-50/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/5 transition-colors duration-500 z-10"></div>
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  ) : (
                    <Settings className="w-16 h-16 text-gray-200 relative z-10" />
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-1 relative z-20">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-brand-green tracking-widest uppercase">
                      {product.category?.name || "Category"}
                    </span>
                    {product.brand && (
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-sm">
                        {product.brand.name}
                      </span>
                    )}
                  </div>
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-bold text-lg mb-3 text-brand-black hover:text-brand-green transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

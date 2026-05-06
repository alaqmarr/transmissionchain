import prisma from "@/lib/prisma";
import Link from "next/link";
import { Settings } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const categories = await prisma.category.findMany({ select: { name: true } });
  const categoryKeywords = categories.map(c => c.name.toLowerCase());

  return {
    title: "Product Categories - CI Hand Wheels, Couplings, Rubber Spiders & More",
    description: `Explore ${categories.length} product categories at Transmission Centre: ${categories.map(c => c.name).join(', ')}. Premium transmission components in Secunderabad.`,
    keywords: [
      "transmission product categories", "industrial coupling categories",
      "transmission parts types", ...categoryKeywords,
    ],
    openGraph: {
      title: "Product Categories | Transmission Centre",
      description: `Explore ${categories.length} product categories at Transmission Centre, Secunderabad.`,
      url: "/categories",
      siteName: "Transmission Centre",
      type: "website",
    },
    alternates: { canonical: "/categories" },
  };
}

export const revalidate = 3600; // revalidate every hour if not SSG, but Prisma on edge/serverless can fetch dynamically.

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="py-24 relative overflow-hidden bg-slate-50 min-h-[80vh]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tighter text-brand-black">Product Categories</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Explore our comprehensive range of high-quality transmission products tailored for industrial excellence.
          </p>
        </div>
        
        {categories.length === 0 ? (
          <div className="text-center py-32 text-gray-400 bg-white shadow-glass rounded-3xl border border-gray-100 max-w-2xl mx-auto">
            <p className="text-lg font-medium">No categories found.</p>
            <p className="text-sm mt-2">Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map(category => (
              <Link href={`/categories/${category.slug}`} key={category.id} className="group bg-white rounded-2xl shadow-glass hover:shadow-premium border border-white overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/5 transition-colors duration-500 z-10"></div>
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out z-0" />
                  ) : (
                    <Settings className="w-16 h-16 text-gray-200 relative z-0" />
                  )}
                </div>
                <div className="p-8 flex-grow flex flex-col bg-white relative z-20">
                  <h2 className="text-2xl font-bold mb-3 text-brand-black group-hover:text-brand-green transition-colors tracking-tight">{category.name}</h2>
                  {category.description && (
                    <p className="text-gray-500 text-base mb-6 leading-relaxed line-clamp-2">{category.description}</p>
                  )}
                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-sm font-bold text-brand-yellow tracking-wide uppercase">
                      {category._count.products} Products
                    </p>
                    <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-yellow transition-colors">
                      <Settings className="w-4 h-4 text-brand-black opacity-0 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-500" />
                    </span>
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

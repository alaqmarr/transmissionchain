import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Settings } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = await prisma.brand.findUnique({ 
    where: { slug },
    include: { products: { select: { name: true } } }
  });
  
  if (!brand) return { title: "Not Found" };

  const productKeywords = brand.products.map(p => p.name.toLowerCase());
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com';
  
  return {
    title: `${brand.name} Products - Transmission Centre`,
    description: brand.description || `Browse ${brand.products.length} products from ${brand.name}: ${brand.products.map(p => p.name).join(', ')}. Available at Transmission Centre, Secunderabad.`,
    keywords: [
      brand.name, brand.name.toLowerCase(),
      `${brand.name} products`, `${brand.name} dealer`,
      `${brand.name} Hyderabad`, "transmission centre",
      ...productKeywords,
    ],
    openGraph: {
      title: `${brand.name} | Transmission Centre`,
      description: brand.description || `Browse ${brand.products.length} products from ${brand.name} at Transmission Centre.`,
      url: `/brands/${brand.slug}`,
      siteName: "Transmission Centre",
      images: brand.image ? [{ 
        url: brand.image.startsWith('http') ? brand.image : new URL(brand.image, baseUrl).toString(), 
        width: 800, height: 800, alt: brand.name, type: "image/jpeg" 
      }] : [{ url: `${baseUrl}/logo.png`, width: 512, height: 512, alt: "Transmission Centre", type: "image/png" }],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} Products | Transmission Centre`,
      description: brand.description || `Browse ${brand.products.length} products from ${brand.name} at Transmission Centre.`,
      images: brand.image ? [brand.image.startsWith('http') ? brand.image : new URL(brand.image, baseUrl).toString()] : [`${baseUrl}/logo.png`],
    },
    alternates: { canonical: `/brands/${brand.slug}` },
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const brands = await prisma.brand.findMany({ select: { slug: true } });
  return brands.map((b) => ({
    slug: b.slug,
  }));
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = await prisma.brand.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          category: true
        }
      }
    }
  });

  if (!brand) notFound();

  return (
    <div className="py-24 relative overflow-hidden bg-transparent min-h-[80vh]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <div className="mb-16 bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/20 p-10 lg:p-14 rounded-3xl shadow-glass border border-brand-yellow/30 flex flex-col md:flex-row items-start md:items-center gap-10">
          <div className="flex-shrink-0">
            {brand.image ? (
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white/50 rounded-2xl flex items-center justify-center border border-white/50 shadow-sm overflow-hidden">
                <img src={brand.image} alt={brand.name} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
            ) : (
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white/50 rounded-2xl flex items-center justify-center p-6 border border-white/50 shadow-sm">
                <span className="text-6xl font-extrabold text-gray-200">{brand.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="flex-grow">
            <Link href="/brands" className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-gray-400 hover:text-brand-green mb-4 transition-colors">
              ← Back to Brands
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-brand-black">{brand.name}</h1>
            {brand.description && (
              <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">{brand.description}</p>
            )}
          </div>
        </div>

        <div className="mt-20">
          <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-bold tracking-tight text-brand-black">Products from {brand.name}</h2>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{brand.products.length} Items</span>
          </div>
          
          {brand.products.length === 0 ? (
            <div className="text-center py-32 text-gray-400 bg-white shadow-glass rounded-3xl border border-gray-100 max-w-2xl mx-auto">
              <p className="text-lg font-medium">No products found from this brand.</p>
              <p className="text-sm mt-2">Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {brand.products.map(product => (
                <div key={product.id} className="bg-gradient-to-br from-brand-yellow/5 to-brand-yellow/20 rounded-2xl shadow-glass hover:shadow-premium border border-brand-yellow/20 overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300">
                  <Link href={`/products/${product.slug}`} className="aspect-[4/3] bg-slate-50/50 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/5 transition-colors duration-500 z-10"></div>
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    ) : (
                      <Settings className="w-16 h-16 text-gray-200 relative z-10" />
                    )}
                  </Link>
                  <div className="p-6 flex flex-col flex-1 bg-transparent relative z-20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-brand-green tracking-widest uppercase">
                        {product.category.name}
                      </span>
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
    </div>
  );
}

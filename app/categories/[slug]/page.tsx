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
  const category = await prisma.category.findUnique({ 
    where: { slug },
    include: { products: { select: { name: true } } }
  });
  
  if (!category) return { title: "Not Found" };

  const productKeywords = category.products.map(p => p.name.toLowerCase());
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com';
  
  return {
    title: `${category.name} - Transmission Products`,
    description: category.description || `Browse our ${category.name} collection: ${category.products.map(p => p.name).join(', ')}. Available at Transmission Centre, Secunderabad.`,
    keywords: [
      category.name, category.name.toLowerCase(),
      `${category.name} products`, `${category.name} Hyderabad`,
      `${category.name} supplier`, "transmission centre",
      ...productKeywords,
    ],
    openGraph: {
      title: `${category.name} | Transmission Centre`,
      description: category.description || `Browse ${category.products.length} products in ${category.name} at Transmission Centre.`,
      url: `/categories/${category.slug}`,
      siteName: "Transmission Centre",
      images: category.image ? [{ 
        url: category.image.startsWith('http') ? category.image : new URL(category.image, baseUrl).toString(), 
        width: 800, height: 800, alt: category.name
      }] : [{ url: `${baseUrl}/logo.png`, width: 512, height: 512, alt: "Transmission Centre", type: "image/png" }],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | Transmission Centre`,
      description: category.description || `Browse ${category.products.length} products in ${category.name} at Transmission Centre.`,
      images: category.image ? [category.image.startsWith('http') ? category.image : new URL(category.image, baseUrl).toString()] : [`${baseUrl}/logo.png`],
    },
    alternates: { canonical: `/categories/${category.slug}` },
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({ select: { slug: true } });
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          brand: true
        }
      }
    }
  });

  if (!category) notFound();

  return (
    <div className="py-24 relative overflow-hidden bg-transparent min-h-[80vh]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <div className="mb-16">
          <Link href="/categories" className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-brand-green mb-6 transition-colors">
            ← Back to Categories
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {category.image && (
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-2xl shadow-glass flex items-center justify-center flex-shrink-0 border border-white overflow-hidden">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
            )}
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tighter text-brand-black">{category.name}</h1>
              {category.description && (
                <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">{category.description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-bold tracking-tight text-brand-black">Products in this Category</h2>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{category.products.length} Items</span>
          </div>
          
          {category.products.length === 0 ? (
            <div className="text-center py-32 text-gray-400 bg-white shadow-glass rounded-3xl border border-gray-100 max-w-2xl mx-auto">
              <p className="text-lg font-medium">No products found in this category.</p>
              <p className="text-sm mt-2">Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {category.products.map(product => (
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
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-sm">
                        {product.brand.name}
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

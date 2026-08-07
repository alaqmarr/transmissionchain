import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import ProductEnquiryButtons from "@/components/products/ProductEnquiryButtons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ 
    where: { slug },
    include: { category: true, brand: true }
  });
  
  if (!product) return { title: "Not Found" };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com';
  
  return {
    title: `${product.name} - ${product.category.name} | Transmission Centre`,
    description: `${product.name} by ${product.brand.name}. ${product.description.substring(0, 150)}... Available at Transmission Centre, Secunderabad.`,
    keywords: [
      product.name, product.name.toLowerCase(),
      product.category.name, product.category.name.toLowerCase(),
      product.brand.name, `${product.name} price`,
      `${product.name} supplier`, `${product.name} Hyderabad`,
      "transmission products", "industrial coupling", "Secunderabad",
    ],
    openGraph: {
      title: `${product.name} | Transmission Centre`,
      description: `${product.name} - Premium ${product.category.name} by ${product.brand.name}. Available at Transmission Centre, Secunderabad.`,
      url: `${baseUrl}/products/${product.slug}`,
      siteName: "Transmission Centre",
      images: product.images && product.images.length > 0 ? [
        {
          url: product.images[0].startsWith('http') ? product.images[0] : new URL(product.images[0], baseUrl).toString(),
          width: 800,
          height: 800,
          alt: product.name,
          type: "image/jpeg",
        }
      ] : [{ url: `${baseUrl}/logo.png`, width: 512, height: 512, alt: "Transmission Centre", type: "image/png" }],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Transmission Centre`,
      description: `${product.name} - ${product.category.name} by ${product.brand.name}`,
      images: product.images && product.images.length > 0 ? [product.images[0].startsWith('http') ? product.images[0] : new URL(product.images[0], baseUrl).toString()] : [`${baseUrl}/logo.png`],
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      brand: true
    }
  });

  if (!product) notFound();

  // Fetch whatsapp number from settings
  const whatsappSetting = await prisma.setting.findUnique({
    where: { key: "whatsappNumber" }
  });
  const whatsappNumber = whatsappSetting?.value || "+910000000000";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com';

  // JSON-LD Product Schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images && product.images.length > 0 ? product.images : [`${baseUrl}/logo.png`],
    "brand": {
      "@type": "Brand",
      "name": product.brand.name,
    },
    "category": product.category.name,
    "manufacturer": {
      "@type": "Organization",
      "name": product.brand.name,
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Transmission Centre",
      }
    }
  };

  // JSON-LD BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": `${baseUrl}/products` },
      { "@type": "ListItem", "position": 3, "name": product.category.name, "item": `${baseUrl}/categories/${product.category.slug}` },
      { "@type": "ListItem", "position": 4, "name": product.name, "item": `${baseUrl}/products/${product.slug}` },
    ]
  };

  return (
    <div className="py-24 relative bg-transparent min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-yellow/10 to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-brand-black/60 mb-8 items-center font-medium tracking-wide">
          <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/products" className="hover:text-brand-yellow transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href={`/categories/${product.category.slug}`} className="hover:text-brand-yellow transition-colors">{product.category.name}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-brand-black font-bold truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/20 rounded-3xl shadow-glass border border-brand-yellow/30 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Images Section */}
            <div className="bg-brand-yellow/5 relative min-h-[400px] lg:min-h-[600px] group overflow-hidden border-r border-brand-yellow/20">
              <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/5 transition-colors duration-500 z-10"></div>
              {product.images && product.images.length > 0 ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 relative" />
              ) : (
                <div className="text-gray-400 font-medium">No image available</div>
              )}
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-4">
                <Link href={`/categories/${product.category.slug}`} className="text-xs font-bold text-brand-green tracking-widest uppercase hover:underline">
                  {product.category.name}
                </Link>
                {product.brand && (
                  <>
                    <span className="text-gray-300">|</span>
                    <Link href={`/brands/${product.brand.slug}`} className="text-xs font-bold text-gray-500 tracking-widest uppercase hover:text-brand-black transition-colors bg-gray-100 px-3 py-1 rounded-sm">
                      {product.brand.name}
                    </Link>
                  </>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-black mb-8 tracking-tight leading-tight">{product.name}</h1>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-12 flex-grow">
                <h3 className="text-xl font-bold text-brand-black mb-4 tracking-tight">Overview</h3>
                <p className="whitespace-pre-wrap leading-relaxed">{product.description}</p>
              </div>

              {/* Client Component for interactive buttons & modal */}
              <div className="pt-8 border-t border-gray-100">
                <ProductEnquiryButtons 
                  productId={product.id} 
                  productName={product.name} 
                  whatsappNumber={whatsappNumber} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

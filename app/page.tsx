import Link from "next/link";
import { Settings, ArrowRight, CheckCircle2 } from "lucide-react";
import prisma from "@/lib/prisma";
import HeroCarousel from "@/components/home/HeroCarousel";
import BrandSlider from "@/components/home/BrandSlider";
import ProductEnquiryButtons from "@/components/products/ProductEnquiryButtons";
import type { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const products = await prisma.product.findMany({ select: { name: true } });
  const productKeywords = products.map(p => p.name.toLowerCase());

  return {
    title: "Transmission Centre | Premium CI Hand Wheels, Disc Pack Couplings & Transmission Products in Secunderabad",
    description: "Transmission Centre is a leading supplier of CI hand wheels, disc pack couplings, nylon gear couplings, rubber spiders, jaw couplings, tyre couplings, and premium transmission products in Secunderabad, Hyderabad. Established 2016.",
    keywords: [
      "transmission centre", "CI hand wheels", "disc pack coupling", "nylon gear coupling",
      "rubber spiders", "jaw couplings", "tyre couplings", "transmission products Secunderabad",
      "industrial couplings Hyderabad", "power transmission", "coupling supplier",
      ...productKeywords,
    ],
    alternates: {
      canonical: "/",
    },
  };
}

export default async function Home() {
  const [categories, brands, products, settings] = await Promise.all([
    prisma.category.findMany({ take: 8, orderBy: { name: 'asc' } }),
    prisma.brand.findMany({ orderBy: { name: 'asc' } }),
    prisma.product.findMany({ 
      take: 8, 
      orderBy: { createdAt: 'desc' },
      include: { category: true, brand: true }
    }),
    prisma.setting.findUnique({ where: { key: "phoneNumber" } })
  ]);

  const whatsappNumber = settings?.value || "";

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com'}/#organization`,
        "name": "Transmission Centre",
        "url": process.env.NEXT_PUBLIC_BASE_URL || "https://transmissioncentre.com",
        "logo": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com'}/logo.png`,
        "description": "Leading supplier of CI hand wheels, disc pack couplings, nylon gear couplings, rubber spiders and industrial transmission products in Secunderabad, Hyderabad.",
        "foundingDate": "2016",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "House No 5-1-446, 1st Floor, Near Lorry Adda, Ranigunj",
          "addressLocality": "Secunderabad",
          "addressRegion": "Telangana",
          "postalCode": "500003",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": ["English", "Hindi", "Telugu"]
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "Transmission Centre",
        "image": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com'}/logo.png`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "House No 5-1-446, 1st Floor, Near Lorry Adda, Ranigunj",
          "addressLocality": "Secunderabad",
          "addressRegion": "Telangana",
          "postalCode": "500003",
          "addressCountry": "IN"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "19:00"
        },
        "priceRange": "$$"
      },
      {
        "@type": "WebSite",
        "name": "Transmission Centre",
        "url": process.env.NEXT_PUBLIC_BASE_URL || "https://transmissioncentre.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com'}/products?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <div className="flex flex-col items-center">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <HeroCarousel />

      {/* Trust Badges */}
      <section className="w-full py-8 border-b border-gray-100 bg-white relative z-10 -mt-2">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
          <div className="flex items-center gap-3 font-semibold tracking-wide">
            <CheckCircle2 className="text-brand-green w-5 h-5" /> Jd Verified
          </div>
          <div className="flex items-center gap-3 font-semibold tracking-wide">
            <CheckCircle2 className="text-brand-green w-5 h-5" /> Jd Pay Accepted
          </div>
          <div className="flex items-center gap-3 font-semibold tracking-wide">
            <CheckCircle2 className="text-brand-green w-5 h-5" /> Established 2016
          </div>
        </div>
      </section>

      {/* Brands Slider */}
      {brands.length > 0 && <BrandSlider brands={brands} />}

      {/* Categories Showcase */}
      <section className="w-full py-28 bg-brand-white relative overflow-hidden">
        {/* Subtle background blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tighter text-brand-black">Our Categories</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">Explore our comprehensive range of high-quality transmission products tailored for industrial excellence.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.slug}`} className="group bg-white rounded-2xl shadow-glass hover:shadow-premium border border-white/60 overflow-hidden hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[4/3] bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 group-hover:opacity-0 transition-opacity"></div>
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out relative z-10" />
                  ) : (
                    <Settings className="w-12 h-12 text-gray-300 group-hover:rotate-180 transition-transform duration-700 relative z-10" />
                  )}
                </div>
                <div className="p-5 text-center bg-white relative z-20">
                  <h3 className="font-bold text-gray-800 group-hover:text-brand-green transition-colors tracking-wide">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/categories" className="inline-flex items-center gap-2 font-bold text-brand-black hover:text-brand-green bg-white shadow-glass hover:shadow-premium px-6 py-3 rounded-full transition-all duration-300 group">
              View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="w-full py-28 bg-slate-50 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tighter text-brand-black">Featured Products</h2>
              <p className="text-lg text-gray-500 leading-relaxed">Discover our top-selling transmission components built for unmatched durability and performance.</p>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center gap-2 font-bold text-brand-black hover:text-brand-green transition-colors group">
              Browse All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-glass hover:shadow-premium border border-white overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300">
                <Link href={`/products/${product.slug}`} className="aspect-square bg-slate-50/50 p-8 flex items-center justify-center group relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/5 transition-colors duration-500"></div>
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out relative z-10 mix-blend-multiply" />
                  ) : (
                    <Settings className="w-16 h-16 text-gray-200 relative z-10" />
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-1 bg-white relative z-20">
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
                    <h3 className="font-bold text-xl mb-3 text-brand-black hover:text-brand-green transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="mt-auto pt-6">
                    <ProductEnquiryButtons 
                      productId={product.id}
                      productName={product.name}
                      whatsappNumber={whatsappNumber}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 md:hidden">
            <Link href="/products" className="inline-block bg-brand-black text-white font-bold px-8 py-3.5 rounded-full shadow-glass hover:shadow-premium hover:bg-gray-800 transition-all duration-300">
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

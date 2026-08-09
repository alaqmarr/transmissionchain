"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  images?: string[];
  category?: { name: string; slug: string };
  brand?: { name: string; slug: string };
}

export default function HeroCarousel({ products = [] }: { products?: Product[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // If no products, fallback to a static state
  const hasProducts = products && products.length > 0;
  
  const slides = hasProducts ? products : [
    {
      id: "fallback-1",
      name: "Premium Transmission Products",
      slug: "",
      description: "Discover our top-selling transmission components built for unmatched durability and performance.",
      images: ["/logo.png"],
      category: { name: "Industrial", slug: "categories" },
      brand: { name: "TCC", slug: "brands" }
    }
  ];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 400); // slightly longer for smoother transition
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentProduct = slides[currentSlide];
  const imageUrl = currentProduct?.images?.[0] || "/logo.png";

  return (
    <div 
      className="relative w-full min-h-[700px] md:h-[85vh] overflow-hidden bg-cover bg-center pt-20"
      style={{ backgroundImage: 'url(/1.jpeg)' }}
    >
      {/* Subtle gradient overlay: darker on the left for text readability, mostly transparent on the right to show the background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061b11]/95 via-[#061b11]/70 to-[#ca8a04]/20 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-black/30 md:bg-black/10 pointer-events-none z-0"></div>
      {/* Decorative gears */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg
          className="absolute -bottom-20 -left-20 animate-spin-slow opacity-[0.05]"
          width="400"
          height="400"
          viewBox="0 0 100 100"
          fill="none"
        >
          <g transform="translate(50,50)">
            {Array.from({ length: 14 }).map((_, i) => (
              <rect key={i} x="-4" y="-48" width="8" height="11" rx="2" fill="white" transform={`rotate(${i * (360 / 14)})`} />
            ))}
            <circle r="37" fill="white" />
            <circle r="30" fill="transparent" stroke="white" strokeWidth="1" />
            <circle r="10" fill="white" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 h-full flex flex-col md:flex-row items-center relative z-10 py-12 md:py-0">
        
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center h-full order-2 md:order-1 mt-12 md:mt-0">
          <div className={`max-w-2xl transition-opacity duration-700 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {currentProduct.category && (
                <Link href={`/categories/${currentProduct.category.slug}`} className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/20 px-4 py-1.5 rounded-full hover:bg-brand-yellow/20 transition-colors">
                  {currentProduct.category.name}
                </Link>
              )}
              {currentProduct.brand && (
                <Link href={`/brands/${currentProduct.brand.slug}`} className="inline-block text-xs font-bold tracking-[0.1em] uppercase text-white bg-white/10 border border-white/20 px-4 py-1.5 rounded-full hover:bg-white/20 transition-colors">
                  {currentProduct.brand.name}
                </Link>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.15] tracking-tight text-white drop-shadow-lg">
              {currentProduct.name}
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl font-medium leading-relaxed tracking-wide line-clamp-3">
              {currentProduct.description}
            </p>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {hasProducts && (
                <Link 
                  href={`/products/${currentProduct.slug}`} 
                  className="group bg-brand-gradient text-brand-black font-extrabold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.4)]"
                >
                  View Product <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              {hasProducts && currentProduct.category && (
                <Link 
                  href={`/categories/${currentProduct.category.slug}`} 
                  className="bg-white/10 backdrop-blur-md text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/10 flex items-center justify-center shadow-lg"
                >
                  View Category
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Image Showcase */}
        <div className="w-full md:w-1/2 flex items-center justify-center h-full order-1 md:order-2">
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            {/* Glowing backdrop for image */}
            <div className="absolute inset-0 bg-brand-yellow/20 rounded-full blur-[100px] -z-10"></div>
            
            <div className={`relative w-full h-full p-8 transition-opacity duration-700 ease-in-out flex items-center justify-center ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}>
              {imageUrl !== "/logo.png" ? (
                <img 
                  src={imageUrl} 
                  alt={currentProduct.name}
                  className="max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center flex-col gap-4 text-white/50 backdrop-blur-sm">
                  <Box className="w-24 h-24" />
                  <span className="font-medium tracking-wider uppercase">Premium Quality</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
      
      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentSlide(idx);
                  setIsTransitioning(false);
                }, 400);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? "bg-brand-yellow w-12 shadow-[0_0_10px_rgba(250,204,21,0.8)]" : "bg-white/30 hover:bg-white/60 w-6"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

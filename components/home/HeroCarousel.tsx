"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STATIC_HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000",
    title: "Powering Industry with Quality Transmission",
    subtitle: "Your trusted partner for CI hand wheels, disc pack couplings, and rubber spiders in Secunderabad."
  },
  {
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2000",
    title: "Engineered for Excellence",
    subtitle: "Discover our premium range of nylon gear couplings designed for high performance."
  },
  {
    image: "https://images.unsplash.com/photo-1565439390234-fcac5471d87f?auto=format&fit=crop&q=80&w=2000",
    title: "Reliability You Can Count On",
    subtitle: "Serving industrial needs since 2016 with unmatched quality and service."
  }
];

function HeroGearDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {/* Large gear bottom-right */}
      <svg
        className="absolute -bottom-20 -right-20 animate-spin-slow opacity-[0.06]"
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
          <circle r="5" fill="transparent" />
        </g>
      </svg>

      {/* Medium gear top-right */}
      <svg
        className="absolute -top-10 right-32 animate-spin-slow-reverse opacity-[0.04]"
        width="220"
        height="220"
        viewBox="0 0 100 100"
        fill="none"
      >
        <g transform="translate(50,50)">
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x="-5" y="-48" width="10" height="13" rx="2" fill="white" transform={`rotate(${i * 36})`} />
          ))}
          <circle r="35" fill="white" />
          <circle r="26" fill="transparent" />
          <circle r="8" fill="white" />
        </g>
      </svg>

      {/* Chain link decoration bottom */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center overflow-hidden opacity-[0.05]">
        <div className="animate-chain-move flex">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-6 h-3 border border-white rounded-sm mx-0.5" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroCarousel({ heroImages = [] }: { heroImages?: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Merge static slides with dynamic images
  const slides = heroImages.length > 0 
    ? heroImages.map((img, i) => ({
        image: img,
        title: STATIC_HERO_SLIDES[i]?.title || "Powering Industry with Quality Transmission",
        subtitle: STATIC_HERO_SLIDES[i]?.subtitle || "Premium transmission components built for unmatched durability and performance."
      }))
    : STATIC_HERO_SLIDES;

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[700px] md:h-[850px] overflow-hidden bg-brand-black">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image with slight scale animation when active */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear ${
              index === currentSlide ? "scale-105" : "scale-100"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Advanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/30" />
        </div>
      ))}

      {/* Gear Decorations */}
      <HeroGearDecoration />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-center">
        <div className={`max-w-4xl transition-all duration-500 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tighter text-white">
            {slides[currentSlide]?.title?.split("Quality Transmission").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i !== arr.length - 1 && <span className="bg-gradient-to-r from-brand-yellow to-yellow-200 bg-clip-text text-transparent">Quality Transmission</span>}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl font-medium leading-relaxed tracking-wide">
            {slides[currentSlide]?.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="/products" className="group bg-brand-gradient text-brand-black font-extrabold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.4)]">
              Explore Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="bg-white/5 backdrop-blur-md text-white font-bold px-8 py-4 rounded-full hover:bg-white/15 transition-all duration-300 border border-white/10 flex items-center justify-center">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? "bg-brand-yellow w-12 shadow-[0_0_10px_rgba(250,204,21,0.8)]" : "bg-white/30 hover:bg-white/60 w-6"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

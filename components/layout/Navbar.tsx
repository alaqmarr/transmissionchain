"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Brands", href: "/brands" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header className="w-full bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between transition-all duration-300 relative z-50">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
          <Image src="/logo.png" alt="Transmission Centre" width={36} height={36} className="group-hover:scale-110 transition-transform duration-300" />
          <span className="font-extrabold text-xl tracking-tighter bg-gradient-to-r from-brand-black to-gray-600 bg-clip-text text-transparent">Transmission</span>
        </Link>
        
        <nav className="hidden md:flex gap-8 font-semibold text-sm tracking-wide">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-gray-600 hover:text-brand-black transition-colors relative group py-2">
              {link.name}
              <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-brand-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:block">
          <Link href="/contact" className="bg-brand-gradient text-brand-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 hover:shadow-accent transition-all duration-300">
            Get Quote
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-600 hover:text-brand-black transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu}
      ></div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed top-24 left-4 right-4 bg-white rounded-3xl shadow-premium border border-gray-100 overflow-hidden z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden origin-top ${
          isMobileMenuOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-lg font-bold text-brand-black p-4 hover:bg-slate-50 rounded-2xl transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-gray-100 my-2"></div>
          <Link 
            href="/contact" 
            className="text-center bg-brand-gradient text-brand-black px-6 py-4 mt-2 rounded-2xl font-bold text-lg hover:shadow-accent transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </div>
  );
}

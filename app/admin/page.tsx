import prisma from "@/lib/prisma";
import { Package, Tags, Bookmark, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [productCount, categoryCount, brandCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.brand.count(),
  ]);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-brand-black mb-2">Dashboard Overview</h1>
        <p className="text-gray-500 font-medium">Welcome back to your control center.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-3xl shadow-glass hover:shadow-premium border border-white p-8 flex items-center justify-between transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors"></div>
          <div className="relative z-10">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Total Products</p>
            <p className="text-5xl font-extrabold text-brand-black">{productCount}</p>
          </div>
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 relative z-10 group-hover:scale-110 transition-transform">
            <Package className="w-8 h-8" />
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-glass hover:shadow-premium border border-white p-8 flex items-center justify-between transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-green/20 transition-colors"></div>
          <div className="relative z-10">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Categories</p>
            <p className="text-5xl font-extrabold text-brand-black">{categoryCount}</p>
          </div>
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-brand-green relative z-10 group-hover:scale-110 transition-transform">
            <Tags className="w-8 h-8" />
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-glass hover:shadow-premium border border-white p-8 flex items-center justify-between transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-yellow/20 transition-colors"></div>
          <div className="relative z-10">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Brands</p>
            <p className="text-5xl font-extrabold text-brand-black">{brandCount}</p>
          </div>
          <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-brand-yellow relative z-10 group-hover:scale-110 transition-transform">
            <Bookmark className="w-8 h-8" />
          </div>
        </div>
      </div>
      
      <div className="bg-brand-black rounded-3xl shadow-glass p-10 md:p-14 text-center max-w-3xl mx-auto mt-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gradient opacity-20 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] border border-white/10">
            <Settings className="w-12 h-12 text-brand-yellow animate-spin-slow" />
          </div>
          <h2 className="text-3xl font-extrabold mb-4 text-white tracking-tight">Transmission Centre Hub</h2>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-xl mx-auto">Manage your catalog, analyze enquiries, and update website settings from this centralized portal.</p>
          <Link href="/admin/products" className="inline-flex items-center justify-center gap-3 bg-brand-gradient text-brand-black px-8 py-4 rounded-xl font-extrabold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
            Manage Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

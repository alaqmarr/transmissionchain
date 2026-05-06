import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Settings, LayoutDashboard, Package, Tags, Bookmark, LogOut, Mail, Image as ImageIcon } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 relative">
        <div className="p-6 border-b border-gray-100/50">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-accent p-1.5">
              <Image src="/logo.png" alt="Transmission Centre" width={28} height={28} />
            </div>
            <span className="font-extrabold tracking-tight text-brand-black text-xl">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-slate-50 text-gray-600 hover:text-brand-black font-semibold transition-all group">
            <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-brand-green transition-colors" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-slate-50 text-gray-600 hover:text-brand-black font-semibold transition-all group">
            <Package className="w-5 h-5 text-gray-400 group-hover:text-brand-green transition-colors" /> Products
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-slate-50 text-gray-600 hover:text-brand-black font-semibold transition-all group">
            <Tags className="w-5 h-5 text-gray-400 group-hover:text-brand-green transition-colors" /> Categories
          </Link>
          <Link href="/admin/brands" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-slate-50 text-gray-600 hover:text-brand-black font-semibold transition-all group">
            <Bookmark className="w-5 h-5 text-gray-400 group-hover:text-brand-green transition-colors" /> Brands
          </Link>
          <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-slate-50 text-gray-600 hover:text-brand-black font-semibold transition-all group">
            <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-brand-green transition-colors" /> Gallery
          </Link>
          <Link href="/admin/enquiries" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-slate-50 text-gray-600 hover:text-brand-black font-semibold transition-all group">
            <Mail className="w-5 h-5 text-gray-400 group-hover:text-brand-green transition-colors" /> Enquiries
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-slate-50 text-gray-600 hover:text-brand-black font-semibold transition-all group">
            <Settings className="w-5 h-5 text-gray-400 group-hover:text-brand-green transition-colors" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100/50">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-red-50 text-gray-600 hover:text-red-600 font-semibold transition-all group">
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

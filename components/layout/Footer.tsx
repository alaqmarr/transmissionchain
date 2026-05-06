import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";

export default async function Footer() {
  const addressSetting = await prisma.setting.findUnique({
    where: { key: "address" }
  });
  
  const addressLines = addressSetting?.value 
    ? addressSetting.value.split('\n') 
    : ["House No 5-1-446, 1st Floor", "Near Lorry Adda, Ranigunj", "Secunderabad City-500003, Hyderabad"];

  return (
    <footer className="bg-brand-black text-brand-white pt-24 pb-12 border-t-4 border-t-brand-green relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gradient opacity-10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
            <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5 flex items-center justify-center">
              <Image src="/logo.png" alt="Transmission Centre" width={28} height={28} />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter text-transparent bg-clip-text bg-brand-gradient">Transmission Centre</span>
          </Link>
          <p className="text-base text-gray-400 leading-relaxed max-w-sm mb-8">
            Established in 2016. Your premium partner for CI hand wheels, disc pack couplings, nylon gear couplings, rubber spiders, and elite transmission products.
          </p>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-6 text-brand-white tracking-wide">Quick Links</h3>
          <ul className="space-y-4 text-base text-gray-400 font-medium">
            <li><Link href="/products" className="hover:text-brand-green transition-colors inline-block hover:translate-x-1 transform duration-300">Products</Link></li>
            <li><Link href="/categories" className="hover:text-brand-green transition-colors inline-block hover:translate-x-1 transform duration-300">Categories</Link></li>
            <li><Link href="/brands" className="hover:text-brand-green transition-colors inline-block hover:translate-x-1 transform duration-300">Brands</Link></li>
            <li><Link href="/gallery" className="hover:text-brand-green transition-colors inline-block hover:translate-x-1 transform duration-300">Gallery</Link></li>
            <li><Link href="/about" className="hover:text-brand-green transition-colors inline-block hover:translate-x-1 transform duration-300">About Us</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-6 text-brand-white tracking-wide">Contact Us</h3>
          <address className="not-italic text-base text-gray-400 space-y-3 leading-relaxed">
            {addressLines.map((line, idx) => (
              <p key={idx} className="flex items-start gap-2">
                {idx === 0 && <span className="text-brand-green mt-1">•</span>}
                {line}
              </p>
            ))}
            <div className="pt-4">
              <Link href="/contact" className="inline-flex items-center gap-2 text-brand-black bg-brand-gradient px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                Get Directions
              </Link>
            </div>
          </address>
        </div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Transmission Centre. All rights reserved.</p>
        <div className="flex gap-6 font-medium">
          <Link href="/privacy" className="hover:text-brand-green transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-brand-green transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

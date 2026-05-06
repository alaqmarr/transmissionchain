import prisma from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery - Transmission Products & Industrial Components Showcase",
  description: "View our gallery of CI hand wheels, disc pack couplings, nylon gear couplings, rubber spiders, and other premium transmission products at Transmission Centre, Secunderabad.",
  keywords: [
    "transmission products gallery", "CI hand wheels images",
    "disc pack coupling photos", "industrial coupling gallery",
    "transmission centre showcase", "Secunderabad products",
  ],
  openGraph: {
    title: "Product Gallery | Transmission Centre",
    description: "Browse images of our premium transmission products and industrial components.",
    url: "/gallery",
    siteName: "Transmission Centre",
    type: "website",
  },
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const images = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="py-24 relative overflow-hidden bg-slate-50 min-h-[80vh]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tighter text-brand-black">Our Gallery</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Take a look at our collection of high-quality transmission products and operations.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-32 text-gray-400 bg-white shadow-glass rounded-3xl border border-gray-100 max-w-2xl mx-auto">
            <p className="text-lg font-medium">Gallery is currently empty.</p>
            <p className="text-sm mt-2">Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {images.map((img) => (
              <div key={img.id} className="group relative rounded-2xl overflow-hidden shadow-glass hover:shadow-premium border border-white bg-white aspect-square flex flex-col hover:-translate-y-1 transition-all duration-300">
                <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/5 transition-colors duration-500"></div>
                  <img 
                    src={img.imageUrl} 
                    alt={img.caption || "Gallery item"} 
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out relative z-10 mix-blend-multiply"
                  />
                </div>
                {img.caption && (
                  <div className="p-4 bg-white relative z-20">
                    <p className="text-sm font-semibold text-center text-gray-800 tracking-wide truncate">
                      {img.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

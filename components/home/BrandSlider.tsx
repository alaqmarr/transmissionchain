import Link from "next/link";

export default function BrandSlider({ brands }: { brands: any[] }) {
  if (!brands || brands.length === 0) return null;

  // Duplicate brands array to create seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="w-full py-12 border-b border-gray-100 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Trusted By Industry Leaders</h2>
      </div>
      
      <div className="relative w-full flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-8 items-center px-4">
          {duplicatedBrands.map((brand, i) => (
            <Link 
              key={`${brand.id}-${i}`} 
              href={`/brands/${brand.slug}`}
              className="flex-none w-40 h-20 relative transition-transform hover:scale-110"
            >
              {brand.image ? (
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-xl text-gray-400 bg-gray-50 rounded">
                  {brand.name}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

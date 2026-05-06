import prisma from "@/lib/prisma";
import BrandManager from "./BrandManager";

export default async function AdminBrands() {
  const brands = await prisma.brand.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { products: true } }
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-black">Manage Brands</h1>
      </div>
      
      <BrandManager initialBrands={brands} />
    </div>
  );
}

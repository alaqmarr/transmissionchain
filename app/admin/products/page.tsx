import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProductList from "./ProductList";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      brand: true,
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-black">Manage Products</h1>
        <Link 
          href="/admin/products/new" 
          className="bg-brand-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Product
        </Link>
      </div>
      
      <ProductList initialProducts={products} />
    </div>
  );
}

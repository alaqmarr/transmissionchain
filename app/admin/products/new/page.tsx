import prisma from "@/lib/prisma";
import ProductForm from "./ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([
    prisma.category.findMany(),
    prisma.brand.findMany(),
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-gray-500 hover:text-brand-black flex items-center gap-1 inline-flex mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-brand-black">Add New Product</h1>
      </div>
      
      <ProductForm categories={categories} brands={brands} />
    </div>
  );
}

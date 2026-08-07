import prisma from "@/lib/prisma";
import ProductForm from "../new/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories, brands] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany(),
    prisma.brand.findMany(),
  ]);

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-gray-500 hover:text-brand-black flex items-center gap-1 inline-flex mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-brand-black">Edit Product</h1>
      </div>
      
      <ProductForm 
        categories={categories} 
        brands={brands} 
        initialData={{
          id: product.id,
          name: product.name,
          description: product.description || "",
          categoryId: product.categoryId,
          brandId: product.brandId,
          images: product.images
        }} 
      />
    </div>
  );
}

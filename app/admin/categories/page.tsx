import prisma from "@/lib/prisma";
import CategoryManager from "./CategoryManager";

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { products: true } }
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-black">Manage Categories</h1>
      </div>
      
      <CategoryManager initialCategories={categories} />
    </div>
  );
}

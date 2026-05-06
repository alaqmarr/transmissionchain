"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/actions/product";
import { Trash2, Image as ImageIcon, Edit } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/admin/ConfirmModal";
import Link from "next/link";

export default function ProductList({ initialProducts }: { initialProducts: any[] }) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    const res = await deleteProduct(deleteId);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Product deleted!");
    }
    setDeleteId(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr>
            <th className="px-6 py-4 font-medium">Image</th>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Category</th>
            <th className="px-6 py-4 font-medium">Brand</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {initialProducts.length === 0 ? (
            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No products found.</td></tr>
          ) : (
            initialProducts.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {product.images && product.images.length > 0 ? (
                    <div className="w-12 h-12 bg-white border rounded flex items-center justify-center p-1"><img src={product.images[0]} className="max-w-full max-h-full" /></div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 border rounded flex items-center justify-center text-gray-400"><ImageIcon className="w-5 h-5"/></div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.category?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.brand?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <Link href={`/admin/products/${product.id}`} className="text-brand-green hover:text-green-700 p-2"><Edit className="w-5 h-5" /></Link>
                  <button onClick={() => setDeleteId(product.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <ConfirmModal 
        isOpen={!!deleteId}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

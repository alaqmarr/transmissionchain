"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/app/actions/product";
import { Loader2, ImagePlus, X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ProductData {
  id?: string;
  name?: string;
  description?: string;
  categoryId?: string;
  brandId?: string;
  images?: string[];
}

export default function ProductForm({ categories, brands, initialData }: { categories: any[], brands: any[], initialData?: ProductData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const router = useRouter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (res.ok) {
        setImages([...images, data.url]);
        toast.success("Image uploaded!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    // Append all images
    images.forEach(url => formData.append("images", url));

    const res = initialData?.id 
      ? await updateProduct(initialData.id, formData)
      : await createProduct(formData);
    
    if (res?.error) {
      toast.error(res.error);
      setIsSubmitting(false);
    } else {
      toast.success(initialData?.id ? "Product updated!" : "Product created!");
      router.push("/admin/products");
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input type="text" name="name" defaultValue={initialData?.name} required className="w-full border rounded-md px-3 py-2 outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow" placeholder="e.g. CI Hand Wheel 5 inch" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select name="categoryId" defaultValue={initialData?.categoryId} required className="w-full border rounded-md px-3 py-2 outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow">
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <select name="brandId" defaultValue={initialData?.brandId} required className="w-full border rounded-md px-3 py-2 outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow">
              <option value="">Select Brand</option>
              {brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" defaultValue={initialData?.description} rows={5} required className="w-full border rounded-md px-3 py-2 outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow" placeholder="Detailed product description..."></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Product Images</label>
            <div className="flex flex-wrap gap-4 mb-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-24 h-24 bg-gray-50 border rounded-lg flex items-center justify-center p-1">
                  <img src={img} className="max-w-full max-h-full object-contain" alt="Product" />
                  <button type="button" onClick={() => removeImage(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              <div className="relative w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImagePlus className="w-6 h-6" />}
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
              </div>
            </div>
            <p className="text-xs text-gray-500">First image will be used as the primary thumbnail. Uploading multiple is supported via Cloudflare R2.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button type="submit" disabled={isSubmitting} className="bg-brand-black text-white px-8 py-3 rounded-md font-bold hover:bg-gray-800 transition-colors flex items-center gap-2">
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

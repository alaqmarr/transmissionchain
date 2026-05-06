"use client";

import { useState } from "react";
import { createCategory, updateCategory, deleteCategory } from "@/app/actions/category";
import { Trash2, Loader2, ImagePlus, Edit, X } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function CategoryManager({ initialCategories }: { initialCategories: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setImageUrl("");
  };

  const handleEdit = (cat: any) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description || "");
    setImageUrl(cat.image || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        setImageUrl(data.url);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageUrl) formData.append("image", imageUrl);

    const res = editingId 
      ? await updateCategory(editingId, formData)
      : await createCategory(formData);
    
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success(editingId ? "Category updated!" : "Category created!");
      resetForm();
    }
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    const res = await deleteCategory(deleteId);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Category deleted!");
    }
    setDeleteId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{editingId ? "Edit Category" : "Add New Category"}</h2>
            {editingId && (
              <button onClick={resetForm} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <X className="w-4 h-4" /> Cancel
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border rounded-md px-3 py-2 outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full border rounded-md px-3 py-2 outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              {imageUrl ? (
                <div className="relative w-full h-32 bg-gray-50 rounded border flex items-center justify-center overflow-hidden mb-2">
                  <img src={imageUrl} alt="Uploaded" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setImageUrl("")} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"><Trash2 className="w-4 h-4"/></button>
                </div>
              ) : (
                <div className="relative w-full h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
                  {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ImagePlus className="w-6 h-6 mb-2" />}
                  <span className="text-xs">{isUploading ? "Uploading..." : "Click to upload"}</span>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                </div>
              )}
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-colors flex justify-center items-center gap-2">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingId ? "Update Category" : "Create Category")}
            </button>
          </form>
        </div>
      </div>

      {/* List */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Image</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Products</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initialCategories.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No categories found.</td></tr>
              ) : (
                initialCategories.map(cat => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {cat.image ? (
                        <div className="w-12 h-12 bg-white border rounded flex items-center justify-center overflow-hidden"><img src={cat.image} className="w-full h-full object-cover" /></div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 border rounded flex items-center justify-center text-xs text-gray-400">N/A</div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">{cat.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{cat._count.products}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2 items-center h-full">
                      <button onClick={() => handleEdit(cat)} className="text-brand-green hover:text-green-700 p-2"><Edit className="w-5 h-5" /></button>
                      <button onClick={() => setDeleteId(cat.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal 
        isOpen={!!deleteId}
        title="Delete Category"
        message="Are you sure you want to delete this category? Products assigned to it may be affected."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { createGalleryImage, deleteGalleryImage } from "@/app/actions/gallery";
import { Trash2, Loader2, ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function GalleryManager({ initialImages }: { initialImages: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
    if (!imageUrl) {
      toast.error("Please upload an image first.");
      return;
    }

    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("imageUrl", imageUrl);

    const res = await createGalleryImage(formData);
    
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Image added to gallery!");
      (e.target as HTMLFormElement).reset();
      setImageUrl("");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    const res = await deleteGalleryImage(deleteId);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Image deleted!");
    }
    setDeleteId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-6">
          <h2 className="text-xl font-bold mb-4">Add to Gallery</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              {imageUrl ? (
                <div className="relative w-full h-48 bg-gray-50 rounded border flex items-center justify-center overflow-hidden mb-2 p-2">
                  <img src={imageUrl} alt="Uploaded" className="max-h-full max-w-full object-contain" />
                  <button type="button" onClick={() => setImageUrl("")} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"><Trash2 className="w-4 h-4"/></button>
                </div>
              ) : (
                <div className="relative w-full h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
                  {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ImagePlus className="w-8 h-8 mb-2" />}
                  <span className="text-sm">{isUploading ? "Uploading..." : "Click to upload"}</span>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Caption (Optional)</label>
              <input type="text" name="caption" className="w-full border rounded-md px-3 py-2 outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow" placeholder="E.g., Event 2023" />
            </div>
            <button type="submit" disabled={isSubmitting || !imageUrl} className="w-full bg-brand-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 disabled:opacity-50">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Image"}
            </button>
          </form>
        </div>
      </div>

      {/* Grid */}
      <div className="lg:col-span-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {initialImages.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
              No images in gallery.
            </div>
          ) : (
            initialImages.map((img) => (
              <div key={img.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group relative">
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-2">
                  <img src={img.imageUrl} alt={img.caption || "Gallery image"} className="max-w-full max-h-full object-contain" />
                </div>
                {img.caption && (
                  <div className="p-3 text-sm text-center border-t border-gray-50 text-gray-700 truncate">
                    {img.caption}
                  </div>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setDeleteId(img.id)} className="bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ConfirmModal 
        isOpen={!!deleteId}
        title="Delete Image"
        message="Are you sure you want to delete this image from the gallery?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

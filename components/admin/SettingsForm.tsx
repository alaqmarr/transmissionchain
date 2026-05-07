"use client";

import { useState } from "react";
import { Loader2, Save, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  initialSettings: Record<string, string>;
}

export default function SettingsForm({ initialSettings }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Parse existing hero images from JSON string, or default to empty array
  const [heroImages, setHeroImages] = useState<string[]>(() => {
    try {
      return initialSettings.heroImages ? JSON.parse(initialSettings.heroImages) : [];
    } catch {
      return [];
    }
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    const files = Array.from(e.target.files);
    
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) throw new Error("Failed to upload image");
      const data = await res.json();
      return data.url;
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      setHeroImages((prev) => [...prev, ...uploadedUrls]);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      toast.error("Some images failed to upload.");
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setHeroImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const settings = Object.fromEntries(formData.entries());
    
    // Add heroImages to payload
    settings.heroImages = JSON.stringify(heroImages);
    
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        body: JSON.stringify(settings),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (res.ok) {
        toast.success("Settings saved successfully!");
      } else {
        toast.error("Failed to save settings.");
      }
    } catch (error) {
      toast.error("An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold mb-4 border-b pb-2">Homepage Hero Images</h3>
        <p className="text-sm text-gray-500 mb-4">Upload images for the homepage hero carousel. Images will be automatically cropped to fill the display area (standard ultrawide aspect ratio).</p>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            {heroImages.map((img, idx) => (
              <div key={idx} className="relative w-48 bg-gray-50 border rounded-lg overflow-hidden group shadow-sm aspect-[21/9]">
                <img src={img} className="w-full h-full object-cover" alt="Hero Banner" />
                <button 
                  type="button" 
                  onClick={() => removeImage(idx)} 
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-2 flex items-center gap-4">
            <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium text-sm">
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {isUploading ? "Uploading..." : "Upload Hero Images"}
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold mb-4 border-b pb-2">Contact Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <input 
              type="text" 
              name="whatsappNumber" 
              defaultValue={initialSettings.whatsappNumber || "+91"} 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-brand-yellow focus:border-brand-yellow outline-none" 
              placeholder="+919876543210"
            />
            <p className="text-xs text-gray-500 mt-1">Used for direct WhatsApp enquiries on product pages.</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notification Email</label>
            <input 
              type="email" 
              name="adminEmail" 
              defaultValue={initialSettings.adminEmail || ""} 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-brand-yellow focus:border-brand-yellow outline-none" 
              placeholder="admin@example.com"
            />
            <p className="text-xs text-gray-500 mt-1">Email address to receive form submissions.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="text" 
              name="phoneNumber" 
              defaultValue={initialSettings.phoneNumber || ""} 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-brand-yellow focus:border-brand-yellow outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Public Contact Email</label>
            <input 
              type="email" 
              name="contactEmail" 
              defaultValue={initialSettings.contactEmail || ""} 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-brand-yellow focus:border-brand-yellow outline-none" 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
            <textarea 
              name="businessHours" 
              rows={2}
              defaultValue={initialSettings.businessHours || "Monday - Saturday: 10:00 AM - 7:00 PM\nSunday: Closed"} 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-brand-yellow focus:border-brand-yellow outline-none" 
            />
            <p className="text-xs text-gray-500 mt-1">Use a new line for each schedule.</p>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea 
              name="address" 
              rows={3}
              defaultValue={initialSettings.address || ""} 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-brand-yellow focus:border-brand-yellow outline-none" 
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-brand-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2 font-medium"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Settings
        </button>
      </div>
    </form>
  );
}

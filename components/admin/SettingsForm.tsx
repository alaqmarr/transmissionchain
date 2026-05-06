"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  initialSettings: Record<string, string>;
}

export default function SettingsForm({ initialSettings }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const settings = Object.fromEntries(formData.entries());
    
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

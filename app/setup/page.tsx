"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SetupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
    
    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (res.ok) {
        toast.success("Admin account created successfully! You can now log in.");
        router.push("/admin/login");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to create account");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <Settings className="w-12 h-12 text-brand-yellow mb-4 animate-spin-slow" />
          <h1 className="text-2xl font-bold text-brand-black">Initial Setup</h1>
          <p className="text-gray-500 text-sm mt-2 text-center">Create the primary administrator account for the Transmission Centre dashboard.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" required className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-brand-yellow focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" required minLength={8} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-brand-yellow focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input type="password" name="confirmPassword" required minLength={8} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-brand-yellow focus:outline-none" />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-brand-black text-white font-bold py-3 rounded-md hover:bg-gray-800 transition-colors flex justify-center items-center mt-6"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AdminLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("from") || "/admin";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      
      if (res?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Logged in successfully");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/10 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-glass border border-white/20 p-3">
            <Image src="/logo.png" alt="Transmission Centre" width={48} height={48} />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-3 text-center tracking-wide">Secure access to Transmission Centre</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wide uppercase text-xs">Email Address</label>
            <input type="email" name="email" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-yellow focus:border-transparent focus:bg-black/40 transition-all outline-none" placeholder="admin@example.com" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 tracking-wide uppercase text-xs">Password</label>
            <input type="password" name="password" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-yellow focus:border-transparent focus:bg-black/40 transition-all outline-none" placeholder="••••••••" />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-brand-yellow text-brand-black font-extrabold py-4 rounded-xl hover:bg-white transition-all duration-300 flex justify-center items-center mt-8 shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign In"}
          </button>
        </form>
        
        <div className="mt-10 text-center">
          <Link href="/" className="text-sm font-medium text-gray-400 hover:text-brand-yellow transition-colors inline-flex items-center gap-2">
            <span>←</span> Return to main website
          </Link>
        </div>
      </div>
    </div>
  );
}

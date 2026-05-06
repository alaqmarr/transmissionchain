"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        body: formData,
      });
      
      if (res.ok) {
        toast.success("Message sent successfully! We will get back to you soon.");
        (e.target as HTMLFormElement).reset();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
        <input type="text" id="name" name="name" required className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all shadow-sm" />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Your Email</label>
        <input type="email" id="email" name="email" required className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all shadow-sm" />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone Number (Optional)</label>
        <input type="tel" id="phone" name="phone" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all shadow-sm" />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message</label>
        <textarea id="message" name="message" rows={5} required placeholder="How can we help you?" className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all shadow-sm resize-y"></textarea>
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-brand-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-70 flex justify-center items-center gap-2 shadow-md mt-2"
      >
        {isSubmitting ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
        ) : (
          <><Send className="w-5 h-5" /> Send Message</>
        )}
      </button>
    </form>
  );
}

"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Mail, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

interface Props {
  productId: string;
  productName: string;
  whatsappNumber: string;
  compact?: boolean;
}

export default function ProductEnquiryButtons({ productId, productName, whatsappNumber, compact = false }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWhatsApp = () => {
    const formattedNumber = whatsappNumber.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(`Hello, I am interested in inquiring about the product: ${productName}. Please provide more details.`);
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, "_blank");
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("productName", productName);
    
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        body: formData,
      });
      
      if (res.ok) {
        toast.success("Enquiry sent successfully! We will get back to you soon.");
        setIsModalOpen(false);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to send enquiry.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = isModalOpen && mounted ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-in">
        <div className="bg-brand-black p-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg">Email Enquiry</h3>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleEmailSubmit} className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-4">Inquiring about: <strong className="text-brand-black">{productName}</strong></p>
          </div>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input type="text" id="name" name="name" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent" />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input type="email" id="email" name="email" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent" />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
            <input type="tel" id="phone" name="phone" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent" />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea id="message" name="message" rows={4} required placeholder="I would like to know the price and availability..." className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent"></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-brand-yellow text-brand-black font-bold py-3 rounded-md hover:bg-yellow-400 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
            ) : (
              "Send Enquiry"
            )}
          </button>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className={`flex gap-3 ${compact ? '' : 'flex-col sm:flex-row mt-8'}`}>
        <button 
          onClick={handleWhatsApp}
          className={`flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] ${compact ? 'py-2.5 px-4 text-sm' : 'py-3 px-6'}`}
        >
          <WhatsAppIcon className="w-5 h-5" />
          {compact ? "WhatsApp" : "WhatsApp Enquiry"}
        </button>
        <button 
          onClick={() => setIsModalOpen(true)}
          className={`flex-1 bg-brand-black hover:bg-gray-800 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] ${compact ? 'py-2.5 px-4 text-sm' : 'py-3 px-6'}`}
        >
          <Mail className="w-4 h-4" />
          {compact ? "Enquire" : "Email Enquiry"}
        </button>
      </div>

      {modalContent && createPortal(modalContent, document.body)}
    </>
  );
}

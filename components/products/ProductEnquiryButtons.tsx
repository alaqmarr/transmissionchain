"use client";

import { useState } from "react";
import { MessageCircle, Mail, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  productId: string;
  productName: string;
  whatsappNumber: string;
}

export default function ProductEnquiryButtons({ productId, productName, whatsappNumber }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWhatsApp = () => {
    // Format the whatsapp number (remove non-digits if needed)
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

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button 
          onClick={handleWhatsApp}
          className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Direct WhatsApp Enquiry
        </button>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex-1 bg-brand-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Mail className="w-5 h-5" />
          Direct Email Enquiry
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
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
      )}
    </>
  );
}

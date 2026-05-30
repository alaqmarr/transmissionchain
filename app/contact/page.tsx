import { MapPin, Mail, Phone, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Contact Us - Get a Quote for Transmission Products",
  description: "Contact Transmission Centre for enquiries about CI hand wheels, disc pack couplings, nylon gear couplings, rubber spiders, and more. Located at Ranigunj, Secunderabad. Request a quote today.",
  keywords: [
    "contact transmission centre", "transmission centre phone",
    "get quote transmission products", "enquiry CI hand wheels",
    "coupling enquiry Hyderabad", "transmission parts quote",
    "Ranigunj Secunderabad contact", "industrial supplier contact",
  ],
  openGraph: {
    title: "Contact Transmission Centre",
    description: "Get in touch for quotes on premium transmission products. Located in Secunderabad.",
    url: "/contact",
    siteName: "Transmission Centre",
    type: "website",
  },
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settingsArray = await prisma.setting.findMany({
    where: {
      key: { in: ['address', 'businessHours', 'phoneNumber', 'contactEmail'] }
    }
  });

  const settings = settingsArray.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const addressLines = settings.address 
    ? settings.address.split('\n')
    : ["House No 5-1-446, 1st Floor", "Near Lorry Adda, Ranigunj", "Secunderabad City-500003, Hyderabad"];

  const businessHoursLines = settings.businessHours
    ? settings.businessHours.split('\n')
    : ["Monday - Saturday: 10:00 AM - 7:00 PM", "Sunday: Closed"];

  return (
    <div className="py-24 relative overflow-hidden bg-transparent min-h-[80vh]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tighter text-brand-black">Contact Us</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Have a question about our products or need a custom quote? We're here to help. Reach out to us using the form below or via our contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-white to-brand-green/10 p-10 rounded-3xl shadow-glass hover:shadow-premium border border-brand-green/20 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-8 text-brand-black tracking-tight">Get in Touch</h2>

              <div className="space-y-8">
                <div className="flex gap-5 items-start group">
                  <div className="bg-slate-50 p-4 rounded-2xl shadow-sm text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">Address</h3>
                    {addressLines.map((line, idx) => (
                      <p key={idx} className="text-gray-600 leading-relaxed">{line}</p>
                    ))}
                    <p className="text-brand-green text-sm font-medium mt-2">Near Lorry Adda is a prominent landmark.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start group">
                  <div className="bg-slate-50 p-4 rounded-2xl shadow-sm text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">Business Hours</h3>
                    {businessHoursLines.map((line, idx) => (
                      <p key={idx} className="text-gray-600 leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>

                <div className="flex gap-5 items-start group">
                  <div className="bg-slate-50 p-4 rounded-2xl shadow-sm text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">Phone</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">{settings.phoneNumber || "+91 (placeholder)"}</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start group">
                  <div className="bg-slate-50 p-4 rounded-2xl shadow-sm text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">Email</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">{settings.contactEmail || "info@transmissioncentre.com"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-black p-10 rounded-3xl text-brand-white text-center shadow-glass relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Need a Quick Response?</h3>
              <p className="mb-8 text-gray-400 leading-relaxed">Send us a direct message on WhatsApp for immediate assistance regarding any product.</p>
              <a href={`https://wa.me/${(settings.phoneNumber || "919876543210").replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-yellow text-brand-black px-8 py-3.5 rounded-full font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Map & Form */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-gradient-to-br from-brand-yellow/5 to-white p-2 rounded-3xl shadow-glass border border-brand-yellow/10 overflow-hidden h-[400px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.7441834241693!2d78.486671!3d17.433659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a3caea4ba0b%3A0x6b446dc96bb4d5b2!2sRanigunj%2C%20Secunderabad%2C%20Telangana%20500003!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 rounded-2xl"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="bg-gradient-to-br from-white to-brand-green/10 p-8 md:p-10 rounded-3xl shadow-glass border border-brand-green/20">
              <h3 className="text-2xl font-bold mb-8 text-brand-black tracking-tight">Send us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

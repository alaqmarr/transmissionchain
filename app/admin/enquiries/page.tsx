import prisma from "@/lib/prisma";
import { Mail, Phone, Clock } from "lucide-react";

export default async function AdminEnquiries() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-black">Enquiries</h1>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {enquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No enquiries found.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {enquiries.map((enq) => (
              <div key={enq.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{enq.name}</h3>
                    <p className="text-sm font-medium text-brand-green">
                      {enq.productName ? `Inquiring about: ${enq.productName}` : "General Enquiry"}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(enq.createdAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4 text-gray-700 whitespace-pre-wrap text-sm border border-gray-100">
                  {enq.message}
                </div>
                
                <div className="flex gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${enq.email}`} className="hover:text-brand-green hover:underline">{enq.email}</a>
                  </div>
                  {enq.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${enq.phone}`} className="hover:text-brand-green hover:underline">{enq.phone}</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

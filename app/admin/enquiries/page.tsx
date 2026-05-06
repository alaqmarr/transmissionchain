import prisma from "@/lib/prisma";
import EnquiryList from "@/components/admin/EnquiryList";

export default async function AdminEnquiries() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-black">Enquiries</h1>
          <p className="text-sm text-gray-500 mt-1">
            {enquiries.filter(e => !e.isRead).length} unread · {enquiries.length} total
          </p>
        </div>
      </div>

      <EnquiryList enquiries={JSON.parse(JSON.stringify(enquiries))} />
    </div>
  );
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import transporter, { FROM_EMAIL } from "@/lib/mail";
import { adminReplyTemplate } from "@/lib/email-templates";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { enquiryId, replyMessage } = body;

    if (!enquiryId || !replyMessage) {
      return NextResponse.json({ error: "Missing enquiryId or replyMessage" }, { status: 400 });
    }

    // Fetch the enquiry
    const enquiry = await prisma.enquiry.findUnique({
      where: { id: enquiryId },
    });

    if (!enquiry) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    // Mark as read
    await prisma.enquiry.update({
      where: { id: enquiryId },
      data: { isRead: true },
    });

    // Send reply email to the customer
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: FROM_EMAIL,
        to: enquiry.email,
        subject: enquiry.productName
          ? `Re: Your enquiry about ${enquiry.productName} — Transmission Centre`
          : `Re: Your enquiry — Transmission Centre`,
        html: adminReplyTemplate({
          customerName: enquiry.name,
          replyMessage,
          originalMessage: enquiry.message,
        }),
      });

      return NextResponse.json({ success: true, emailSent: true });
    }

    return NextResponse.json({ success: true, emailSent: false, reason: "SMTP not configured" });
  } catch (error) {
    console.error("Reply email error:", error);
    return NextResponse.json({ error: "Failed to send reply" }, { status: 500 });
  }
}

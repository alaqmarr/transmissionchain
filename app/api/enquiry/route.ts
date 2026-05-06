import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import transporter, { FROM_EMAIL, ADMIN_EMAIL } from "@/lib/mail";
import {
  customerAutoReplyTemplate,
  adminEnquiryAlertTemplate,
} from "@/lib/email-templates";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const productName = formData.get("productName") as string;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Database
    await prisma.enquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
        productName: productName || null,
      },
    });

    // Fetch Admin Email from Settings (fallback to env)
    const adminEmailSetting = await prisma.setting.findUnique({
      where: { key: "adminEmail" },
    });
    const adminEmail = adminEmailSetting?.value || ADMIN_EMAIL;

    const emailResults = { customerAutoReply: false, adminAlert: false };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      // 1. Send auto-reply to customer
      try {
        await transporter.sendMail({
          from: FROM_EMAIL,
          to: email,
          replyTo: adminEmail,
          subject: productName
            ? `Thank you for your enquiry about ${productName} — Transmission Centre`
            : `Thank you for your enquiry — Transmission Centre`,
          html: customerAutoReplyTemplate({
            customerName: name,
            message,
            productName: productName || undefined,
          }),
        });
        emailResults.customerAutoReply = true;
      } catch (err) {
        console.error("Failed to send auto-reply:", err);
      }

      // 2. Send alert to admin
      try {
        await transporter.sendMail({
          from: FROM_EMAIL,
          to: adminEmail,
          replyTo: email,
          subject: productName
            ? `🔔 New Enquiry: ${productName} — from ${name}`
            : `🔔 New Enquiry — from ${name}`,
          html: adminEnquiryAlertTemplate({
            customerName: name,
            customerEmail: email,
            customerPhone: phone || undefined,
            message,
            productName: productName || undefined,
          }),
        });
        emailResults.adminAlert = true;
      } catch (err) {
        console.error("Failed to send admin alert:", err);
      }
    }

    return NextResponse.json({
      success: true,
      savedToDb: true,
      emailSent: emailResults,
    });
  } catch (error) {
    console.error("Enquiry processing error:", error);
    return NextResponse.json({ error: "Failed to process enquiry" }, { status: 500 });
  }
}

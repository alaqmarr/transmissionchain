import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

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
      }
    });

    // Fetch Admin Email from Settings
    const adminEmailSetting = await prisma.setting.findUnique({
      where: { key: "adminEmail" }
    });
    const adminEmail = adminEmailSetting?.value || process.env.SMTP_USER;

    if (!adminEmail) {
      console.warn("No admin email configured to receive the enquiry.");
      // Still return success since it's saved in DB
      return NextResponse.json({ success: true, savedToDb: true, emailSent: false });
    }

    // SMTP Configuration using Gmail
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS, // App password
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: adminEmail, // Send to the email from settings
        replyTo: email,
        subject: productName ? `New Enquiry for ${productName} from ${name}` : `New General Enquiry from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Product: ${productName || "General"}

Message:
${message}
        `,
      };

      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, savedToDb: true, emailSent: true });
    } else {
      console.log("SMTP not configured. Mock sending email to:", adminEmail);
      return NextResponse.json({ success: true, savedToDb: true, emailSent: false, mocked: true });
    }
  } catch (error) {
    console.error("Enquiry processing error:", error);
    return NextResponse.json({ error: "Failed to process enquiry" }, { status: 500 });
  }
}

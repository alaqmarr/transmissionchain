import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter;

export const FROM_EMAIL = process.env.SMTP_FROM || "Transmission Centre <info@thewebsensei.email>";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@thewebsensei.email";

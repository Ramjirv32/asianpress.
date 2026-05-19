import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    // Client IP rate limiting (Limit to 3 messages per minute)
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Setup Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || "asianresearchpress25@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"ARP Website Contact" <${process.env.EMAIL_USER || "asianresearchpress25@gmail.com"}>`,
      to: "asianresearchpress25@gmail.com",
      replyTo: email,
      subject: `[ARP Contact Form] ${subject}`,
      text: `New message from ARP Contact Form:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact form email sending error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send message" },
      { status: 500 }
    );
  }
}

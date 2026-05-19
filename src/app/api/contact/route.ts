import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rateLimit";
import nodemailer from "nodemailer";

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

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Inquiry</h2>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <p style="color: #475569; font-size: 16px; margin-bottom: 25px;">You have received a new message from the Asian Research Press website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; width: 35%; color: #64748b; font-weight: bold;">Sender Name:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Email Address:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #2563eb;">
                <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Subject:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${subject}</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 10px 0; color: #64748b; font-weight: bold; font-size: 14px;">Message Details:</p>
            <p style="margin: 0; color: #334155; line-height: 1.6; font-size: 15px; white-space: pre-wrap;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="mailto:${email}" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reply to Sender</a>
          </div>
        </div>
      </div>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sending to the same configured email to receive inquiries
      replyTo: email,
      subject: `ARP Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: emailTemplate,
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process message" },
      { status: 500 }
    );
  }
}

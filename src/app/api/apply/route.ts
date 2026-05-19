import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    // Client IP rate limiting (Limit to 3 submissions per minute)
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many applications sent. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const country = formData.get("country") as string;
    const collegeName = formData.get("collegeName") as string;
    const message = formData.get("message") as string;
    const resumeFile = formData.get("resume") as File;

    if (!fullName || !country || !collegeName || !resumeFile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Convert File object to Buffer for attachment
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

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
      from: `"ARP Fellowship Application" <${process.env.EMAIL_USER || "asianresearchpress25@gmail.com"}>`,
      to: "asianresearchpress25@gmail.com",
      subject: `[ARP Fellowship Application] ${fullName} - ${country}`,
      text: `New Fellowship Application Received:

Name: ${fullName}
Country: ${country}
College/University: ${collegeName}
Cover Letter / Message: ${message || "None provided"}
`,
      attachments: [
        {
          filename: resumeFile.name,
          content: buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Apply form email sending error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email application" },
      { status: 500 }
    );
  }
}

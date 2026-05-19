import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Admin } from "@/models/Admin";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email } = await request.json();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: "No admin found with this email" }, { status: 404 });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.resetToken = otp;
    admin.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins expiry
    await admin.save();

    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ARP Admin System" <${process.env.EMAIL_USER}>`,
      to: admin.email,
      subject: "ARP Admin Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 15 minutes.`,
      html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p><p>It is valid for 15 minutes.</p>`,
    });

    return NextResponse.json({ success: true, message: "OTP sent to email" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

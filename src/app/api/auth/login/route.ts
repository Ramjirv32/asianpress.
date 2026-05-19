import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { Admin } from "@/models/Admin";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate 6-digit OTP for 2FA
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.loginOtp = otp;
    admin.loginOtpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
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
      subject: "ARP Admin Login Verification Code",
      text: `Your login verification code is: ${otp}. It expires in 5 minutes.`,
      html: `<p>Your login verification code is: <strong style="font-size: 24px;">${otp}</strong></p><p>It expires in 5 minutes.</p>`,
    });

    return NextResponse.json({ success: true, requiresOtp: true, message: "Verification code sent to your email" });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

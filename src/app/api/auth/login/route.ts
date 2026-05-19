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

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #0f172a; padding: 25px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">ARP Admin Verification</h2>
        </div>
        <div style="padding: 30px; background-color: #ffffff; text-align: center;">
          <p style="color: #475569; font-size: 15px; margin-bottom: 20px; line-height: 1.5;">You are receiving this email because a login attempt was made on the Asian Research Press Admin Portal.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px dashed #c9a74d; display: inline-block; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Verification Code</p>
            <span style="font-size: 32px; font-weight: bold; color: #0f172a; letter-spacing: 4px;">${otp}</span>
          </div>
          
          <p style="color: #64748b; font-size: 13px; margin: 0;">
            This verification code is valid for <strong>5 minutes</strong>.<br>
            If you did not initiate this login, please change your password immediately.
          </p>
        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0;">
          <span style="color: #94a3b8; font-size: 12px;">&copy; ${new Date().getFullYear()} Asian Research Press. All rights reserved.</span>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"ARP Admin System" <${process.env.EMAIL_USER}>`,
      to: admin.email,
      subject: "ARP Admin Login Verification Code",
      text: `Your login verification code is: ${otp}. It expires in 5 minutes.`,
      html: emailTemplate,
    });

    return NextResponse.json({ success: true, requiresOtp: true, message: "Verification code sent to your email" });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

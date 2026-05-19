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

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #0f172a; padding: 25px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">Reset Your Password</h2>
        </div>
        <div style="padding: 30px; background-color: #ffffff; text-align: center;">
          <p style="color: #475569; font-size: 15px; margin-bottom: 20px; line-height: 1.5;">We received a request to reset your password for the Asian Research Press Admin Portal.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px dashed #c9a74d; display: inline-block; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">One-Time Password (OTP)</p>
            <span style="font-size: 32px; font-weight: bold; color: #0f172a; letter-spacing: 4px;">${otp}</span>
          </div>
          
          <p style="color: #64748b; font-size: 13px; margin: 0;">
            This OTP code is valid for <strong>15 minutes</strong>.<br>
            If you did not make this request, you can safely ignore this email.
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
      subject: "ARP Admin Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 15 minutes.`,
      html: emailTemplate,
    });

    return NextResponse.json({ success: true, message: "OTP sent to email" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

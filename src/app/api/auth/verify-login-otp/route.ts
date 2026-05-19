import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import { Admin } from "@/models/Admin";
import { serialize } from "cookie";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Missing email or OTP" }, { status: 400 });
    }

    const admin = await Admin.findOne({
      email,
      loginOtp: otp,
      loginOtpExpiry: { $gt: new Date() }
    });

    if (!admin) {
      return NextResponse.json({ error: "Invalid or expired verification code" }, { status: 401 });
    }

    // Clear the OTP
    admin.loginOtp = undefined;
    admin.loginOtpExpiry = undefined;
    await admin.save();

    const token = jwt.sign({ adminId: admin._id, email: admin.email }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({ success: true, message: "Login successful" });
    
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "strict",
    });

    response.cookies.set("admin_logged_in", "true", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error: any) {
    console.error("OTP Verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

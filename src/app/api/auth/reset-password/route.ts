import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { Admin } from "@/models/Admin";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, otp, newPassword } = await request.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const admin = await Admin.findOne({ 
      email, 
      resetToken: otp,
      resetTokenExpiry: { $gt: new Date() } // Ensure token is not expired
    });

    if (!admin) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // Reset password
    admin.passwordHash = await bcrypt.hash(newPassword, 10);
    admin.resetToken = undefined;
    admin.resetTokenExpiry = undefined;
    await admin.save();

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rateLimit";
import nodemailer from "nodemailer";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import os from "os";
import { connectToDatabase } from "@/lib/db";
import { Application } from "@/models/Application";

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

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer());

    // Create a temporary uploads folder to store the file (os.tmpdir() works on Vercel too)
    const uploadDir = join(os.tmpdir(), "uploads");
    await mkdir(uploadDir, { recursive: true });
    
    // Save the file to the local disk
    const filePath = join(uploadDir, resumeFile.name);
    await writeFile(filePath, fileBuffer);

    // Save submission to MongoDB
    await connectToDatabase();
    await Application.create({
      fullName,
      country,
      collegeName,
      message,
      fileName: resumeFile.name
    });

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px;">New Fellowship Application</h2>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <p style="color: #475569; font-size: 16px; margin-bottom: 25px;">A new candidate has submitted an application for the Research Fellowship Program.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; width: 35%; color: #64748b; font-weight: bold;">Applicant Name:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Country:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${country}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Institution:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${collegeName}</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 10px 0; color: #64748b; font-weight: bold; font-size: 14px;">Additional Message / Cover Letter:</p>
            <p style="margin: 0; color: #334155; line-height: 1.6; font-size: 15px;">
              ${(message || 'No additional message provided.').replace(/\n/g, "<br>")}
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
            <em>The applicant's CV/Resume is attached to this email.</em>
          </p>
        </div>
      </div>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"${fullName}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to the configured receiver email
      subject: `New Fellowship Application: ${fullName} - ${country}`,
      text: `Name: ${fullName}\nCountry: ${country}\nCollege: ${collegeName}\n\nMessage:\n${message || 'None provided'}`,
      html: emailTemplate,
      attachments: [
        {
          filename: resumeFile.name,
          path: filePath, // Attaching the file from the saved local path
        },
      ],
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Apply form error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process application" },
      { status: 500 }
    );
  }
}

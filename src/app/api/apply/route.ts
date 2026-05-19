import { NextResponse } from "next/server";
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

    // Log the details to the console (SMTP is handled by a separate server)
    console.log("Fellowship Application Received (handled by separate server):", {
      fullName,
      country,
      collegeName,
      message: message || "None provided",
      fileName: resumeFile.name,
      fileSize: resumeFile.size,
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

import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rateLimit";

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

    // Log the details to the console (SMTP is handled by a separate server)
    console.log("Contact Message Received (handled by separate server):", {
      name,
      email,
      subject,
      message,
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

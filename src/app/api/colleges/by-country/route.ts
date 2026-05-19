import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { College } from "@/models/College";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");

    if (!country) {
      return NextResponse.json({ error: "Missing country parameter" }, { status: 400 });
    }

    const colleges = await College.find({ country }).sort({ collegeName: 1 }).select("collegeName");
    return NextResponse.json({ success: true, data: colleges.map(c => c.collegeName) });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch colleges for country" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { College } from "@/models/College";

export async function GET() {
  try {
    await connectToDatabase();
    const countries = await College.distinct("country");
    return NextResponse.json({ success: true, data: countries.sort() });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 });
  }
}

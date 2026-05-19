import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Application } from "@/models/Application";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");
    const college = searchParams.get("college");
    const timeFilter = searchParams.get("time"); // e.g., "last_week"

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    let query: any = {};

    if (country) {
      query.country = country;
    }

    if (college) {
      query.collegeName = college;
    }

    if (timeFilter === "last_week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      query.submittedAt = { $gte: oneWeekAgo };
    }

    const totalSubmissions = await Application.countDocuments(query);
    const submissions = await Application.find(query)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ 
      success: true, 
      data: submissions,
      pagination: {
        total: totalSubmissions,
        page,
        limit,
        totalPages: Math.ceil(totalSubmissions / limit)
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

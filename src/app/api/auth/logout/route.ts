import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // Expire immediately
    path: "/",
    sameSite: "strict",
  });

  response.cookies.set("admin_logged_in", "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // Expire immediately
    path: "/",
    sameSite: "strict",
  });

  return response;
}

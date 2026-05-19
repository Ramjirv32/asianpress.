import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    const response = NextResponse.json({ loggedIn: !!token });
    
    if (token) {
      response.cookies.set("admin_logged_in", "true", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
        sameSite: "strict",
      });
    }
    
    return response;
  } catch (error) {
    return NextResponse.json({ loggedIn: false });
  }
}

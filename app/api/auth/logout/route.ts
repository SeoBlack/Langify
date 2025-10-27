import { NextResponse } from "next/server";

export async function POST() {
  // For JWT-based auth, logout is handled client-side by removing the token
  // This endpoint can be used for additional cleanup if needed
  return NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
}

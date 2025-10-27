import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { nativeLanguage, targetLanguage } = await request.json();
    console.log(nativeLanguage, targetLanguage);

    // Get token from Authorization header
    const authHeader = request.headers.get("authorization");
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      console.log("Server configuration error");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    // Validate input
    if (!nativeLanguage || !targetLanguage) {
      return NextResponse.json(
        {
          success: false,
          error: "Both native and target languages are required",
        },
        { status: 400 }
      );
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        targetLanguage,
        nativeLanguage,
        profileSetupCompleted: true,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    console.error("Profile setup error:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

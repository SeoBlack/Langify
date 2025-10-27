import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { withAuth } from "@/lib/auth";

const prisma = new PrismaClient();

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  targetLanguage: z.string().min(1, "Target language is required").optional(),
  avatar: z.string().url("Invalid avatar URL").optional().nullable(),
});

export const PUT = withAuth(async (req: NextRequest, userId: string) => {
  try {
    const body = await req.json();
    const validatedData = updateProfileSchema.parse(body);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: validatedData,
      select: {
        id: true,
        email: true,
        name: true,
        targetLanguage: true,
        avatar: true,
        isVerified: true,
        streak: true,
        totalWords: true,
        masteredWords: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    console.error("Update profile error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
});

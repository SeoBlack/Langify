import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { provideFeedback } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { userId, sentence, targetLanguage } = await req.json();

    if (!userId || !sentence || !targetLanguage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get AI feedback
    const feedback = await provideFeedback(sentence, targetLanguage);

    // Log the practice
    await prisma.practiceLog.create({
      data: {
        userId,
        activityType: "feedback",
        score: feedback.score,
        wordsCount: sentence.split(" ").length,
      },
    });

    return NextResponse.json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Failed to generate feedback" },
      { status: 500 }
    );
  }
}

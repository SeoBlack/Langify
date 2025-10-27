import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userId, quizId, wordId, isCorrect, timeTaken } = await req.json();

    if (!userId || !quizId || !wordId || isCorrect === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save quiz result
    const result = await prisma.quizResult.create({
      data: {
        userId,
        quizId,
        wordId,
        isCorrect,
        timeTaken,
      },
    });

    // Update word mastery level with XP system
    const word = await prisma.word.findUnique({
      where: { id: wordId },
    });

    if (word) {
      // Award XP based on correctness
      // Correct answer: +15 XP, Incorrect answer: -5 XP
      const xpGain = isCorrect ? 15 : -5;
      const newXpPoints = Math.max(0, (word.xpPoints || 0) + xpGain);

      // Calculate mastery level from XP
      // Level 0: 0-19 XP
      // Level 1: 20-49 XP
      // Level 2: 50-99 XP
      // Level 3: 100-159 XP
      // Level 4: 160-249 XP
      // Level 5: 250+ XP
      const newMasteryLevel = Math.min(
        newXpPoints < 20
          ? 0
          : newXpPoints < 50
          ? 1
          : newXpPoints < 100
          ? 2
          : newXpPoints < 160
          ? 3
          : newXpPoints < 250
          ? 4
          : 5,
        5
      );

      await prisma.word.update({
        where: { id: wordId },
        data: {
          masteryLevel: newMasteryLevel,
          xpPoints: newXpPoints,
          correctCount: isCorrect ? { increment: 1 } : undefined,
          incorrectCount: !isCorrect ? { increment: 1 } : undefined,
          lastPracticed: new Date(),
        },
      });

      // Update mastered words count if reached level 5
      if (newMasteryLevel === 5 && word.masteryLevel < 5) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            masteredWords: { increment: 1 },
          },
        });
      }
    }

    // Log practice activity
    await prisma.practiceLog.create({
      data: {
        userId,
        activityType: "quiz",
        score: isCorrect ? 100 : 0,
        wordsCount: 1,
      },
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz result" },
      { status: 500 }
    );
  }
}

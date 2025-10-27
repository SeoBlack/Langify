import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateQuiz } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { userId, categoryId, count = 5 } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Fetch user language preferences
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { nativeLanguage: true, targetLanguage: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch words to practice
    const whereClause: any = { userId };
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const words = await prisma.word.findMany({
      where: whereClause,
      take: count,
      orderBy: [
        { masteryLevel: "asc" }, // Prioritize words with lower mastery
        { lastPracticed: "asc" }, // Then least recently practiced
      ],
    });

    if (words.length === 0) {
      return NextResponse.json(
        { error: "No words found to practice" },
        { status: 404 }
      );
    }

    // Generate quiz questions
    const quizData = await generateQuiz(
      words.map((w) => ({
        original: w.original,
        translation: w.translation,
        targetLanguage: w.targetLanguage,
      })),
      user.nativeLanguage,
      user.targetLanguage
    );

    // Save quiz questions
    const savedQuizzes = await Promise.all(
      quizData.map((q: any) =>
        prisma.quiz.create({
          data: {
            type: q.type || "multiple_choice",
            question: q.question,
            correctAnswer: q.correctAnswer,
            options: q.options,
            word: q.word,
            context: q.context,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      quizzes: savedQuizzes,
      words,
    });
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}

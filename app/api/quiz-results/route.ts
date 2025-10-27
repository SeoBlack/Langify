import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : 50;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Fetch quiz results with related data
    const quizResults = await prisma.quizResult.findMany({
      where: {
        userId,
      },
      include: {
        word: {
          select: {
            id: true,
            original: true,
            translation: true,
            targetLanguage: true,
          },
        },
        quiz: {
          select: {
            id: true,
            type: true,
            question: true,
            correctAnswer: true,
            options: true,
            context: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    // Group quiz results by quiz session (by createdAt date/hour)
    // We'll consider results within 30 minutes as the same session
    const groupedResults: {
      sessionId: string;
      date: Date;
      totalQuestions: number;
      correctAnswers: number;
      timeTaken: number;
      results: typeof quizResults;
    }[] = [];

    quizResults.forEach((result) => {
      const resultDate = new Date(result.createdAt);

      // Check if this result belongs to an existing session (within 30 minutes)
      let foundSession = groupedResults.find((session) => {
        const sessionDate = new Date(session.date);
        const timeDiff =
          Math.abs(resultDate.getTime() - sessionDate.getTime()) / (1000 * 60);
        return timeDiff <= 30;
      });

      if (!foundSession) {
        // Create new session
        foundSession = {
          sessionId: result.id,
          date: resultDate,
          totalQuestions: 0,
          correctAnswers: 0,
          timeTaken: 0,
          results: [],
        };
        groupedResults.push(foundSession);
      }

      foundSession.totalQuestions++;
      if (result.isCorrect) foundSession.correctAnswers++;
      if (result.timeTaken) foundSession.timeTaken += result.timeTaken;
      foundSession.results.push(result);
    });

    // Sort grouped results by date (most recent first)
    groupedResults.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return NextResponse.json({
      success: true,
      sessions: groupedResults,
      totalResults: quizResults.length,
    });
  } catch (error) {
    console.error("Fetch quiz results error:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz results" },
      { status: 500 }
    );
  }
}

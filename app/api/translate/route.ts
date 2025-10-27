import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { translateWord } from "@/lib/translate";

export async function POST(req: NextRequest) {
  try {
    const {
      word,
      targetLanguage,
      sourceLanguage,
      userId,
      addToPractice = true,
    } = await req.json();

    if (!word || !targetLanguage || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Translate the word
    const { translation } = await translateWord(
      word,
      targetLanguage,
      sourceLanguage || "en"
    );

    let savedWord = null;

    if (addToPractice) {
      // Save the word without category
      savedWord = await prisma.word.create({
        data: {
          userId,
          original: word,
          translation,
          targetLanguage,
          sourceLanguage: sourceLanguage || "en",
        },
      });

      // Update user stats
      await prisma.user.update({
        where: { id: userId },
        data: {
          totalWords: { increment: 1 },
        },
      });
    } else {
      // Create a temporary word object for the response
      savedWord = {
        id: "temp",
        original: word,
        translation,
        targetLanguage,
        sourceLanguage: sourceLanguage || "en",
      };
    }

    return NextResponse.json({
      success: true,
      word: savedWord,
      translation,
    });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Failed to translate word" },
      { status: 500 }
    );
  }
}

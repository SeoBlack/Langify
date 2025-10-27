import { NextRequest, NextResponse } from "next/server";
import { generateContextualSentence } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { word, translation, targetLanguage } = await req.json();

    if (!word || !translation || !targetLanguage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await generateContextualSentence(
      word,
      translation,
      targetLanguage
    );

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Contextual sentence error:", error);
    return NextResponse.json(
      { error: "Failed to generate contextual sentence" },
      { status: 500 }
    );
  }
}

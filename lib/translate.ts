// Translation service using Google Translate API
// Using REST API approach for Next.js compatibility

export async function translateWord(
  word: string,
  targetLanguage: string = "es",
  sourceLanguage: string = "en"
): Promise<{ translation: string; context?: string }> {
  try {
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!apiKey) {
      throw new Error("Google Translate API key not found");
    }

    // Use Google Translate REST API
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: word,
          source: sourceLanguage,
          target: targetLanguage,
          format: "text",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();

    if (
      !data.data ||
      !data.data.translations ||
      data.data.translations.length === 0
    ) {
      throw new Error("No translation found");
    }

    const translation = data.data.translations[0].translatedText;

    return {
      translation,
    };
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Failed to translate word");
  }
}

export const SUPPORTED_LANGUAGES = [
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "fi", name: "Finnish", flag: "🇫🇮" },
];

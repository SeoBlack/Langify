import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateQuiz(
  words: { original: string; translation: string; targetLanguage: string }[],
  nativeLanguage: string = "en",
  targetLanguage: string = "es"
) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const prompt = `Generate 5 diverse quiz questions for language learning with different question types.
Words to practice: ${words
    .map((w) => `${w.original} (${w.translation})`)
    .join(", ")}
Native language: ${nativeLanguage}
Target language: ${targetLanguage}

Create a mix of these question types:
1. MULTIPLE_CHOICE: "What does '[word]' mean?" with 4 options in ${nativeLanguage}
2. DEFINITION: "Which word means '[definition in ${nativeLanguage}]'?" with 4 word options in ${targetLanguage}
3. FILL_BLANK: "Complete the sentence in ${targetLanguage}: '[sentence with blank]'" with 4 word options in ${targetLanguage}

IMPORTANT RULES:
- For DEFINITION questions: Provide the definition/meaning in ${nativeLanguage}, ask for the word in ${targetLanguage}
- For FILL_BLANK questions: The sentence must be entirely in ${targetLanguage}, only the blank should be filled
- For MULTIPLE_CHOICE: All options should be in ${nativeLanguage}
- Do NOT show the word being tested in the question display
- Make incorrect options realistic but clearly wrong
- Include context when helpful

Return ONLY a valid JSON array with format:
[{
  "type": "multiple_choice|definition|fill_blank",
  "question": "question text",
  "correctAnswer": "correct answer",
  "options": ["option1", "option2", "option3", "option4"],
  "word": "word being tested",
  "context": "additional context if needed"
}]`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Clean up response text to extract JSON
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("No valid JSON in response");

  return JSON.parse(jsonMatch[0]);
}

export async function generateContextualSentence(
  word: string,
  translation: string,
  targetLanguage: string
) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const prompt = `Generate a contextual sentence using the word "${word}" in ${targetLanguage}.
The word means "${translation}" in English.

Return ONLY a valid JSON object:
{
  "sentence": "sentence in target language",
  "translation": "sentence translation in English",
  "explanation": "brief explanation of usage"
}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Clean up response text to extract JSON
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No valid JSON in response");

  return JSON.parse(jsonMatch[0]);
}

export async function provideFeedback(
  sentence: string,
  targetLanguage: string
) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const prompt = `As a language teacher, provide constructive feedback on this ${targetLanguage} sentence:
"${sentence}"

Analyze:
1. Grammar correctness
2. Natural phrasing
3. Vocabulary usage
4. Suggestions for improvement

Return ONLY a valid JSON object:
{
  "isCorrect": true or false,
  "score": number from 0 to 100,
  "feedback": "detailed feedback",
  "corrections": ["correction1", "correction2"],
  "suggestions": ["suggestion1", "suggestion2"]
}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Clean up response text to extract JSON
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No valid JSON in response");

  return JSON.parse(jsonMatch[0]);
}

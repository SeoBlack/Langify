// Shared TypeScript interfaces and types for the Langy app

export interface User {
  id: string;
  email: string;
  name: string;
  targetLanguage: string;
  avatar?: string;
  isVerified: boolean;
  streak: number;
  totalWords: number;
  masteredWords: number;
  createdAt: string;
  updatedAt: string;
}

export interface Word {
  id: string;
  original: string;
  translation: string;
  targetLanguage: string;
  sourceLanguage: string;
  masteryLevel?: number;
  xpPoints?: number;
  correctCount?: number;
  incorrectCount?: number;
  lastPracticed?: string | null;
  createdAt: string;
  context?: string;
  category?: {
    id: string;
    name: string;
  };
}

export interface Quiz {
  id: string;
  type: "multiple_choice" | "fill_blank" | "definition";
  question: string;
  correctAnswer: string;
  options: string[];
  word?: string; // The word being tested
  context?: string; // Additional context for the question
}

export interface ContextualSentence {
  sentence: string;
  translation: string;
  explanation: string;
}

export interface TranslationResult {
  translation: string;
  word: Word;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface StatsResponse {
  success: boolean;
  stats: Stats;
}

export interface WordsResponse {
  success: boolean;
  words: Word[];
}

export interface QuizResponse {
  success: boolean;
  quizzes: Quiz[];
  words: Word[];
}

export interface ContextualSentenceResponse {
  success: boolean;
  sentence: string;
  translation: string;
  explanation: string;
}

export interface TranslationRequest {
  word: string;
  targetLanguage: string;
  sourceLanguage: string;
  userId: string;
  addToPractice?: boolean;
}

export interface QuizSubmitRequest {
  userId: string;
  quizId: string;
  wordId: string;
  isCorrect: boolean;
}

export interface ContextualSentenceRequest {
  word: string;
  translation: string;
  targetLanguage: string;
}

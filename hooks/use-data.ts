import { useQuery } from "@tanstack/react-query";
import {
  StatsResponse,
  WordsResponse,
  QuizResponse,
  ContextualSentenceResponse,
} from "@/lib/types";

// Hook for fetching user stats
export const useStats = (userId?: string) => {
  return useQuery<StatsResponse>({
    queryKey: ["stats", userId],
    queryFn: async () => {
      const res = await fetch(`/api/stats?userId=${userId}`);
      return res.json();
    },
    enabled: !!userId,
  });
};

// Hook for fetching user words
export const useWords = (userId?: string, limit?: number) => {
  return useQuery<WordsResponse>({
    queryKey: ["words", userId, limit],
    queryFn: async () => {
      const url = limit
        ? `/api/words?userId=${userId}&limit=${limit}`
        : `/api/words?userId=${userId}`;
      const res = await fetch(url);
      return res.json();
    },
    enabled: !!userId,
  });
};

// Hook for fetching recent words
export const useRecentWords = (userId?: string, limit: number = 5) => {
  return useWords(userId, limit);
};

// Hook for fetching quiz results
export const useQuizResults = (userId?: string, limit?: number) => {
  return useQuery<any>({
    queryKey: ["quizResults", userId, limit],
    queryFn: async () => {
      const url = limit
        ? `/api/quiz-results?userId=${userId}&limit=${limit}`
        : `/api/quiz-results?userId=${userId}`;
      const res = await fetch(url);
      return res.json();
    },
    enabled: !!userId,
  });
};

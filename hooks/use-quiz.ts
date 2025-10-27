import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Quiz, Word, QuizSubmitRequest } from "@/lib/types";

export function useQuiz(userId?: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const generateQuizMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          count: 5,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to generate quiz");
      }
      return res.json();
    },
    onSuccess: (data) => {
      setQuizzes(data.quizzes);
      setWords(data.words);
      setCurrentQuizIndex(0);
      setScore(0);
      setQuizCompleted(false);
      setIsAnswered(false);
      setSelectedAnswer(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async (data: {
      quizId: string;
      wordId: string;
      isCorrect: boolean;
    }) => {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          ...data,
        } as QuizSubmitRequest),
      });

      if (!res.ok) throw new Error("Failed to submit answer");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    const currentQuiz = quizzes[currentQuizIndex];
    const isCorrect = answer === currentQuiz.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    // Submit answer
    submitAnswerMutation.mutate({
      quizId: currentQuiz.id,
      wordId: words[currentQuizIndex].id,
      isCorrect,
    });
  };

  const handleNext = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
      toast({
        title: "Quiz Complete!",
        description: `You scored ${score + 1} out of ${quizzes.length}`,
      });
    }
  };

  const resetQuiz = () => {
    setQuizzes([]);
    setWords([]);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return {
    // State
    quizzes,
    words,
    currentQuizIndex,
    selectedAnswer,
    isAnswered,
    score,
    quizCompleted,
    isGenerating: generateQuizMutation.isPending,

    // Actions
    generateQuiz: generateQuizMutation.mutate,
    handleAnswerSelect,
    handleNext,
    resetQuiz,
  };
}

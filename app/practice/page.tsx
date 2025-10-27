"use client";

import { useUserStore } from "@/store/user-store";
import { QuizInterface } from "@/components/practice/QuizInterface";
import { WordsBrowser } from "@/components/practice/WordsBrowser";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useQuiz } from "@/hooks/use-quiz";
import { useWords } from "@/hooks/use-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BookOpen } from "lucide-react";

export default function PracticePage() {
  const { user } = useUserStore();

  const {
    quizzes,
    words: quizWords,
    currentQuizIndex,
    selectedAnswer,
    isAnswered,
    score,
    quizCompleted,
    isGenerating,
    generateQuiz,
    handleAnswerSelect,
    handleNext,
  } = useQuiz(user?.id);

  // Fetch all user words for the Words tab
  const { data: wordsData, isLoading: isLoadingWords } = useWords(user?.id);

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Practice Zone
          </h1>
          <p className="text-muted-foreground mt-2">
            Test your knowledge with quizzes and browse your saved words
          </p>
        </div>

        <Tabs defaultValue="quiz" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="words" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Words
            </TabsTrigger>
          </TabsList>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <QuizInterface
              quizzes={quizzes}
              words={quizWords}
              currentQuizIndex={currentQuizIndex}
              selectedAnswer={selectedAnswer}
              isAnswered={isAnswered}
              score={score}
              quizCompleted={quizCompleted}
              isGenerating={isGenerating}
              onGenerateQuiz={generateQuiz}
              onAnswerSelect={handleAnswerSelect}
              onNext={handleNext}
            />
          </TabsContent>

          {/* Words Tab */}
          <TabsContent value="words" className="space-y-6">
            <WordsBrowser
              words={wordsData?.words || []}
              isLoading={isLoadingWords}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AuthGuard>
  );
}

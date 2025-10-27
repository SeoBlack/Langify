"use client";

import { useUserStore } from "@/store/user-store";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useQuizResults } from "@/hooks/use-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check, X, Clock, Brain } from "lucide-react";

// Helper function to format time ago
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
};

export default function QuizResultsPage() {
  const { user } = useUserStore();
  const { data, isLoading, error } = useQuizResults(user?.id);

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AuthGuard>
    );
  }

  if (error || !data?.success) {
    return (
      <AuthGuard>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground">
              {error?.message || "Failed to load quiz results"}
            </p>
          </CardContent>
        </Card>
      </AuthGuard>
    );
  }

  const sessions = data?.sessions || [];

  return (
    <AuthGuard>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Quiz Results
          </h1>
          <p className="text-muted-foreground mt-2">
            Review your previous quiz sessions and track your progress
          </p>
        </div>

        {sessions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Brain className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No quiz results yet
              </h3>
              <p className="text-muted-foreground text-center">
                Complete some quizzes to see your results here
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sessions.map((session: any, index: number) => {
              const score =
                session.totalQuestions > 0
                  ? Math.round(
                      (session.correctAnswers / session.totalQuestions) * 100
                    )
                  : 0;

              return (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="border-b bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">Quiz Session</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {formatTimeAgo(new Date(session.date))}
                        </p>
                      </div>
                      <Badge
                        variant={
                          score >= 80
                            ? "default"
                            : score >= 60
                            ? "secondary"
                            : "outline"
                        }
                        className="text-sm px-3 py-1"
                      >
                        {score}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* Session Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">
                          {session.correctAnswers}/{session.totalQuestions}
                        </p>
                        <p className="text-xs text-muted-foreground">Correct</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {session.totalQuestions - session.correctAnswers}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Incorrect
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {session.timeTaken
                            ? Math.round(session.timeTaken / 60)
                            : 0}
                        </p>
                        <p className="text-xs text-muted-foreground">Mins</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          {session.correctAnswers} of {session.totalQuestions}{" "}
                          correct
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{
                            width: `${
                              (session.correctAnswers /
                                session.totalQuestions) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Individual Results */}
                    <div className="mt-6 space-y-2">
                      <h4 className="text-sm font-semibold mb-3">
                        Questions Detail
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {session.results.map((result: any, idx: number) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border-2 flex items-start justify-between ${
                              result.isCorrect
                                ? "border-green-500/20 bg-green-50 dark:bg-green-950/10"
                                : "border-red-500/20 bg-red-50 dark:bg-red-950/10"
                            }`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {result.isCorrect ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-600" />
                                )}
                                <span className="text-sm font-medium">
                                  {result.quiz.question}
                                </span>
                              </div>
                              {result.quiz.context && (
                                <p className="text-xs text-muted-foreground ml-6 italic">
                                  {result.quiz.context}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground ml-6 mt-1">
                                <span className="font-medium">
                                  {result.word.original}
                                </span>{" "}
                                ({result.word.targetLanguage}) -{" "}
                                <span className="font-medium">
                                  {result.word.translation}
                                </span>
                              </p>
                              {result.timeTaken && (
                                <div className="flex items-center gap-1 mt-1 ml-6 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {result.timeTaken}s
                                </div>
                              )}
                            </div>
                            <Badge
                              variant={
                                result.isCorrect ? "default" : "destructive"
                              }
                              className="ml-3"
                            >
                              {result.isCorrect ? "Correct" : "Incorrect"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}

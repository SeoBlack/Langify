import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, Check, X, ArrowRight } from "lucide-react";
import { Quiz } from "@/lib/types";
import { PracticedWordsSummary } from "./PracticedWordsSummary";

interface QuizInterfaceProps {
  quizzes: Quiz[];
  words: any[];
  currentQuizIndex: number;
  selectedAnswer: string | null;
  isAnswered: boolean;
  score: number;
  quizCompleted: boolean;
  isGenerating: boolean;
  onGenerateQuiz: () => void;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
}

export function QuizInterface({
  quizzes,
  words,
  currentQuizIndex,
  selectedAnswer,
  isAnswered,
  score,
  quizCompleted,
  isGenerating,
  onGenerateQuiz,
  onAnswerSelect,
  onNext,
}: QuizInterfaceProps) {
  const currentQuiz = quizzes[currentQuizIndex];
  const progress =
    quizzes.length > 0 ? ((currentQuizIndex + 1) / quizzes.length) * 100 : 0;

  if (!quizzes.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Brain className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Ready to practice?</h3>
          <p className="text-muted-foreground mb-6 text-center">
            We'll create a personalized quiz from your saved words
          </p>
          <Button onClick={onGenerateQuiz} disabled={isGenerating} size="lg">
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              "Start Quiz"
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
            <p className="text-muted-foreground mb-2">
              Your score:{" "}
              <span className="text-2xl font-bold text-primary">{score}</span> /{" "}
              {quizzes.length}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {score / quizzes.length >= 0.8
                ? "Excellent work! 🎉"
                : score / quizzes.length >= 0.6
                ? "Good job! Keep practicing! 💪"
                : "Keep learning! You'll get better! 📚"}
            </p>
            <Button onClick={onGenerateQuiz} disabled={isGenerating}>
              Take Another Quiz
            </Button>
          </CardContent>
        </Card>

        {/* Practiced Words Summary */}
        <PracticedWordsSummary words={words} quizzes={quizzes} />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle>
            Question {currentQuizIndex + 1} of {quizzes.length}
          </CardTitle>
          <div className="text-sm font-medium">
            Score: <span className="text-primary">{score}</span> /{" "}
            {currentQuizIndex + (isAnswered ? 1 : 0)}
          </div>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question Type Indicator */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
            {currentQuiz.type === "multiple_choice" && "Choose Translation"}
            {currentQuiz.type === "definition" && "Choose Definition"}
            {currentQuiz.type === "fill_blank" && "Fill in the Blank"}
          </div>
        </div>

        {/* Question */}
        <div className="p-6 rounded-lg bg-accent/50">
          <p className="text-lg font-medium">{currentQuiz.question}</p>
          {currentQuiz.context && (
            <p className="text-sm text-muted-foreground mt-2 italic">
              {currentQuiz.context}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-2">
          {currentQuiz.options.map((option, index) => {
            const isCorrect = option === currentQuiz.correctAnswer;
            const isSelected = option === selectedAnswer;

            let buttonClass =
              "p-4 rounded-lg border-2 transition-all text-left hover:border-primary";

            if (isAnswered) {
              if (isSelected && isCorrect) {
                buttonClass +=
                  " border-green-500 bg-green-50 dark:bg-green-950/20";
              } else if (isSelected && !isCorrect) {
                buttonClass += " border-red-500 bg-red-50 dark:bg-red-950/20";
              } else if (isCorrect) {
                buttonClass +=
                  " border-green-500 bg-green-50 dark:bg-green-950/20";
              } else {
                buttonClass += " opacity-50";
              }
            } else {
              buttonClass += isSelected
                ? " border-primary bg-primary/10"
                : " border-border";
            }

            return (
              <button
                key={index}
                onClick={() => onAnswerSelect(option)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {isAnswered &&
                    isSelected &&
                    (isCorrect ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-600" />
                    ))}
                  {isAnswered && !isSelected && isCorrect && (
                    <Check className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <Button onClick={onNext} className="w-full" size="lg">
            {currentQuizIndex < quizzes.length - 1 ? (
              <>
                Next Question
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              "Finish Quiz"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

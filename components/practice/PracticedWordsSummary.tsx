import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp } from "lucide-react";
import { Word } from "@/lib/types";

interface PracticedWordsSummaryProps {
  words: Word[];
  quizzes: any[];
}

export function PracticedWordsSummary({
  words,
  quizzes,
}: PracticedWordsSummaryProps) {
  if (!words || words.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5" />
          Words Practiced
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {words.map((word, index) => {
            const quiz = quizzes[index];
            const masteryLevel = word.masteryLevel || 0;

            return (
              <div
                key={word.id}
                className="flex items-center justify-between p-4 rounded-lg bg-accent/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-lg">{word.original}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {word.sourceLanguage}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-1">
                    {word.translation}
                  </p>
                  {word.context && (
                    <p className="text-sm text-muted-foreground italic">
                      "{word.context}"
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  {/* Mastery Level Progress */}
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm font-medium">
                      Level {masteryLevel}
                    </div>
                  </div>

                  {/* Circular Progress Bar */}
                  <div className="relative w-8 h-8">
                    <svg
                      className="w-8 h-8 transform -rotate-90"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-muted-foreground/20"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 8}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 8 * (1 - masteryLevel / 100)
                        }`}
                        className="text-primary transition-all duration-300"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {masteryLevel}
                      </span>
                    </div>
                  </div>

                  {/* Practice Stats */}
                  <div className="text-xs text-muted-foreground text-center">
                    <div>XP: {word.xpPoints || 0}</div>
                    <div className="mt-1">
                      Correct: {word.correctCount || 0}
                    </div>
                    <div>
                      Total:{" "}
                      {(word.correctCount || 0) + (word.incorrectCount || 0)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t text-sm text-muted-foreground text-center">
          Keep practicing these words to improve your mastery level!
        </div>
      </CardContent>
    </Card>
  );
}

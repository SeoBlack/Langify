import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Word } from "@/lib/types";

interface TopWordsProps {
  words: Word[];
}

export function TopWords({ words }: TopWordsProps) {
  const getMasteryColor = (level: number) => {
    const colors = [
      "bg-gray-500",
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ];
    return colors[level] || "bg-gray-500";
  };

  const topWords = words
    ?.sort(
      (a, b) =>
        (b.masteryLevel || 0) - (a.masteryLevel || 0) ||
        (b.correctCount || 0) - (a.correctCount || 0)
    )
    .slice(0, 5);

  if (!topWords || topWords.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Words</CardTitle>
          <CardDescription>Your most mastered vocabulary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No words yet. Start adding vocabulary!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Words</CardTitle>
        <CardDescription>Your most mastered vocabulary</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topWords.map((word, index) => (
            <div
              key={word.id}
              className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
            >
              <div className="flex items-center gap-3">
                <div className="text-xl font-bold text-muted-foreground">
                  #{index + 1}
                </div>
                <div>
                  <p className="font-medium">{word.original}</p>
                  <p className="text-sm text-muted-foreground">
                    {word.translation}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`inline-block px-2 py-1 rounded text-xs text-white ${getMasteryColor(
                    word.masteryLevel || 0
                  )}`}
                >
                  Level {word.masteryLevel || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {word.correctCount || 0} correct
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

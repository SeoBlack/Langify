import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { Word } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface RecentlyPracticedProps {
  words: Word[];
}

export function RecentlyPracticed({ words }: RecentlyPracticedProps) {
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

  const recentlyPracticed = words
    ?.filter((w) => w.lastPracticed)
    .sort(
      (a, b) =>
        new Date(b.lastPracticed!).getTime() -
        new Date(a.lastPracticed!).getTime()
    )
    .slice(0, 5);

  if (!recentlyPracticed || recentlyPracticed.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recently Practiced</CardTitle>
          <CardDescription>
            Words you've practiced most recently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No practice history yet. Take a quiz!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Practiced</CardTitle>
        <CardDescription>Words you've practiced most recently</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentlyPracticed.map((word) => (
            <div
              key={word.id}
              className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
            >
              <div>
                <p className="font-medium">{word.original}</p>
                <p className="text-sm text-muted-foreground">
                  {word.translation}
                </p>
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
                  {word.lastPracticed
                    ? formatDate(new Date(word.lastPracticed))
                    : "Never"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

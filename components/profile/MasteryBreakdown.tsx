import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Stats } from "@/lib/types";

interface MasteryBreakdownProps {
  stats: Stats;
}

export function MasteryBreakdown({ stats }: MasteryBreakdownProps) {
  const getMasteryLabel = (level: number) => {
    const labels = [
      "New",
      "Learning",
      "Familiar",
      "Proficient",
      "Advanced",
      "Mastered",
    ];
    return labels[level] || "Unknown";
  };

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mastery Breakdown</CardTitle>
        <CardDescription>
          Distribution of word proficiency levels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.masteryBreakdown && stats.masteryBreakdown.length > 0 ? (
          <>
            {stats.masteryBreakdown
              .sort((a, b) => b.level - a.level)
              .map((item) => (
                <div key={item.level} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${getMasteryColor(
                          item.level
                        )}`}
                      />
                      <span className="font-medium">
                        {getMasteryLabel(item.level)}
                      </span>
                      <span className="text-muted-foreground">
                        (Level {item.level})
                      </span>
                    </div>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                  <Progress
                    value={(item.count / (stats.totalWords || 1)) * 100}
                    className="h-2"
                  />
                </div>
              ))}
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No mastery data yet. Start practicing!
          </div>
        )}
      </CardContent>
    </Card>
  );
}

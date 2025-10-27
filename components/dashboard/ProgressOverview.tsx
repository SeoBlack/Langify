import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Stats } from "@/lib/types";

interface ProgressOverviewProps {
  stats: Stats;
}

export function ProgressOverview({ stats }: ProgressOverviewProps) {
  const masteryProgress = stats.totalWords
    ? (stats.masteredWords / stats.totalWords) * 100
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Overall mastery level</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Mastery Progress</span>
            <span className="text-sm text-muted-foreground">
              {stats.masteredWords || 0} / {stats.totalWords || 0}
            </span>
          </div>
          <Progress value={masteryProgress} className="h-2" />
        </div>

        {stats.masteryBreakdown && stats.masteryBreakdown.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Mastery Breakdown</p>
            {stats.masteryBreakdown.map((item) => (
              <div key={item.level} className="flex items-center gap-2">
                <div className="w-20 text-sm text-muted-foreground">
                  Level {item.level}
                </div>
                <Progress
                  value={(item.count / (stats.totalWords || 1)) * 100}
                  className="h-2"
                />
                <div className="w-12 text-sm text-right">{item.count}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

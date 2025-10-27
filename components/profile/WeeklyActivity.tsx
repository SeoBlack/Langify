import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, BookOpen, TrendingUp } from "lucide-react";
import { Stats } from "@/lib/types";

interface WeeklyActivityProps {
  stats: Stats;
}

export function WeeklyActivity({ stats }: WeeklyActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>
          Your practice stats for the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Practice Sessions</p>
                <p className="text-xs text-muted-foreground">
                  Total sessions completed
                </p>
              </div>
            </div>
            <div className="text-2xl font-bold">
              {stats.weeklyStats?.totalSessions || 0}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Words Practiced</p>
                <p className="text-xs text-muted-foreground">
                  Unique words reviewed
                </p>
              </div>
            </div>
            <div className="text-2xl font-bold">
              {stats.weeklyStats?.totalWords || 0}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Study Time</p>
                <p className="text-xs text-muted-foreground">
                  Minutes spent learning
                </p>
              </div>
            </div>
            <div className="text-2xl font-bold">
              {stats.weeklyStats?.totalMinutes || 0}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

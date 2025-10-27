import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trophy, Flame, TrendingUp } from "lucide-react";
import { Stats } from "@/lib/types";

interface StatsCardsProps {
  stats: Stats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const masteryProgress = stats.totalWords
    ? (stats.masteredWords / stats.totalWords) * 100
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Words</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalWords || 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.weeklyStats?.totalWords || 0} this week
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mastered</CardTitle>
          <Trophy className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.masteredWords || 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {masteryProgress.toFixed(0)}% mastery rate
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          <Flame className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.streak || 0}</div>
          <p className="text-xs text-muted-foreground mt-1">days in a row</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.weeklyStats?.totalSessions || 0}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            practice sessions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { Stats } from "@/lib/types";

interface AchievementsProps {
  stats: Stats;
}

export function Achievements({ stats }: AchievementsProps) {
  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
          Achievements & Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-semibold text-sm">Vocabulary Builder</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.totalWords || 0} words
            </div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
            <div className="text-3xl mb-2">🔥</div>
            <div className="font-semibold text-sm">Streak Master</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.streak || 0} days
            </div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
            <div className="text-3xl mb-2">🏆</div>
            <div className="font-semibold text-sm">Word Master</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.masteredWords || 0} mastered
            </div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
            <div className="text-3xl mb-2">💪</div>
            <div className="font-semibold text-sm">Practice Hero</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.weeklyStats?.totalSessions || 0} sessions
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

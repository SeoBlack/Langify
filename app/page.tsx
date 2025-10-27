"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user-store";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProgressOverview } from "@/components/dashboard/ProgressOverview";
import { RecentWords } from "@/components/dashboard/RecentWords";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { getGreeting } from "@/lib/utils";
import { useStats, useRecentWords } from "@/hooks/use-data";

export default function DashboardPage() {
  const { user } = useUserStore();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  const { data: stats, isLoading: statsLoading } = useStats(user?.id);
  const { data: recentWords } = useRecentWords(user?.id, 5);

  return (
    <AuthGuard>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {greeting}, {user?.name || "there"}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Keep up your learning streak and master new words every day
          </p>
        </div>

        {/* Stats Cards */}
        {stats?.stats && <StatsCards stats={stats.stats} />}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Progress Overview */}
          {stats?.stats && <ProgressOverview stats={stats.stats} />}

          {/* Recent Words */}
          <RecentWords words={recentWords?.words || []} />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </AuthGuard>
  );
}

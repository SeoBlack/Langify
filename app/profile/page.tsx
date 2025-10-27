"use client";

import { useUserStore } from "@/store/user-store";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { StatsGrid } from "@/components/profile/StatsGrid";
import { MasteryBreakdown } from "@/components/profile/MasteryBreakdown";
import { WeeklyActivity } from "@/components/profile/WeeklyActivity";
import { TopWords } from "@/components/profile/TopWords";
import { RecentlyPracticed } from "@/components/profile/RecentlyPracticed";
import { Achievements } from "@/components/profile/Achievements";
import { ProfileSettings } from "@/components/profile/ProfileSettings";
import { PasswordChange } from "@/components/profile/PasswordChange";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useStats, useWords } from "@/hooks/use-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, BarChart3 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useUserStore();

  const { data: stats, isLoading: statsLoading } = useStats(user?.id);
  const { data: words } = useWords(user?.id);

  return (
    <AuthGuard>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Profile & Stats
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your learning progress and manage your account
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Profile Card */}
            {user && <ProfileCard user={user} />}

            {/* Stats Grid */}
            {stats?.stats && <StatsGrid stats={stats.stats} />}

            <div className="grid gap-6 md:grid-cols-2">
              {/* Mastery Breakdown */}
              {stats?.stats && <MasteryBreakdown stats={stats.stats} />}

              {/* Weekly Activity */}
              {stats?.stats && <WeeklyActivity stats={stats.stats} />}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Top Words */}
              <TopWords words={words?.words || []} />

              {/* Recently Practiced */}
              <RecentlyPracticed words={words?.words || []} />
            </div>

            {/* Achievements */}
            {stats?.stats && <Achievements stats={stats.stats} />}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ProfileSettings />
              <PasswordChange />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthGuard>
  );
}

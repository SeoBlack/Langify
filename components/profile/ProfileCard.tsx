import { Card, CardContent } from "@/components/ui/card";
import { Target, Calendar } from "lucide-react";
import { User } from "@/lib/types";

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0) || "L"}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">
              {user?.name || "Language Learner"}
            </h2>
            <p className="text-muted-foreground mb-4">{user?.email}</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Learning{" "}
                  <span className="font-semibold">
                    {user?.targetLanguage || "Spanish"}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Member since <span className="font-semibold">2024</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

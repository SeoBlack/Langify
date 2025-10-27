import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Continue your learning journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/translate" className="group">
            <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-primary">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    Add Words
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Translate & save
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/practice" className="group">
            <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-primary">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Brain className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    Practice
                  </h3>
                  <p className="text-sm text-muted-foreground">Take a quiz</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

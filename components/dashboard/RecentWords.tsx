import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Word } from "@/lib/types";

interface RecentWordsProps {
  words: Word[];
}

export function RecentWords({ words }: RecentWordsProps) {
  if (!words || words.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recently Added</CardTitle>
          <CardDescription>Your latest vocabulary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">No words yet</p>
            <Link href="/translate">
              <Button variant="link" className="mt-2">
                Add your first word
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Added</CardTitle>
        <CardDescription>Your latest vocabulary</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {words.map((word) => (
            <div
              key={word.id}
              className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
            >
              <div>
                <p className="font-medium">{word.original}</p>
                <p className="text-sm text-muted-foreground">
                  {word.translation}
                </p>
              </div>
              <div className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                {word.category?.name || "Uncategorized"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

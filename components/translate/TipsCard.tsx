import { Card, CardContent } from "@/components/ui/card";

export function TipsCard() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-2">💡 Pro Tips</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>
            • Words are automatically categorized using AI for better
            organization
          </li>
          <li>• Each word is saved with context to help you remember usage</li>
          <li>• Practice your saved words in the Practice section</li>
          <li>• Build your vocabulary consistently for better retention</li>
        </ul>
      </CardContent>
    </Card>
  );
}

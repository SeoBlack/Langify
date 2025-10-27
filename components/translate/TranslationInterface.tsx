import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2, Bookmark } from "lucide-react";
import { TranslationResult } from "@/lib/types";

interface TranslationInterfaceProps {
  word: string;
  onWordChange: (word: string) => void;
  onTranslate: () => void;
  onClear: () => void;
  translationResult: TranslationResult | null;
  isTranslating: boolean;
  addToPractice: boolean;
  onAddToPracticeChange: (value: boolean) => void;
}

export function TranslationInterface({
  word,
  onWordChange,
  onTranslate,
  onClear,
  translationResult,
  isTranslating,
  addToPractice,
  onAddToPracticeChange,
}: TranslationInterfaceProps) {
  const { toast } = useToast();

  const handleTranslate = () => {
    if (!word.trim()) {
      toast({
        title: "Error",
        description: "Please enter a word to translate",
        variant: "destructive",
      });
      return;
    }
    onTranslate();
  };

  return (
    <div className="grid md:grid-cols-2 divide-x">
      {/* Source Text */}
      <div className="p-6">
        <Textarea
          placeholder="Type a word or phrase..."
          value={word}
          onChange={(e) => onWordChange(e.target.value)}
          disabled={isTranslating}
          className="min-h-[200px] text-lg border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
        />

        {/* Add to Practice Toggle */}
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            id="add-to-practice"
            checked={addToPractice}
            onCheckedChange={onAddToPracticeChange}
            disabled={isTranslating}
          />
          <Label htmlFor="add-to-practice" className="text-sm font-medium">
            Add to practice
          </Label>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <span className="text-sm text-muted-foreground">
            {word.length} / 500 characters
          </span>
          <div className="flex gap-2">
            {word && (
              <Button onClick={onClear} variant="ghost" size="sm">
                Clear
              </Button>
            )}
            <Button
              onClick={handleTranslate}
              disabled={isTranslating || !word.trim()}
              size="sm"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Translating...
                </>
              ) : (
                "Translate"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Translation Result */}
      <div className="p-6 bg-accent/20">
        {isTranslating ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : translationResult ? (
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-semibold mb-4 leading-relaxed">
                {translationResult.translation}
              </div>

              {translationResult.word.context && (
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    💡 {translationResult.word.context}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                {addToPractice ? (
                  <>
                    <Bookmark className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      Saved to practice list
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">
                      Translation only
                    </span>
                  </>
                )}
              </div>
              <Button onClick={onClear} variant="outline" size="sm">
                New Translation
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[200px] text-muted-foreground">
            <div className="text-center">
              <ArrowRight className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Translation will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

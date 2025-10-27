import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, Clock, ArrowRight, Trash2 } from "lucide-react";
import { Word } from "@/lib/types";
import { useDeleteWord } from "@/hooks/use-delete-word";
import { DeleteConfirmationModal } from "@/components/ui/delete-confirmation-modal";

interface TranslationHistoryProps {
  words: Word[];
  onSelectTranslation: (word: Word) => void;
  isLoading?: boolean;
}

export function TranslationHistory({
  words,
  onSelectTranslation,
  isLoading = false,
}: TranslationHistoryProps) {
  const [showAll, setShowAll] = useState(false);
  const [wordToDelete, setWordToDelete] = useState<string | null>(null);
  const deleteWordMutation = useDeleteWord();

  const handleDeleteWord = (wordId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWordToDelete(wordId);
  };

  const handleConfirmDelete = () => {
    if (wordToDelete) {
      deleteWordMutation.mutate(wordToDelete);
      setWordToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setWordToDelete(null);
  };

  const displayWords = showAll ? words : words.slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const getLanguageFlag = (languageCode: string) => {
    const flags: { [key: string]: string } = {
      en: "🇺🇸",
      es: "🇪🇸",
      fr: "🇫🇷",
      de: "🇩🇪",
      it: "🇮🇹",
      pt: "🇵🇹",
      ru: "🇷🇺",
      ja: "🇯🇵",
      ko: "🇰🇷",
      zh: "🇨🇳",
      ar: "🇸🇦",
      hi: "🇮🇳",
    };
    return flags[languageCode] || "🌐";
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5" />
            Recent Translations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!words.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5" />
            Recent Translations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No translations yet</p>
            <p className="text-xs">Your recent translations will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <History className="h-5 w-5" />
          Recent Translations
          <Badge variant="secondary" className="ml-auto">
            {words.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayWords.map((word) => (
            <div
              key={word.id}
              className="group p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => onSelectTranslation(word)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground truncate">
                      {word.original}
                    </span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground truncate">
                      {word.translation}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      {getLanguageFlag(word.sourceLanguage)}
                      <span className="uppercase">{word.sourceLanguage}</span>
                    </div>
                    <ArrowRight className="h-3 w-3" />
                    <div className="flex items-center gap-1">
                      {getLanguageFlag(word.targetLanguage)}
                      <span className="uppercase">{word.targetLanguage}</span>
                    </div>
                  </div>

                  {word.context && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      💡 {word.context}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(word.createdAt)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleDeleteWord(word.id, e)}
                    disabled={deleteWordMutation.isPending}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {words.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="w-full mt-2"
            >
              {showAll ? "Show Less" : `Show All ${words.length} Translations`}
            </Button>
          )}
        </div>
      </CardContent>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={wordToDelete !== null}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isLoading={deleteWordMutation.isPending}
      />
    </Card>
  );
}

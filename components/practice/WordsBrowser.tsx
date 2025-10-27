import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Filter, Trash2 } from "lucide-react";
import { Word } from "@/lib/types";
import { useState } from "react";
import { useDeleteWord } from "@/hooks/use-delete-word";
import { DeleteConfirmationModal } from "@/components/ui/delete-confirmation-modal";

interface WordsBrowserProps {
  words: Word[];
  isLoading?: boolean;
}

export function WordsBrowser({ words, isLoading }: WordsBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "mastery">(
    "newest"
  );
  const [wordToDelete, setWordToDelete] = useState<string | null>(null);

  const deleteWordMutation = useDeleteWord();

  const handleDeleteWord = (wordId: string) => {
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

  // Filter and sort words
  const filteredWords = words
    .filter(
      (word) =>
        word.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "mastery":
          return (b.masteryLevel || 0) - (a.masteryLevel || 0);
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (!words || words.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Words</CardTitle>
          <CardDescription>
            Browse through your saved vocabulary
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No words yet</h3>
            <p className="text-muted-foreground mb-6">
              Start translating words to build your vocabulary
            </p>
            <Button asChild>
              <a href="/translate">Start Translating</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Words</CardTitle>
        <CardDescription>
          Browse through your saved vocabulary ({words.length} words)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "newest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("newest")}
            >
              Newest
            </Button>
            <Button
              variant={sortBy === "oldest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("oldest")}
            >
              Oldest
            </Button>
            <Button
              variant={sortBy === "mastery" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("mastery")}
            >
              Mastery
            </Button>
          </div>
        </div>

        {/* Words List */}
        <div className="space-y-3">
          {filteredWords.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No words match your search
              </p>
            </div>
          ) : (
            filteredWords.map((word) => (
              <div
                key={word.id}
                className="flex items-center justify-between p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold text-lg">{word.original}</p>
                    <Badge variant="secondary" className="text-xs">
                      {word.sourceLanguage}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {word.translation}
                  </p>
                  {word.context && (
                    <p className="text-sm text-muted-foreground italic">
                      "{word.context}"
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    {word.masteryLevel !== undefined && (
                      <div className="relative w-10 h-10">
                        <svg
                          className="w-10 h-10 transform -rotate-90"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="text-muted-foreground/20"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 10}`}
                            strokeDashoffset={`${
                              2 * Math.PI * 10 * (1 - word.masteryLevel / 100)
                            }`}
                            className="text-primary transition-all duration-300"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {word.masteryLevel}
                          </span>
                        </div>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWord(word.id);
                      }}
                      disabled={deleteWordMutation.isPending}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Results Summary */}
        {searchTerm && (
          <div className="text-sm text-muted-foreground text-center pt-4 border-t">
            Showing {filteredWords.length} of {words.length} words
          </div>
        )}
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

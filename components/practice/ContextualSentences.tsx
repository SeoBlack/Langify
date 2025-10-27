import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import {
  Word,
  ContextualSentence,
  ContextualSentenceRequest,
} from "@/lib/types";

interface ContextualSentencesProps {
  words: Word[];
  onGenerateQuiz: () => void;
  isGeneratingQuiz: boolean;
}

export function ContextualSentences({
  words,
  onGenerateQuiz,
  isGeneratingQuiz,
}: ContextualSentencesProps) {
  const { toast } = useToast();
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [contextualSentence, setContextualSentence] =
    useState<ContextualSentence | null>(null);

  const generateSentenceMutation = useMutation({
    mutationFn: async (word: Word) => {
      const res = await fetch("/api/contextual-sentence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: word.original,
          translation: word.translation,
          targetLanguage: word.targetLanguage,
        } as ContextualSentenceRequest),
      });

      if (!res.ok) throw new Error("Failed to generate sentence");
      return res.json();
    },
    onSuccess: (data) => {
      setContextualSentence(data);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate contextual sentence",
        variant: "destructive",
      });
    },
  });

  const handleGenerateSentence = (word: Word) => {
    setSelectedWord(word);
    generateSentenceMutation.mutate(word);
  };

  if (words.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Generate Contextual Sentences
          </CardTitle>
          <CardDescription>
            See how words are used in real sentences with AI-generated examples
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Generate a quiz first to see words for contextual sentences
            </p>
            <Button onClick={onGenerateQuiz} disabled={isGeneratingQuiz}>
              Generate Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Generate Contextual Sentences
        </CardTitle>
        <CardDescription>
          See how words are used in real sentences with AI-generated examples
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {words.map((word) => (
            <button
              key={word.id}
              onClick={() => handleGenerateSentence(word)}
              disabled={generateSentenceMutation.isPending}
              className={`p-4 rounded-lg border-2 transition-all text-left hover:border-primary ${
                selectedWord?.id === word.id
                  ? "border-primary bg-primary/10"
                  : "border-border"
              }`}
            >
              <div className="font-semibold">{word.original}</div>
              <div className="text-sm text-muted-foreground">
                {word.translation}
              </div>
            </button>
          ))}
        </div>

        {generateSentenceMutation.isPending && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {contextualSentence && !generateSentenceMutation.isPending && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-6 rounded-lg bg-primary/5 border-2 border-primary/20">
              <div className="text-sm text-muted-foreground mb-2">Sentence</div>
              <p className="text-xl font-semibold mb-4">
                {contextualSentence.sentence}
              </p>

              <div className="text-sm text-muted-foreground mb-2">
                Translation
              </div>
              <p className="mb-4">{contextualSentence.translation}</p>

              <div className="text-sm text-muted-foreground mb-2">
                Usage Explanation
              </div>
              <p className="text-sm">{contextualSentence.explanation}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

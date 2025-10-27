import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { TranslationResult, TranslationRequest, Word } from "@/lib/types";

export function useTranslation(userId?: string, userTargetLanguage?: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [word, setWord] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [displayTargetLanguage, setDisplayTargetLanguage] = useState(
    userTargetLanguage || "es"
  );
  const [addToPractice, setAddToPractice] = useState(true);
  const [translationResult, setTranslationResult] =
    useState<TranslationResult | null>(null);

  // Target language for translation is always locked to user's target language
  const targetLanguage = userTargetLanguage || "es";

  // Fetch translation history
  const { data: translationHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["translation-history", userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await fetch(`/api/words?userId=${userId}&limit=20`);
      if (!res.ok) throw new Error("Failed to fetch translation history");
      const data = await res.json();
      return data.words || [];
    },
    enabled: !!userId,
  });

  const translateMutation = useMutation({
    mutationFn: async (data: { word: string; targetLanguage: string }) => {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: data.word,
          targetLanguage: data.targetLanguage,
          sourceLanguage: sourceLanguage,
          userId: userId,
          addToPractice: addToPractice,
        } as TranslationRequest),
      });

      if (!res.ok) throw new Error("Translation failed");
      return res.json();
    },
    onSuccess: (data) => {
      setTranslationResult(data);

      if (addToPractice) {
        queryClient.invalidateQueries({ queryKey: ["recent-words"] });
        queryClient.invalidateQueries({ queryKey: ["stats"] });

        toast({
          title: "Word saved!",
          description: `"${data.word.original}" has been added to your vocabulary`,
        });
      } else {
        toast({
          title: "Translation complete!",
          description: `"${data.word.original}" translated successfully`,
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to translate word. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleTranslate = () => {
    if (!word.trim()) {
      toast({
        title: "Error",
        description: "Please enter a word to translate",
        variant: "destructive",
      });
      return;
    }

    // Use displayTargetLanguage for the actual translation
    translateMutation.mutate({
      word: word.trim(),
      targetLanguage: displayTargetLanguage,
    });
  };

  const handleClear = () => {
    setWord("");
    setTranslationResult(null);
  };

  const handleSwapLanguages = () => {
    // Swap both source and display target languages
    const tempLang = sourceLanguage;
    setSourceLanguage(displayTargetLanguage);
    setDisplayTargetLanguage(tempLang);

    // If there's a translation, swap the text content
    if (translationResult) {
      setWord(translationResult.translation);
      setTranslationResult(null);
    }
  };

  const handleSelectFromHistory = (word: Word) => {
    setWord(word.original);
    setSourceLanguage(word.sourceLanguage);
    setDisplayTargetLanguage(word.targetLanguage);
    setTranslationResult({
      translation: word.translation,
      word: word,
    });
  };

  return {
    // State
    word,
    sourceLanguage,
    targetLanguage: displayTargetLanguage, // Display target can change when swapping
    addToPractice,
    translationResult,
    isTranslating: translateMutation.isPending,
    translationHistory: translationHistory || [],
    isLoadingHistory,

    // Actions
    setWord,
    setSourceLanguage,
    setAddToPractice,
    handleTranslate,
    handleClear,
    handleSwapLanguages,
    handleSelectFromHistory,
  };
}

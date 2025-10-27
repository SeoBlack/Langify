"use client";

import { useUserStore } from "@/store/user-store";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageSelector } from "@/components/translate/LanguageSelector";
import { TranslationInterface } from "@/components/translate/TranslationInterface";
import { TranslationHistory } from "@/components/translate/TranslationHistory";
import { TipsCard } from "@/components/translate/TipsCard";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useTranslation } from "@/hooks/use-translation";

export default function TranslatePage() {
  const { user } = useUserStore();

  const {
    word,
    sourceLanguage,
    targetLanguage,
    addToPractice,
    translationResult,
    isTranslating,
    translationHistory,
    isLoadingHistory,
    setWord,
    setSourceLanguage,
    setAddToPractice,
    handleTranslate,
    handleClear,
    handleSwapLanguages,
    handleSelectFromHistory,
  } = useTranslation(user?.id, user?.targetLanguage);

  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Translate & Learn
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Translate words and save them to your vocabulary
            </p>
          </div>
        </div>

        {/* Translation Interface - Google Translate Style */}
        <Card className="border-2 overflow-hidden">
          <CardContent className="p-0">
            <LanguageSelector
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              userTargetLanguage={user?.targetLanguage || "es"}
              onSourceLanguageChange={setSourceLanguage}
              onSwapLanguages={handleSwapLanguages}
            />
            <TranslationInterface
              word={word}
              onWordChange={setWord}
              onTranslate={handleTranslate}
              onClear={handleClear}
              translationResult={translationResult}
              isTranslating={isTranslating}
              addToPractice={addToPractice}
              onAddToPracticeChange={setAddToPractice}
            />
          </CardContent>
        </Card>

        {/* Translation History */}
        <TranslationHistory
          words={translationHistory}
          onSelectTranslation={handleSelectFromHistory}
          isLoading={isLoadingHistory}
        />

        {/* Tips */}
        <TipsCard />
      </div>
    </AuthGuard>
  );
}

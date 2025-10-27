import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/lib/translate";

interface LanguageSelectorProps {
  sourceLanguage: string;
  targetLanguage: string;
  userTargetLanguage: string;
  onSourceLanguageChange: (language: string) => void;
  onSwapLanguages: () => void;
}

export function LanguageSelector({
  sourceLanguage,
  targetLanguage,
  userTargetLanguage,
  onSourceLanguageChange,
  onSwapLanguages,
}: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2 p-4 border-b bg-accent/30">
      <div className="flex items-center gap-2 flex-1">
        <Select value={sourceLanguage} onValueChange={onSourceLanguageChange}>
          <SelectTrigger className="w-full border-0 bg-transparent font-medium focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">
              <span className="flex items-center gap-2">
                <span>🇺🇸</span>
                <span>English</span>
              </span>
            </SelectItem>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onSwapLanguages}
        className="flex-shrink-0 h-9 w-9 rounded-full hover:bg-accent"
        title="Swap languages"
      >
        <ArrowLeftRight className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2 flex-1">
        <div className="w-full border-0 font-medium px-3 py-2 rounded-md bg-background/50">
          <span className="flex items-center gap-2">
            <span>
              {targetLanguage === "en"
                ? "🇺🇸"
                : SUPPORTED_LANGUAGES.find(
                    (lang) => lang.code === targetLanguage
                  )?.flag || "🌍"}
            </span>
            <span>
              {targetLanguage === "en"
                ? "English"
                : SUPPORTED_LANGUAGES.find(
                    (lang) => lang.code === targetLanguage
                  )?.name || "Target Language"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

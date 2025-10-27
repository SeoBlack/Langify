"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AuthGuard } from "@/components/auth/AuthGuard";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "fi", name: "Finnish", flag: "🇫🇮" },
];

export default function ProfileSetupPage() {
  const { user, token, updateUser } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nativeLanguage || !targetLanguage) {
      toast({
        title: "Missing Information",
        description:
          "Please select both your native language and target language.",
        variant: "destructive",
      });
      return;
    }

    if (nativeLanguage === targetLanguage) {
      toast({
        title: "Invalid Selection",
        description:
          "Your native language and target language must be different.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/profile/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nativeLanguage,
          targetLanguage,
        }),
      });

      const result = await response.json();

      if (result.success) {
        updateUser(result.data.user);
        toast({
          title: "Profile Setup Complete!",
          description: "Your language preferences have been saved.",
        });
        router.push("/");
      } else {
        toast({
          title: "Setup Failed",
          description: result.error || "Failed to complete profile setup.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Profile setup error:", error);
      toast({
        title: "Setup Failed",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard requireProfileSetup={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Complete Your Profile
            </CardTitle>
            <CardDescription>
              Tell us about your language learning goals to personalize your
              experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Native Language</label>
                <Select
                  value={nativeLanguage}
                  onValueChange={setNativeLanguage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your native language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Target Language</label>
                <Select
                  value={targetLanguage}
                  onValueChange={setTargetLanguage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language you want to learn" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Setting up..." : "Complete Setup"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Welcome, {user?.name || user?.email}! 🎉
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}

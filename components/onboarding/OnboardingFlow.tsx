"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, BarChart, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/user-store";
import { useAuth } from "@/hooks/use-auth";

const steps = [
  {
    title: "Welcome to Langy! 🎉",
    description: "Your intelligent language learning companion",
    icon: BookOpen,
    content: (
      <div className="space-y-4">
        <p className="text-lg text-muted-foreground">
          Langy helps you learn languages smarter with AI-powered features:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Smart Translations</p>
              <p className="text-sm text-muted-foreground">
                Get translations with context and save them to your vocabulary
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">AI-Powered Quizzes</p>
              <p className="text-sm text-muted-foreground">
                Practice words with intelligent quiz generation
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Track Your Progress</p>
              <p className="text-sm text-muted-foreground">
                See your learning stats, streaks, and achievements
              </p>
            </div>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "How to Use Langy",
    description: "Your learning journey simplified",
    icon: Brain,
    content: (
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
            <span className="text-2xl">1️⃣</span>
            <div>
              <h3 className="font-semibold mb-1">Translate & Save</h3>
              <p className="text-sm text-muted-foreground">
                Go to the Translate page, enter a word or phrase, and add it to
                your vocabulary with one click.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
            <span className="text-2xl">2️⃣</span>
            <div>
              <h3 className="font-semibold mb-1">Practice Regularly</h3>
              <p className="text-sm text-muted-foreground">
                Generate quizzes from your saved words to reinforce your
                learning. Test yourself and track your progress!
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
            <span className="text-2xl">3️⃣</span>
            <div>
              <h3 className="font-semibold mb-1">Build Your Streak</h3>
              <p className="text-sm text-muted-foreground">
                Keep learning daily to build your streak. The longer your
                streak, the more you learn!
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Features You'll Love",
    description: "Everything you need to master a new language",
    icon: BarChart,
    content: (
      <div className="grid gap-4">
        <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
          <h3 className="font-semibold mb-2">📚 Vocabulary Library</h3>
          <p className="text-sm text-muted-foreground">
            Save and organize words in your personal vocabulary. Categorize them
            for better learning.
          </p>
        </div>
        <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
          <h3 className="font-semibold mb-2">🧠 Intelligent Quizzes</h3>
          <p className="text-sm text-muted-foreground">
            AI generates questions based on your saved words. Adaptive learning
            that grows with you.
          </p>
        </div>
        <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
          <h3 className="font-semibold mb-2">📊 Progress Tracking</h3>
          <p className="text-sm text-muted-foreground">
            Monitor your mastery levels, streaks, and achievements. See how far
            you've come!
          </p>
        </div>
        <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
          <h3 className="font-semibold mb-2">💡 Context & Examples</h3>
          <p className="text-sm text-muted-foreground">
            Learn words in context with example sentences. Better understanding
            leads to better retention.
          </p>
        </div>
      </div>
    ),
  },
];

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const { token, updateUser } = useUserStore();
  const { getCurrentUser } = useAuth();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      const response = await fetch("/api/auth/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Update the store directly with the returned user data
        if (result.data) {
          updateUser(result.data);
        } else {
          // Fallback: refresh user data
          await getCurrentUser();
        }

        toast({
          title: "Welcome to Langy!",
          description: "Let's start your language learning journey",
        });
        onComplete();
      } else {
        throw new Error(result.error || "Failed to complete onboarding");
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index <= currentStep ? "bg-primary w-8" : "bg-muted w-2"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <Card className="p-8">
          <div key={currentStep} className="animate-fade-in">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <Icon className="h-12 w-12 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {currentStepData.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {currentStepData.description}
              </p>
            </div>

            <div className="mb-8">{currentStepData.content}</div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex-1"
              >
                Previous
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1"
              disabled={isCompleting}
            >
              {isCompleting
                ? "Loading..."
                : currentStep === steps.length - 1
                ? "Get Started! 🚀"
                : "Next"}
            </Button>
          </div>

          {/* Skip Link */}
          <div className="text-center mt-4">
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip onboarding
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

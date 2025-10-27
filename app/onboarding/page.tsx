"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export default function OnboardingPage() {
  const { user, isAuthenticated, isLoading } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Redirect to auth if not authenticated
      if (!isAuthenticated) {
        router.push("/auth");
      }
      // Redirect to translate if onboarding already completed
      else if (user?.onboardingCompleted) {
        router.push("/translate");
      }
    }
  }, [user, isAuthenticated, isLoading, router]);

  // Show loading state
  if (isLoading || !user || user.onboardingCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleComplete = () => {
    // Redirect to translate page
    router.push("/translate");
  };

  return <OnboardingFlow onComplete={handleComplete} />;
}

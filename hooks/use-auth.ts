import { useState } from "react";
import { useUserStore } from "@/store/user-store";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  targetLanguage?: string;
}

interface AuthResponse {
  success: boolean;
  data?: {
    user: any;
    token: string;
  };
  error?: string;
}

export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    setLoading,
    updateUser,
  } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (
    url: string,
    data: LoginData | RegisterData
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success && result.data) {
        login(result.data.user, result.data.token);
        return result;
      } else {
        setError(result.error || "Authentication failed");
        return result;
      }
    } catch (err) {
      const errorMessage = "Network error. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const signIn = async (data: LoginData) => {
    return handleAuth("/api/auth/login", data);
  };

  const signUp = async (data: RegisterData) => {
    return handleAuth("/api/auth/register", data);
  };

  const signOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      logout();
    }
  };

  const getCurrentUser = async () => {
    if (!token) return null;

    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        // Update the store with the fresh user data
        updateUser(result.data);
        return result.data;
      } else {
        logout();
        return null;
      }
    } catch (err) {
      console.error("Get current user error:", err);
      logout();
      return null;
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    getCurrentUser,
    clearError: () => setError(null),
  };
}

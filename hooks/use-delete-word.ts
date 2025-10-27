import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function useDeleteWord() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (wordId: string) => {
      const res = await fetch(`/api/words?wordId=${wordId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete word");
      }
      return res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch words data
      queryClient.invalidateQueries({ queryKey: ["words"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });

      toast({
        title: "Word deleted",
        description: "The word has been removed from your vocabulary",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

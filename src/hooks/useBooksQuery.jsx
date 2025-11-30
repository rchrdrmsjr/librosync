import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/lib/api";
import { getErrorMessage, isNetworkError } from "@/lib/api";
import { API_CONFIG } from "@/lib/constants";

/**
 * React Query hook for fetching books
 * @returns {Object} Query result with books, loading, error states
 */
export const useBooksQuery = () => {
  const query = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
    retry: (failureCount, error) => {
      // Don't retry on network errors after max attempts
      if (isNetworkError(error)) {
        return failureCount < API_CONFIG.RETRY_ATTEMPTS;
      }
      return failureCount < API_CONFIG.RETRY_ATTEMPTS;
    },
    retryDelay: (attemptIndex) =>
      Math.min(API_CONFIG.RETRY_DELAY * 2 ** attemptIndex, 10000),
  });

  return {
    books: query.data || [],
    loading: query.isLoading,
    error: query.error ? getErrorMessage(query.error) : null,
    isError: query.isError,
    refetch: query.refetch,
  };
};


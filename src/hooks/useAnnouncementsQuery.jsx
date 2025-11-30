import { useQuery } from "@tanstack/react-query";
import { fetchAnnouncements } from "@/lib/api";
import { getErrorMessage, isNetworkError } from "@/lib/api";
import { API_CONFIG } from "@/lib/constants";

/**
 * React Query hook for fetching announcements
 * @returns {Object} Query result with announcements, loading, error states
 */
export const useAnnouncementsQuery = () => {
  const query = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
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
    announcements: query.data || [],
    loading: query.isLoading,
    error: query.error ? getErrorMessage(query.error) : null,
    isError: query.isError,
    refetch: query.refetch,
  };
};


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CACHE_TIME } from "@/lib/constants";

/**
 * QueryClient configuration with optimized defaults
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TIME.STALE_TIME,
      gcTime: CACHE_TIME.MEDIUM, // Previously cacheTime
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

/**
 * QueryProvider component to wrap the app
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} QueryProvider component
 */
const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
export { queryClient };


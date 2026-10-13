"use client";

import {
  environmentManager,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ApiError } from "@/lib/api/api-error";
import { clientLogger } from "@/lib/logger/client";

function logApiError(error: Error, source: "query" | "mutation") {
  if (error instanceof ApiError) {
    const context = {
      source,
      status: error.status,
      requestId: error.requestId,
      message: error.message,
    };
    if (error.status >= 500) {
      clientLogger.error("API request failed", context);
    } else {
      clientLogger.warn("API request rejected", context);
    }
    return;
  }
  clientLogger.error("Unexpected error", { source, message: error.message });
}

function shouldRetry(failureCount: number, error: Error) {
  // Don't retry client errors (400, 401, 403, 404...), since they won't fix themselves
  if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
    return false;
  }
  return failureCount < 2;
}

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => logApiError(error, "query"),
    }),
    mutationCache: new MutationCache({
      onError: (error) => logApiError(error, "mutation"),
    }),
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        retry: shouldRetry,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (environmentManager.isServer()) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

type Props = {
  children: React.ReactNode;
};

export default function TanstackQueryProvider({ children }: Readonly<Props>) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

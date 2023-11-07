const USE_QUERY_DEFAULTS = {
  cacheTime: 60 * 60 * 1000,
  enabled: true,
  refetchInterval: 5 * 60 * 1000,
  refetchIntervalInBackground: true,
  refetchOnReconnect: true,
  refetchOnWindowFocus: false,
  retry: false,
  suspense: true,
  useErrorBoundary: true,
};

export const USE_QUERY_CONSTANTS = {
  defaults: USE_QUERY_DEFAULTS,
};

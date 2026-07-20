import { useGetReportsAnalyticsQuery } from '../services/reportApi';

export function useReports() {
  const { data: analytics, isLoading, isError, refetch } = useGetReportsAnalyticsQuery();

  return {
    analytics,
    isLoading,
    isError,
    refetch,
  };
}

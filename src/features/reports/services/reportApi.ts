import { baseApi } from '../../../services/baseApi';
import { ReportsAnalyticsData } from '../types/report.types';
import { mockReportsAnalytics } from '../mock/reports.mock';

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportsAnalytics: builder.query<ReportsAnalyticsData, void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 300));
        return { data: mockReportsAnalytics };
      },
      providesTags: ['Metrics'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetReportsAnalyticsQuery } = reportApi;

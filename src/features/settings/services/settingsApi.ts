import { baseApi } from '../../../services/baseApi';
import { ApplicationSettings, ActiveSession } from '../types/settings.types';
import { mockDefaultSettings, mockActiveSessions } from '../mock/settings.mock';

let settingsStore: ApplicationSettings = { ...mockDefaultSettings };
let sessionsStore: ActiveSession[] = [...mockActiveSessions];

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationSettings: builder.query<ApplicationSettings, void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 200));
        return { data: settingsStore };
      },
      providesTags: ['Settings'],
    }),

    updateApplicationSettings: builder.mutation<ApplicationSettings, Partial<ApplicationSettings>>({
      queryFn: async (patch) => {
        await new Promise((res) => setTimeout(res, 300));
        settingsStore = {
          ...settingsStore,
          ...patch,
          profile: { ...settingsStore.profile, ...patch.profile },
          security: { ...settingsStore.security, ...patch.security },
          appearance: { ...settingsStore.appearance, ...patch.appearance },
          notifications: { ...settingsStore.notifications, ...patch.notifications },
          preferences: { ...settingsStore.preferences, ...patch.preferences },
        };
        return { data: settingsStore };
      },
      invalidatesTags: ['Settings'],
    }),

    getActiveSessions: builder.query<ActiveSession[], void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 200));
        return { data: sessionsStore };
      },
      providesTags: ['Settings'],
    }),

    terminateSessionById: builder.mutation<{ success: boolean; id: string }, string>({
      queryFn: async (id) => {
        await new Promise((res) => setTimeout(res, 300));
        sessionsStore = sessionsStore.filter((s) => s.id !== id);
        return { data: { success: true, id } };
      },
      invalidatesTags: ['Settings'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetApplicationSettingsQuery,
  useUpdateApplicationSettingsMutation,
  useGetActiveSessionsQuery,
  useTerminateSessionByIdMutation,
} = settingsApi;

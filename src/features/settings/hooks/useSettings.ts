import {
  useGetApplicationSettingsQuery,
  useUpdateApplicationSettingsMutation,
  useGetActiveSessionsQuery,
  useTerminateSessionByIdMutation,
} from '../services/settingsApi';

export function useSettings() {
  const { data: settings, isLoading, isError, refetch } = useGetApplicationSettingsQuery();
  const { data: activeSessions = [] } = useGetActiveSessionsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateApplicationSettingsMutation();
  const [terminateSession, { isLoading: isTerminating }] = useTerminateSessionByIdMutation();

  return {
    settings,
    activeSessions,
    isLoading,
    isError,
    refetch,
    updateSettings,
    isUpdating,
    terminateSession,
    isTerminating,
  };
}

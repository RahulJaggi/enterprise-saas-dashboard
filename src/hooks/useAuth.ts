import { useAppSelector } from './useAppDispatch';

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    role: user?.role,
    permissions: user?.permissions,
  };
};

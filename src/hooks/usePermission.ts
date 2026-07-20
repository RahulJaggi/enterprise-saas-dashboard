import { useAuth } from './useAuth';
import { UserPermissions } from '../types';

export const usePermission = () => {
  const { user } = useAuth();

  const hasPermission = <
    K extends keyof UserPermissions,
    P extends keyof UserPermissions[K]
  >(
    module: K,
    action: P
  ): boolean => {
    if (!user) return false;
    if (user.role === 'Super Admin') return true;
    return !!user.permissions[module]?.[action];
  };

  return { hasPermission };
};

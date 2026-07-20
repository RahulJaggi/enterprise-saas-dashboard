import { useAppSelector } from './useAppDispatch';
import { Permission, UserRole, ROLE_PERMISSIONS_MATRIX } from '../config/permissions';

export function usePermission() {
  const user = useAppSelector((state) => state.auth.user);
  const role: UserRole = (user?.role as UserRole) || 'Admin';

  const hasPermission = (permission: Permission): boolean => {
    const allowed = ROLE_PERMISSIONS_MATRIX[role] || [];
    return allowed.includes(permission);
  };

  const hasRole = (allowedRoles: UserRole[]): boolean => {
    return allowedRoles.includes(role);
  };

  return {
    user,
    role,
    hasPermission,
    hasRole,
  };
}

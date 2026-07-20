export type UserRole = 'Admin' | 'Manager' | 'User';

export type Permission =
  | 'users:read'
  | 'users:create'
  | 'users:edit'
  | 'users:delete'
  | 'products:read'
  | 'products:create'
  | 'products:edit'
  | 'products:delete'
  | 'orders:read'
  | 'orders:create'
  | 'orders:edit'
  | 'orders:delete'
  | 'customers:read'
  | 'customers:edit'
  | 'settings:read'
  | 'settings:edit'
  | 'reports:read'
  | 'reports:export';

export const ROLE_PERMISSIONS_MATRIX: Record<UserRole, Permission[]> = {
  Admin: [
    'users:read',
    'users:create',
    'users:edit',
    'users:delete',
    'products:read',
    'products:create',
    'products:edit',
    'products:delete',
    'orders:read',
    'orders:create',
    'orders:edit',
    'orders:delete',
    'customers:read',
    'customers:edit',
    'settings:read',
    'settings:edit',
    'reports:read',
    'reports:export',
  ],
  Manager: [
    'users:read',
    'products:read',
    'products:create',
    'products:edit',
    'orders:read',
    'orders:create',
    'orders:edit',
    'customers:read',
    'customers:edit',
    'reports:read',
    'reports:export',
  ],
  User: [
    'products:read',
    'orders:read',
    'customers:read',
    'reports:read',
  ],
};

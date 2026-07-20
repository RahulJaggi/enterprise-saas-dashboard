import { Role } from './common';

export interface UserPermissions {
  users: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  products: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  orders: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  analytics: { view: boolean; export: boolean };
  reports: { view: boolean; create: boolean; export: boolean };
  settings: { view: boolean; edit: boolean };
  auditLogs: { view: boolean };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl: string;
  department: string;
  permissions: UserPermissions;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

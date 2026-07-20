import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserPermissions } from '../../types';

interface ProtectedRouteProps {
  module?: keyof UserPermissions;
  action?: 'view' | 'create' | 'edit' | 'delete' | 'export';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ module, action = 'view' }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (module && user) {
    if (user.role !== 'Super Admin') {
      const modulePerms = user.permissions[module];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hasPerm = modulePerms ? (modulePerms as any)[action] : false;
      if (!hasPerm) {
        return (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 my-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Access Restricted</h2>
            <p className="text-sm text-slate-500 mt-2">
              You do not have permission to view this section. Please contact your Super Admin to update your role permissions.
            </p>
          </div>
        );
      }
    }
  }

  return <Outlet />;
};

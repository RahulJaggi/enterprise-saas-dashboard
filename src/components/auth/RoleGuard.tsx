import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserRole } from '../../config/permissions';
import { usePermission } from '../../hooks/usePermission';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { hasRole } = usePermission();

  if (!hasRole(allowedRoles)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { UserStatus } from '../types/user.types';

interface UserStatusBadgeProps {
  status: UserStatus;
}

export const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  const variantMap: Record<UserStatus, 'success' | 'neutral' | 'danger' | 'warning'> = {
    Active: 'success',
    Inactive: 'neutral',
    Suspended: 'danger',
    Pending: 'warning',
  };

  return <Badge variant={variantMap[status]} size="sm">{status}</Badge>;
};

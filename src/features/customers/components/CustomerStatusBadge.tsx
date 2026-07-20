import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { CustomerStatus } from '../types/customer.types';

interface CustomerStatusBadgeProps {
  status: CustomerStatus;
}

export const CustomerStatusBadge: React.FC<CustomerStatusBadgeProps> = ({ status }) => {
  const variantMap: Record<CustomerStatus, 'success' | 'info' | 'neutral' | 'danger'> = {
    Active: 'success',
    VIP: 'info',
    Inactive: 'neutral',
    Churned: 'danger',
  };

  return <Badge variant={variantMap[status]} size="sm">{status}</Badge>;
};

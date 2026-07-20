import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { PaymentStatus } from '../types/order.types';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status }) => {
  const variantMap: Record<PaymentStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
    Paid: 'success',
    Pending: 'warning',
    Failed: 'danger',
    Refunded: 'neutral',
  };

  return <Badge variant={variantMap[status]} size="sm">{status}</Badge>;
};

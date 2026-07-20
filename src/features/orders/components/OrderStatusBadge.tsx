import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { OrderStatus } from '../types/order.types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const variantMap: Record<OrderStatus, 'success' | 'info' | 'warning' | 'danger'> = {
    Completed: 'success',
    Shipped: 'info',
    Processing: 'warning',
    Cancelled: 'danger',
  };

  return <Badge variant={variantMap[status]} size="sm">{status}</Badge>;
};

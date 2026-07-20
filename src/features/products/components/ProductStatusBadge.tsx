import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { ProductStatus } from '../types/product.types';

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

export const ProductStatusBadge: React.FC<ProductStatusBadgeProps> = ({ status }) => {
  const variantMap: Record<ProductStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
    'In Stock': 'success',
    'Low Stock': 'warning',
    'Out of Stock': 'danger',
    Discontinued: 'neutral',
  };

  return <Badge variant={variantMap[status]} size="sm">{status}</Badge>;
};

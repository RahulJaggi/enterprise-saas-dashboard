import React from 'react';
import { EmptyState as BaseEmptyState } from '../feedback/EmptyState';

export const EmptyState: React.FC<React.ComponentProps<typeof BaseEmptyState>> = (props) => {
  return <BaseEmptyState {...props} />;
};

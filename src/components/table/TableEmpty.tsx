import React from 'react';
import { EmptyState } from '../ui/EmptyState';

interface TableEmptyProps {
  title?: string;
  description?: string;
}

export const TableEmpty: React.FC<TableEmptyProps> = ({
  title = 'No records found',
  description = 'No matching rows found for the specified filters or search query.',
}) => {
  return (
    <div className="py-8 flex justify-center">
      <EmptyState title={title} description={description} />
    </div>
  );
};

import React from 'react';
import { Skeleton } from '../ui/Skeleton';

interface TableLoadingProps {
  columns?: number;
  rows?: number;
}

export const TableLoading: React.FC<TableLoadingProps> = ({ columns = 5, rows = 5 }) => {
  return (
    <div className="w-full space-y-3 p-4">
      {Array.from({ length: rows }).map((_, rIdx) => (
        <div key={rIdx} className="flex items-center gap-4">
          {Array.from({ length: columns }).map((_, cIdx) => (
            <Skeleton key={cIdx} className="h-8 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

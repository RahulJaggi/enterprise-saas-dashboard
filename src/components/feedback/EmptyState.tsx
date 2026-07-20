import React from 'react';
import { FolderOpen } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There is currently no data available to display in this view.',
  icon = <FolderOpen className="w-10 h-10 text-slate-400" />,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="min-h-[240px] flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
      <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 mb-3">{icon}</div>
      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

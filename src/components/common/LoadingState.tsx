import React from 'react';

interface LoadingStateProps {
  label?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ label = 'Loading enterprise data...' }) => {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center p-8 gap-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-600 animate-spin"></div>
      </div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 animate-pulse">{label}</p>
    </div>
  );
};

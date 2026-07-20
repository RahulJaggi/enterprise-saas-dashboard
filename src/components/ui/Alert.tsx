import React from 'react';
import { cn } from '../../lib/utils';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onDismiss?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onDismiss,
  className,
  ...props
}) => {
  const variantStyles = {
    info: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50',
    success: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50',
    warning: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',
    error: 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/50',
  };

  const icons = {
    info: <Info className="w-4 h-4 text-indigo-500 shrink-0" />,
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />,
  };

  return (
    <div
      className={cn('p-4 rounded-xl border flex items-start gap-3 text-xs', variantStyles[variant], className)}
      {...props}
    >
      {icons[variant]}
      <div className="flex-1">
        {title && <h5 className="font-bold mb-0.5">{title}</h5>}
        <div className="text-slate-600 dark:text-slate-300">{children}</div>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

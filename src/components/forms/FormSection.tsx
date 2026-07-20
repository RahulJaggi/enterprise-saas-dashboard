import React from 'react';
import { cn } from '../../lib/utils';

interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800/80 last:border-b-0 last:pb-0', className)} {...props}>
      <div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{title}</h4>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

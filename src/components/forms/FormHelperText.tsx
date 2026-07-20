import React from 'react';
import { cn } from '../../lib/utils';

export const FormHelperText: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  if (!children) return null;
  return (
    <p className={cn('mt-1 text-xs text-slate-500 dark:text-slate-400', className)} {...props}>
      {children}
    </p>
  );
};

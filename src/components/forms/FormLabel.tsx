import React from 'react';
import { cn } from '../../lib/utils';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  children,
  required,
  className,
  ...props
}) => {
  return (
    <label
      className={cn('block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5', className)}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

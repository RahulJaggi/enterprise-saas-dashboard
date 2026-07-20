import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message, children, className, ...props }) => {
  const content = message || children;
  if (!content) return null;

  return (
    <p
      className={cn('mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1 animate-in fade-in duration-150', className)}
      {...props}
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span>{content}</span>
    </p>
  );
};

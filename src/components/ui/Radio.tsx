import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, checked, className, id, disabled, ...props }, ref) => {
    const radioId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex items-start gap-3 select-none">
        <div className="relative flex items-center mt-0.5">
          <input
            type="radio"
            id={radioId}
            ref={ref}
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            onClick={(e) => {
              if (disabled) return;
              const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
              input?.click();
            }}
            className={cn(
              'w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center transition-all cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500',
              checked && 'border-indigo-600 dark:border-indigo-500',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
          >
            {checked && <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500" />}
          </div>
        </div>
        {(label || description) && (
          <label htmlFor={radioId} className={cn('text-xs cursor-pointer', disabled && 'cursor-not-allowed opacity-50')}>
            {label && <span className="font-semibold text-slate-800 dark:text-slate-200 block">{label}</span>}
            {description && <span className="text-slate-500 dark:text-slate-400 block">{description}</span>}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

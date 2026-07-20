import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, checked, className, id, onChange, disabled, ...props }, ref) => {
    const checkboxId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex items-start gap-3 select-none">
        <div className="relative flex items-center mt-0.5">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            checked={checked}
            onChange={onChange}
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
              'w-4 h-4 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center transition-all cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500',
              checked && 'bg-indigo-600 dark:bg-indigo-600 border-indigo-600 text-white',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
          >
            {checked && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </div>
        {(label || description) && (
          <label htmlFor={checkboxId} className={cn('text-xs cursor-pointer', disabled && 'cursor-not-allowed opacity-50')}>
            {label && <span className="font-semibold text-slate-800 dark:text-slate-200 block">{label}</span>}
            {description && <span className="text-slate-500 dark:text-slate-400 block">{description}</span>}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

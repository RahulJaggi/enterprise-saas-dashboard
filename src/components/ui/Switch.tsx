import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, checked, className, id, disabled, onChange, ...props }, ref) => {
    const switchId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex items-center justify-between select-none gap-4">
        {(label || description) && (
          <label htmlFor={switchId} className={cn('text-xs cursor-pointer', disabled && 'cursor-not-allowed opacity-50')}>
            {label && <span className="font-semibold text-slate-800 dark:text-slate-200 block">{label}</span>}
            {description && <span className="text-slate-500 dark:text-slate-400 block">{description}</span>}
          </label>
        )}
        <div className="relative inline-flex items-center">
          <input
            type="checkbox"
            id={switchId}
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
              'w-9 h-5 bg-slate-300 dark:bg-slate-700 rounded-full cursor-pointer transition-colors relative peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500',
              checked && 'bg-indigo-600 dark:bg-indigo-600',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-xs',
                checked && 'translate-x-4'
              )}
            />
          </div>
        </div>
      </div>
    );
  }
);

Switch.displayName = 'Switch';

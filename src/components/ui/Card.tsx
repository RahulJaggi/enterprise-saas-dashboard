import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, glass = false, ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-xl transition-all duration-200',
          glass
            ? 'glass-panel shadow-sm'
            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={twMerge(clsx('p-5 border-b border-slate-100 dark:border-slate-800/60', className))}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3
    className={twMerge(
      clsx('text-base font-semibold text-slate-900 dark:text-slate-100 tracking-tight', className)
    )}
    {...props}
  >
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => <div className={twMerge(clsx('p-5', className))} {...props}>{children}</div>;

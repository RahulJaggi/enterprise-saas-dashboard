import React from 'react';
import { ReduxProvider } from '../providers/ReduxProvider';
import { ThemeProvider } from '../providers/ThemeProvider';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { Toaster } from 'sonner';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ReduxProvider>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
};

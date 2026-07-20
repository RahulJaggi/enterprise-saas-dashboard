import React from 'react';
import { ReduxProvider } from '../providers/ReduxProvider';
import { ThemeProvider } from '../providers/ThemeProvider';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReduxProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  );
};

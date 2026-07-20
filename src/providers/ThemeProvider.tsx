import React, { useEffect } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark } = useDarkMode();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return <>{children}</>;
};

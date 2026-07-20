import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useAppDispatch';
import { toggleTheme } from '../app/themeSlice';

export const useDarkMode = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const isDark = mode === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return {
    isDark,
    mode,
    toggleTheme: () => dispatch(toggleTheme()),
  };
};

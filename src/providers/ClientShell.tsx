'use client';

import { createContext, useContext } from 'react';
import { Cursor } from '@/components/cursor';
import { useTheme } from '@/hooks/useTheme';
import { RouteAttribute } from '@/providers/RouteAttribute';

interface ThemeContextValue {
  readonly theme: 'light' | 'dark';
  readonly toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => void 0,
});

export function useThemeContext(): ThemeContextValue {
  return useContext(ThemeContext);
}

export function ClientShell({ children }: { readonly children: React.ReactNode }): React.ReactElement {
  const [theme, toggleTheme] = useTheme();
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <RouteAttribute />
      <Cursor />
      {children}
    </ThemeContext.Provider>
  );
}

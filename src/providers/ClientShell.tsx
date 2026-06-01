'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Cursor } from '@/components/cursor';
import { useTheme } from '@/hooks/useTheme';
import { RouteAttribute } from '@/providers/RouteAttribute';
import { CommandPaletteHost } from '@/components/nav/CommandPaletteHost';

interface ThemeContextValue {
  readonly theme: 'light' | 'dark';
  readonly toggleTheme: () => void;
}

interface CommandStateContextValue {
  readonly isCommandOpen: boolean;
  readonly openCommand: () => void;
  readonly closeCommand: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => void 0,
});

const CommandStateContext = createContext<CommandStateContextValue>({
  isCommandOpen: false,
  openCommand: () => void 0,
  closeCommand: () => void 0,
});

export function useThemeContext(): ThemeContextValue {
  return useContext(ThemeContext);
}

export function useCommandState(): CommandStateContextValue {
  return useContext(CommandStateContext);
}

export function ClientShell({ children }: { readonly children: React.ReactNode }): React.ReactElement {
  const [theme, toggleTheme] = useTheme();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const openCommand = useCallback((): void => setIsCommandOpen(true), []);
  const closeCommand = useCallback((): void => setIsCommandOpen(false), []);

  // Global Cmd+K / Ctrl+K toggle. Matches the keystroke against `e.key === 'k'`
  // case-insensitively to handle Shift+Cmd+K and dead-key edge cases.
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isCmdK) {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CommandStateContext.Provider value={{ isCommandOpen, openCommand, closeCommand }}>
        <RouteAttribute />
        <Cursor />
        {children}
        <CommandPaletteHost />
      </CommandStateContext.Provider>
    </ThemeContext.Provider>
  );
}

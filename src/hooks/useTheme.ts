'use client';

import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function resolveTheme(): Theme {
  const stored = localStorage.getItem('shinoda-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme(): readonly [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(resolveTheme());
  }, []);

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.getAttribute('data-theme');
    const osDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next: Theme =
      current === 'dark'  ? 'light' :
      current === 'light' ? 'dark'  :
      osDark              ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('shinoda-theme', next);
    setTheme(next);
  }, []);

  return [theme, toggleTheme] as const;
}

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

    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const handleOSChange = (e: MediaQueryListEvent): void => {
      // Only follow OS changes when the user has not set an explicit preference.
      if (localStorage.getItem('shinoda-theme') !== null) return;
      const next: Theme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      setTheme(next);
    };

    mq.addEventListener('change', handleOSChange);
    return () => mq.removeEventListener('change', handleOSChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.getAttribute('data-theme') as Theme | null;
    const osDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next: Theme =
      current === 'dark'  ? 'light' :
      current === 'light' ? 'dark'  :
      osDark              ? 'light' : 'dark';
    document.documentElement.classList.add('theme-transitioning');
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('shinoda-theme', next);
    setTheme(next);
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 500);
  }, []);

  return [theme, toggleTheme] as const;
}

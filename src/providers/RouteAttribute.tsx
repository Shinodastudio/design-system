'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Sets `data-route` on <body> so CSS can target route-specific chrome.
 * Used by base styles to hide the global nav on `/` (the home page IS the nav).
 *
 * Effect-based rather than render-time because body is owned by RootLayout.
 */
export function RouteAttribute(): null {
  const pathname = usePathname();
  useEffect(() => {
    const route = pathname === '/' ? 'home' : 'page';
    document.body.setAttribute('data-route', route);
    return () => {
      document.body.removeAttribute('data-route');
    };
  }, [pathname]);
  return null;
}

'use client';

import { useEffect } from 'react';

const GRAVITY_RADIUS   = 80;
const GRAVITY_STRENGTH = 0.25;

export function useGravity(ref: React.RefObject<HTMLElement | null>): void {
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = e.clientX - cx;
      const dy   = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < GRAVITY_RADIUS) {
        const pull = (1 - dist / GRAVITY_RADIUS) * GRAVITY_STRENGTH;
        el.style.setProperty('--gravity-x', `${dx * pull}px`);
        el.style.setProperty('--gravity-y', `${dy * pull}px`);
      } else {
        el.style.setProperty('--gravity-x', '0px');
        el.style.setProperty('--gravity-y', '0px');
      }
    }

    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, [ref]);
}

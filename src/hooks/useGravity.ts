'use client';

import { useEffect } from 'react';

const GRAVITY_RADIUS   = 80;
const GRAVITY_STRENGTH = 0.25;
/** Caps displacement so wide/tall elements (e.g. full-width inputs) don't
 *  shift by hundreds of px. Small buttons never approach this limit (~5px max). */
const GRAVITY_MAX      = 6;

function clampGravity(v: number): number {
  return Math.max(-GRAVITY_MAX, Math.min(GRAVITY_MAX, v));
}

export function useGravity(ref: React.RefObject<HTMLElement | null>): void {
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      // Nearest-point distance: 0 when cursor is inside the element.
      // This means wide elements (full-width inputs) activate gravity the
      // moment the cursor is nearby, not only near the geometric center.
      const nearX  = Math.max(rect.left, Math.min(rect.right,  e.clientX));
      const nearY  = Math.max(rect.top,  Math.min(rect.bottom, e.clientY));
      const dist   = Math.sqrt(
        (e.clientX - nearX) ** 2 + (e.clientY - nearY) ** 2,
      );

      if (dist < GRAVITY_RADIUS) {
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const pull = (1 - dist / GRAVITY_RADIUS) * GRAVITY_STRENGTH;
        el.style.setProperty('--gravity-x', `${clampGravity((e.clientX - cx) * pull)}px`);
        el.style.setProperty('--gravity-y', `${clampGravity((e.clientY - cy) * pull)}px`);
      } else {
        el.style.setProperty('--gravity-x', '0px');
        el.style.setProperty('--gravity-y', '0px');
      }
    }

    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, [ref]);
}

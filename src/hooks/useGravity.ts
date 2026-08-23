'use client';

import { useCallback, useEffect } from 'react';

/* Radius and strength reduced 30% from the original 80 / 0.25 — pull now
 * activates closer to the element and displaces less per pixel of distance. */
const GRAVITY_RADIUS   = 56;
const GRAVITY_STRENGTH = 0.175;
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

/* Cells sit shoulder-to-shoulder in a grid, so the pull is tuned tighter than
 * the standalone version: the cursor is almost always already inside a cell
 * and only the cell it is over should move. */
const CELL_GRAVITY_STRENGTH = 0.14;
const CELL_GRAVITY_MAX      = 3;

function clampCellGravity(v: number): number {
  return Math.max(-CELL_GRAVITY_MAX, Math.min(CELL_GRAVITY_MAX, v));
}

/**
 * Gravity for a set of sibling cells sharing one container — a calendar grid,
 * for instance. A single delegated listener drives whichever cell the cursor
 * is over, instead of every cell registering its own document listener.
 *
 * Returns a ref callback rather than taking a ref object: the container is
 * often a node that comes and goes (the calendar swaps day grid for month
 * tiles for year tiles), and an effect reading `ref.current` binds once to
 * whichever node happened to be mounted first, then never rebinds. React 19
 * runs the cleanup returned here on every detach, so the listeners follow the
 * element instead of the first render.
 */
export function useGravityWithin(selector: string): (node: HTMLElement | null) => void {
  return useCallback((container: HTMLElement | null) => {
    if (container == null) return;

    let active: HTMLElement | null = null;

    function reset(el: HTMLElement | null): void {
      if (el == null) return;
      el.style.setProperty('--gravity-x', '0px');
      el.style.setProperty('--gravity-y', '0px');
    }

    function onMove(e: MouseEvent): void {
      const target = e.target as Element | null;
      const cell = target?.closest<HTMLElement>(selector) ?? null;

      if (cell !== active) {
        reset(active);
        active = cell;
      }
      if (cell == null) return;

      const rect = cell.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      cell.style.setProperty(
        '--gravity-x',
        `${clampCellGravity((e.clientX - cx) * CELL_GRAVITY_STRENGTH)}px`,
      );
      cell.style.setProperty(
        '--gravity-y',
        `${clampCellGravity((e.clientY - cy) * CELL_GRAVITY_STRENGTH)}px`,
      );
    }

    function onLeave(): void {
      reset(active);
      active = null;
    }

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      reset(active);
    };
  }, [selector]);
}

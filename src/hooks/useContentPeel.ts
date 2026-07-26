'use client';

import { useEffect } from 'react';

/**
 * useContentPeel — scroll-velocity-eased "peel" for the top-of-viewport
 * content zone (see ContentPeel). The faster the page scrolls, the more
 * the page content currently sitting under the nav pinches inward at its
 * top-left/top-right corners — a paper-peel silhouette — easing back to a
 * flat, invisible rectangle as scrolling settles.
 *
 * Deliberately NOT applied to <Nav> or its .progressive-blur strip — those
 * stay fixed and undisturbed; this hook only ever drives ContentPeel, a
 * separate fixed layer sitting between the nav/blur and the ordinary page
 * content. It paints two solid page-background flaps (--color-fill-base)
 * over the content's top corners, so it reads as the CONTENT narrowing
 * rather than as an overlay appearing on top of it.
 *
 * Shape: two independent subpaths (left flap, right flap) in
 * objectBoundingBox 0–1 units. Each flap's inner edge starts inset by
 * `amplitude` (a fraction of the zone's on-screen WIDTH) at y=0 and eases
 * — via a cosine profile, zero slope at both ends — back to zero inset by
 * y = CURVE_HEIGHT_FRACTION (a fraction of the zone's on-screen HEIGHT),
 * where the flap disappears entirely for the rest of the zone. At rest
 * (bend === 0) both subpaths collapse to zero-area, so idle pages paint
 * nothing here at all.
 *
 * Velocity/decay/lerp constants match the site's other fast-ramp scroll
 * effect (formerly used here for the now-removed blur-wave peel): quick to
 * build up within ~100ms of a brisk scroll, slower to decay, so an ordinary
 * scroll-then-pause gesture actually reads as a peel instead of never
 * building up enough bend to be visible.
 *
 * Perf: the rAF loop only runs while velocity or bend are non-zero,
 * restarting on the next scroll event rather than running forever.
 */

const VELOCITY_DIVISOR = 40;
const VELOCITY_DECAY = 0.95;
const BEND_LERP = 0.18;
const MAX_INSET_FRACTION = 0.16;
const CURVE_HEIGHT_FRACTION = 0.7;
const SEGMENTS = 12;
const SETTLE_EPSILON = 0.002;
// Both subpaths degenerate to zero-area lines — the "no peel" resting shape.
const FLAT_PATH = 'M0,0 L0,0 L0,1 L0,1 Z M1,0 L1,0 L1,1 L1,1 Z';

function insetAt(y: number, amplitude: number): number {
  if (y >= CURVE_HEIGHT_FRACTION) return 0;
  return amplitude * Math.cos((y / CURVE_HEIGHT_FRACTION) * (Math.PI / 2));
}

export function useContentPeel(pathRef: React.RefObject<SVGPathElement | null>): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const path = pathRef.current;
    if (path == null) return;

    let raf = 0;
    let lastScrollY = window.scrollY;
    let velocity = 0;
    let bend = 0;

    const applyPeel = (): void => {
      if (bend <= SETTLE_EPSILON) {
        path.setAttribute('d', FLAT_PATH);
        return;
      }
      const amplitude = bend * MAX_INSET_FRACTION;
      const left: string[] = ['0,0', `${amplitude.toFixed(4)},0`];
      const right: string[] = ['1,0', `${(1 - amplitude).toFixed(4)},0`];
      for (let i = 1; i <= SEGMENTS; i += 1) {
        const y = i / SEGMENTS;
        const inset = insetAt(y, amplitude);
        left.push(`${inset.toFixed(4)},${y.toFixed(4)}`);
        right.push(`${(1 - inset).toFixed(4)},${y.toFixed(4)}`);
      }
      left.push('0,1');
      right.push('1,1');
      path.setAttribute('d', `M${left.join(' L')} Z M${right.join(' L')} Z`);
    };

    const loop = (): void => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      const impulse = Math.min(Math.abs(delta) / VELOCITY_DIVISOR, 1);
      velocity = Math.max(velocity * VELOCITY_DECAY, impulse);
      bend += (velocity - bend) * BEND_LERP;

      if (velocity > SETTLE_EPSILON || bend > SETTLE_EPSILON) {
        applyPeel();
        raf = requestAnimationFrame(loop);
      } else {
        velocity = 0;
        bend = 0;
        applyPeel();
        raf = 0;
      }
    };

    const kickstart = (): void => {
      if (raf === 0) raf = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', kickstart, { passive: true });

    return () => {
      window.removeEventListener('scroll', kickstart);
      cancelAnimationFrame(raf);
      path.setAttribute('d', FLAT_PATH);
    };
  }, [pathRef]);
}

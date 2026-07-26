'use client';

import { useRef } from 'react';
import { useContentPeel } from '@/hooks/useContentPeel';

// Both subpaths degenerate to zero-area lines — the "no peel" resting shape.
// useContentPeel only ever rewrites this path's `d`; nothing else here moves.
const FLAT_PATH = 'M0,0 L0,0 L0,1 L0,1 Z M1,0 L1,0 L1,1 L1,1 Z';

/**
 * Site-wide scroll-velocity "peel" — pinches the top-left/top-right corners
 * of whatever page content is currently under the nav inward as the page
 * scrolls fast, easing back to flat (invisible) once scrolling settles.
 *
 * Mounted once in RootLayout, fixed at the top of the viewport, independent
 * of <Nav>/.progressive-blur — those are never touched by this effect.
 * Painted solid in --color-fill-base (the page background) so it reads as
 * the CONTENT narrowing rather than an overlay appearing on top of it.
 *
 * See useContentPeel for the shape/physics; --content-peel-height on this
 * element (or an ancestor) controls how tall the affected zone is.
 */
export function ContentPeel(): React.ReactElement {
  const pathRef = useRef<SVGPathElement>(null);
  useContentPeel(pathRef);

  return (
    <svg aria-hidden="true" className="content-peel" viewBox="0 0 1 1" preserveAspectRatio="none">
      <path ref={pathRef} d={FLAT_PATH} />
    </svg>
  );
}

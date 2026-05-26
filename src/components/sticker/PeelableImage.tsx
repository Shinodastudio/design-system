'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/cn';

export type PeelCorner = 'tl' | 'tr' | 'bl' | 'br' | 'auto';

interface PeelableImageProps {
  readonly src: string;
  readonly alt: string;
  /**
   * Which corner peels on hover. 'auto' (default) picks one at mount time
   * via a memoised random choice — each instance gets its own corner that
   * persists for the component's lifetime.
   */
  readonly corner?: PeelCorner;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

const CORNERS: readonly Exclude<PeelCorner, 'auto'>[] = ['tl', 'tr', 'bl', 'br'];

function randomCorner(): Exclude<PeelCorner, 'auto'> {
  return CORNERS[Math.floor(Math.random() * CORNERS.length)] as Exclude<PeelCorner, 'auto'>;
}

/**
 * PeelableImage — image surface with a CSS-only sticker-peel corner effect.
 *
 * On hover, the chosen corner appears to lift off the canvas: the main
 * image is clip-pathed to remove a corner triangle, and a sibling flap
 * (a clipped copy of the same image via background-image, tinted with
 * grayscale/brightness so it reads as the un-printed paper back) takes
 * its place with a small rotation and drop-shadow.
 *
 * Because the flap IS the image (via background-image and a mask), alpha
 * pixels stay transparent — cutout stickers don't render a grey triangle
 * floating in empty space.
 *
 * Lineage: Scrapbook CanvasView sticker-peel pattern (l0at-izar worktree,
 * src/styles/stickerizer.css L475–569).
 */
export function PeelableImage({
  src,
  alt,
  corner = 'auto',
  className,
  style,
}: PeelableImageProps): React.ReactElement {
  const resolvedCorner = useMemo<Exclude<PeelCorner, 'auto'>>(
    () => (corner === 'auto' ? randomCorner() : corner),
    [corner],
  );

  return (
    <div
      className={cn('peelable', className)}
      data-peel-corner={resolvedCorner}
      style={{
        ...style,
        // Both the main image and the flap consume this var so the flap stays
        // pixel-aligned with the image — including for cutout (alpha) sources.
        ['--peelable-src' as string]: `url("${src}")`,
      }}
    >
      <img className="peelable-img" src={src} alt={alt} />
      <div className="peelable-flap" aria-hidden="true" />
    </div>
  );
}

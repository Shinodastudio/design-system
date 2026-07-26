'use client';

import { useRef } from 'react';
import { cn } from '@/lib/cn';
import { useScrollBend } from '@/hooks/useScrollBend';

interface ScrollBendMediaBaseProps {
  readonly className?: string;
  /** width / height — sets the container's aspect-ratio up front so the layout never shifts once the media loads. */
  readonly ratio: number;
  /** Multiplier on the scroll-velocity-driven bend amount. Default 1. */
  readonly bendStrength?: number;
  /** Horizontal hump count in the peel edge. 2 = symmetric double-bulge (raggededge-style). Default 2. */
  readonly waveFrequency?: number;
  /** Render the plain media element only — no canvas, no scroll listener. */
  readonly disabled?: boolean;
}

interface ScrollBendImageProps extends ScrollBendMediaBaseProps {
  readonly type?: 'image';
  readonly src: string;
  readonly alt: string;
}

interface ScrollBendVideoProps extends ScrollBendMediaBaseProps {
  readonly type: 'video';
  readonly src: string;
  readonly poster?: string;
}

export type ScrollBendMediaProps = ScrollBendImageProps | ScrollBendVideoProps;

/**
 * Full-bleed image or video whose top/bottom edges bend away from the frame
 * under scroll velocity, revealing the page background beneath — the
 * raggededge.com-style "peel" effect. WebGL (via ogl), not CSS: the media is
 * drawn onto a subdivided plane whose edge vertices displace based on an
 * eased scroll-velocity uniform (see useScrollBend).
 *
 * Degrades to the plain <img>/<video> — no canvas, no motion — when
 * `disabled` is set, under `prefers-reduced-motion: reduce`, or if WebGL
 * fails to initialise. `ratio` is required so the container reserves its
 * final size before the media (or the GL context) is ready — no CLS.
 */
export function ScrollBendMedia(props: ScrollBendMediaProps): React.ReactElement {
  const { className, ratio, bendStrength, waveFrequency, disabled = false } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);

  useScrollBend(containerRef, canvasRef, mediaRef, {
    bendStrength,
    waveFrequency,
    disabled,
  });

  return (
    <div
      ref={containerRef}
      className={cn('scroll-bend-media', className)}
      style={{ aspectRatio: ratio }}
    >
      {props.type === 'video' ? (
        <video
          ref={(el): void => { mediaRef.current = el; }}
          className="scroll-bend-media-source"
          src={props.src}
          poster={props.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : (
        <img
          ref={(el): void => { mediaRef.current = el; }}
          className="scroll-bend-media-source"
          src={props.src}
          alt={props.alt}
          loading="eager"
          decoding="async"
        />
      )}
      <canvas ref={canvasRef} className="scroll-bend-media-canvas" aria-hidden="true" />
    </div>
  );
}

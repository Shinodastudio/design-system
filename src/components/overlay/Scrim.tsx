'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';

export type ScrimBlur = 'none' | 'xs' | 'md';

interface ScrimProps {
  /** Controlled visibility. Mount the component once, flip this to animate. */
  readonly open: boolean;
  /** Click on the scrim itself (not children passing through). Optional. */
  readonly onDismiss?: () => void;
  /** Escape key handler. Pass the same function as onDismiss for consistency. */
  readonly onEscape?: () => void;
  /** Backdrop blur intensity. 'xs' is the default Dialog blur, 'md' is the
   * deeper blur used behind bare/drawer dialogs. 'none' leaves the page sharp. */
  readonly blur?: ScrimBlur;
  /** Optional children rendered above the scrim — pointer events pass through
   * the scrim by default so children remain interactive. */
  readonly children?: React.ReactNode;
  readonly className?: string;
  /** z-index. Defaults to 990 (just under dialogs at 1000). */
  readonly zIndex?: number;
}

const ANIMATION_MS = 200;

/**
 * Scrim — a portalled dark backdrop with optional blur. Standalone primitive
 * usable behind custom overlays, tours, lightboxes, or any surface that needs
 * a focus-darkening layer without bringing in a full Dialog.
 *
 * The Dialog component still uses the native <dialog>::backdrop for its scrim;
 * this primitive is for the cases where <dialog> isn't appropriate — e.g.
 * non-modal floating layers that still need the page dimmed.
 *
 * Visual tokens match the Dialog scrim exactly: --color-scrim fill, --blur-xs
 * (default) or --blur-md (deeper) backdrop blur. Same 200ms fade in/out.
 */
export function Scrim({
  open,
  onDismiss,
  onEscape,
  blur = 'xs',
  children,
  className,
  zIndex = 990,
}: ScrimProps): React.ReactElement | null {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const exitTimerRef = useRef<number | null>(null);

  // Mount on open, unmount after exit animation.
  useEffect(() => {
    if (open) {
      setIsMounted(true);
      // Defer to next frame so the visible class transitions in.
      const id = requestAnimationFrame(() => setIsVisible(true));
      return (): void => cancelAnimationFrame(id);
    }
    setIsVisible(false);
    exitTimerRef.current = window.setTimeout(() => setIsMounted(false), ANIMATION_MS);
    return (): void => {
      if (exitTimerRef.current != null) window.clearTimeout(exitTimerRef.current);
    };
  }, [open]);

  // Escape handler.
  useEffect(() => {
    if (!open || onEscape == null) return;
    const handler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onEscape();
    };
    window.addEventListener('keydown', handler);
    return (): void => window.removeEventListener('keydown', handler);
  }, [open, onEscape]);

  if (!isMounted) return null;
  if (typeof document === 'undefined') return null;

  const node = (
    <div
      className={cn(
        'scrim',
        `scrim-blur-${blur}`,
        isVisible && 'scrim-visible',
        className,
      )}
      style={{ zIndex }}
      onClick={(e): void => {
        // Only dismiss when the scrim itself is clicked, not its children.
        if (e.target === e.currentTarget) onDismiss?.();
      }}
    >
      {children}
    </div>
  );

  return createPortal(node, document.body);
}

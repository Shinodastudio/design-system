'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';

interface CommandDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
}

/** Matches the Scrim primitive's exit fade so the two feel identical. */
const EXIT_MS = 200;

/**
 * Floating modal wrapper for the Command palette.
 * Portals to document.body so it layers above the nav (z-index 999).
 * Renders a scrim that closes the dialog on click.
 *
 * Mount is deferred a frame and unmount is deferred past the exit transition
 * (same lifecycle as the Scrim primitive) so open/close fades and lifts the
 * card smoothly instead of popping in/out instantly.
 */
export function CommandDialog({ open, onClose, children }: CommandDialogProps): React.ReactElement | null {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const exitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      if (exitTimerRef.current != null) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      setIsMounted(true);
      // Defer to next frame so the initial (hidden) styles commit before the
      // visible class flips — otherwise the browser coalesces both and skips
      // the transition entirely.
      const id = requestAnimationFrame(() => setIsVisible(true));
      return (): void => cancelAnimationFrame(id);
    }
    setIsVisible(false);
    exitTimerRef.current = window.setTimeout(() => setIsMounted(false), EXIT_MS);
    return (): void => {
      if (exitTimerRef.current != null) window.clearTimeout(exitTimerRef.current);
    };
  }, [open]);

  // Lock body scroll for as long as the dialog is mounted — covers the exit
  // animation window too, not just the strictly-open state.
  useEffect(() => {
    if (!isMounted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [isMounted]);

  // Bail before reaching for document on the server. Once hydration completes
  // and `open` flips true via user interaction, the portal target is available.
  if (!isMounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className="command-overlay">
      <div
        className={cn('command-scrim', isVisible && 'command-scrim-visible')}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn('command-dialog', isVisible && 'command-dialog-visible')}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

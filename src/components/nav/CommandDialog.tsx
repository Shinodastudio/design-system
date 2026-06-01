'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface CommandDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
}

/**
 * Floating modal wrapper for the Command palette.
 * Portals to document.body so it layers above the nav (z-index 999).
 * Renders a scrim that closes the dialog on click.
 */
export function CommandDialog({ open, onClose, children }: CommandDialogProps): React.ReactElement | null {
  // Lock body scroll while the dialog is open. Restores the original value on close.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  // Bail before reaching for document on the server. Once hydration completes
  // and `open` flips true via user interaction, the portal target is available.
  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="command-overlay">
      <div className="command-scrim" onClick={onClose} aria-hidden="true" />
      <div className="command-dialog" role="dialog" aria-modal="true" aria-label="Site navigation">
        {children}
      </div>
    </div>,
    document.body,
  );
}

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';
import { popDialog, pushDialog } from '@/lib/dialogStack';

/**
 * Dialog — three composable layouts on a single native <dialog>:
 *
 *   variant="card"   (default — legacy)  Single centred card. Title/desc/
 *                                        footer compose inside <DialogContent>.
 *   variant="bare"                       Centred frame. Compose <DialogTitleRow>
 *                                        on the scrim + <DialogCard> below.
 *   variant="drawer"                     Full-viewport drawer that slides up
 *                                        from below. Wrap children in
 *                                        <DialogPanel> + <DialogCard variant="drawer">.
 *
 * Motion durations come from --motion-modal-in (drawer) and
 * --motion-modal-card-in (centred bare).
 */

interface DialogContextValue {
  readonly open: boolean;
  readonly titleId: string;
  readonly descriptionId: string;
  readonly close: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (ctx == null) throw new Error('Dialog subcomponents must be inside <Dialog>');
  return ctx;
}

interface DialogProps {
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
  readonly children: React.ReactNode;
  readonly defaultOpen?: boolean;
}

export function Dialog({
  open: controlledOpen,
  onOpenChange,
  children,
  defaultOpen = false,
}: DialogProps): React.ReactElement {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const titleId = useId();
  const descriptionId = useId();

  const close = useCallback((): void => {
    if (controlledOpen == null) setInternalOpen(false);
    onOpenChange?.(false);
  }, [controlledOpen, onOpenChange]);

  const openDialog = useCallback((): void => {
    if (controlledOpen == null) setInternalOpen(true);
    onOpenChange?.(true);
  }, [controlledOpen, onOpenChange]);

  return (
    <DialogContext.Provider value={{ open, titleId, descriptionId, close }}>
      <DialogInternalContext.Provider value={{ openDialog }}>
        {children}
      </DialogInternalContext.Provider>
    </DialogContext.Provider>
  );
}

interface DialogInternalContextValue {
  readonly openDialog: () => void;
}

const DialogInternalContext = createContext<DialogInternalContextValue | null>(null);

function useDialogInternalContext(): DialogInternalContextValue {
  const ctx = useContext(DialogInternalContext);
  if (ctx == null) throw new Error('DialogTrigger must be inside <Dialog>');
  return ctx;
}

interface DialogTriggerProps {
  readonly children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

export function DialogTrigger({ children }: DialogTriggerProps): React.ReactElement {
  const { openDialog } = useDialogInternalContext();
  const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  return (
    <>
      {Object.assign({}, child, {
        props: {
          ...child.props,
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            openDialog();
            child.props.onClick?.(e as React.MouseEvent<HTMLElement>);
          },
        },
      }) as React.ReactElement}
    </>
  );
}

export type DialogVariant = 'card' | 'bare' | 'drawer';

interface DialogContentProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  /**
   * 'card' (default) wraps children in `.dialog-content` — the legacy
   * single-card layout. 'bare' and 'drawer' render children directly so
   * you can compose <DialogTitleRow> + <DialogCard> by hand.
   */
  readonly variant?: DialogVariant;
}

export function DialogContent({
  children,
  className,
  variant = 'card',
}: DialogContentProps): React.ReactElement | null {
  const { open, close, titleId, descriptionId } = useDialogContext();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  // Portal to document.body so the <dialog> is never clipped by an ancestor's
  // overflow:hidden or stacking context (e.g. inside a catalogue preview card).
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const el = dialogRef.current;
    if (el == null) return;
    if (open) {
      if (!el.open) el.showModal();
      // Register as the active top-layer host so the custom cursor (which
      // otherwise renders underneath a modal's top-layer scrim/content
      // regardless of its own z-index) can portal itself inside.
      pushDialog(el);
    } else {
      if (el.open) el.close();
      popDialog(el);
    }
    return (): void => popDialog(el);
  }, [open]);

  useEffect(() => {
    const el = dialogRef.current;
    if (el == null) return;
    const onCancel = (e: Event): void => {
      e.preventDefault();
      close();
    };
    el.addEventListener('cancel', onCancel);
    return (): void => el.removeEventListener('cancel', onCancel);
  }, [close]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) close();
    },
    [close],
  );

  const variantClass =
    variant === 'bare' ? 'dialog--bare' : variant === 'drawer' ? 'dialog--drawer' : null;

  const dialogEl = (
    <dialog
      ref={dialogRef}
      className={cn('dialog', variantClass, className)}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={handleBackdropClick}
    >
      {variant === 'card' ? (
        <div className="dialog-content">
          {children}
        </div>
      ) : (
        children
      )}
    </dialog>
  );

  if (!isMounted) return null;
  return createPortal(dialogEl, document.body);
}

/* ─── Composable primitives (used with variant="bare" or "drawer") ──────── */

interface DialogPanelProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

/**
 * Drawer-only — wraps the slide-up panel inside a `variant="drawer"` dialog.
 * Centres horizontally (max-width 896px) and stacks title row + card.
 */
export function DialogPanel({ children, className }: DialogPanelProps): React.ReactElement {
  return <div className={cn('dialog-panel', className)}>{children}</div>;
}

interface DialogTitleRowProps {
  readonly children: React.ReactNode;
  readonly icon?: React.ReactNode;
  readonly className?: string;
  /** Hide the close button — only do this when an in-card close exists. */
  readonly hideClose?: boolean;
}

/**
 * Title row that sits on the scrim above the card. White text, regardless of
 * theme. Includes an optional leading icon and an auto-rendered close button.
 */
export function DialogTitleRow({
  children,
  icon,
  className,
  hideClose = false,
}: DialogTitleRowProps): React.ReactElement {
  const { titleId, close } = useDialogContext();
  return (
    <div className={cn('dialog-title-row', className)}>
      {icon != null && <span className="dialog-title-icon" aria-hidden="true">{icon}</span>}
      <h2 id={titleId} className="dialog-title-label">{children}</h2>
      {!hideClose && (
        <button
          type="button"
          className="dialog-close-on-scrim"
          aria-label="Close"
          onClick={close}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

interface DialogCardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  /** 'centered' (default) for bare-variant card; 'drawer' for the
   * top-rounded card that fills the drawer panel. */
  readonly variant?: 'centered' | 'drawer';
}

export function DialogCard({
  children,
  className,
  variant = 'centered',
}: DialogCardProps): React.ReactElement {
  return (
    <div
      className={cn('dialog-card', variant === 'drawer' && 'dialog-card--drawer', className)}
    >
      {children}
    </div>
  );
}

/* ─── Legacy single-card primitives (variant="card") ────────────────────── */

interface DialogHeaderProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function DialogHeader({ children, className }: DialogHeaderProps): React.ReactElement {
  return <div className={cn('dialog-header', className)}>{children}</div>;
}

interface DialogTitleProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps): React.ReactElement {
  const { titleId } = useDialogContext();
  return <h2 id={titleId} className={cn('dialog-title', className)}>{children}</h2>;
}

interface DialogDescriptionProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function DialogDescription({ children, className }: DialogDescriptionProps): React.ReactElement {
  const { descriptionId } = useDialogContext();
  return <p id={descriptionId} className={cn('dialog-description', className)}>{children}</p>;
}

interface DialogFooterProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps): React.ReactElement {
  return <div className={cn('dialog-footer', className)}>{children}</div>;
}

interface DialogCloseProps {
  readonly children?: React.ReactNode;
  readonly className?: string;
}

export function DialogClose({ children, className }: DialogCloseProps): React.ReactElement {
  const { close } = useDialogContext();
  return (
    <button type="button" className={cn('btn dialog-close', className)} onClick={close}>
      {children ?? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

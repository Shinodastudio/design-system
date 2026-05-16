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
import { cn } from '@/lib/cn';

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

  const close = useCallback(() => {
    if (controlledOpen == null) setInternalOpen(false);
    onOpenChange?.(false);
  }, [controlledOpen, onOpenChange]);

  const openDialog = useCallback(() => {
    if (controlledOpen == null) setInternalOpen(true);
    onOpenChange?.(true);
  }, [controlledOpen, onOpenChange]);

  return (
    <DialogContext.Provider value={{ open, titleId, descriptionId, close }}>
      {/* Inject openDialog into trigger children via context pattern */}
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

interface DialogContentProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function DialogContent({ children, className }: DialogContentProps): React.ReactElement | null {
  const { open, close, titleId, descriptionId } = useDialogContext();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (el == null) return;
    if (open) {
      if (!el.open) el.showModal();
    } else {
      if (el.open) el.close();
    }
  }, [open]);

  useEffect(() => {
    const el = dialogRef.current;
    if (el == null) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    el.addEventListener('cancel', onCancel);
    return () => el.removeEventListener('cancel', onCancel);
  }, [close]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) close();
    },
    [close],
  );

  return (
    <dialog
      ref={dialogRef}
      className={cn('dialog', className)}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={handleBackdropClick}
    >
      <div className="dialog-content">
        {children}
      </div>
    </dialog>
  );
}

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

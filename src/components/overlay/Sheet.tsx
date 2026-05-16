'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@/lib/cn';

export type SheetSide = 'left' | 'right';

interface SheetContextValue {
  readonly open: boolean;
  readonly side: SheetSide;
  readonly close: () => void;
}

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext(): SheetContextValue {
  const ctx = useContext(SheetContext);
  if (ctx == null) throw new Error('Sheet subcomponents must be inside <Sheet>');
  return ctx;
}

interface SheetInternalContextValue {
  readonly openSheet: () => void;
}

const SheetInternalContext = createContext<SheetInternalContextValue | null>(null);

interface SheetProps {
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
  readonly side?: SheetSide;
  readonly children: React.ReactNode;
  readonly defaultOpen?: boolean;
}

export function Sheet({
  open: controlledOpen,
  onOpenChange,
  side = 'right',
  children,
  defaultOpen = false,
}: SheetProps): React.ReactElement {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const close = useCallback(() => {
    if (controlledOpen == null) setInternalOpen(false);
    onOpenChange?.(false);
  }, [controlledOpen, onOpenChange]);

  const openSheet = useCallback(() => {
    if (controlledOpen == null) setInternalOpen(true);
    onOpenChange?.(true);
  }, [controlledOpen, onOpenChange]);

  return (
    <SheetContext.Provider value={{ open, side, close }}>
      <SheetInternalContext.Provider value={{ openSheet }}>
        {children}
      </SheetInternalContext.Provider>
    </SheetContext.Provider>
  );
}

interface SheetTriggerProps {
  readonly children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

export function SheetTrigger({ children }: SheetTriggerProps): React.ReactElement {
  const ctx = useContext(SheetInternalContext);
  if (ctx == null) throw new Error('SheetTrigger must be inside <Sheet>');
  const { openSheet } = ctx;
  const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  return (
    <>
      {Object.assign({}, child, {
        props: {
          ...child.props,
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            openSheet();
            child.props.onClick?.(e as React.MouseEvent<HTMLElement>);
          },
        },
      }) as React.ReactElement}
    </>
  );
}

interface SheetContentProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function SheetContent({ children, className }: SheetContentProps): React.ReactElement | null {
  const { open, side, close } = useSheetContext();
  const firstFocusRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    firstFocusRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <>
      <div
        className={cn('sheet-overlay', open && 'sheet-overlay-open')}
        aria-hidden="true"
        onClick={close}
      />
      <div
        className={cn('sheet-content', `sheet-content-${side}`, open && 'sheet-content-open', className)}
        role="dialog"
        aria-modal="true"
      >
        <button
          ref={firstFocusRef}
          type="button"
          className="sheet-close btn"
          aria-label="Close"
          onClick={close}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </>,
    document.body,
  );
}

interface SheetHeaderProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function SheetHeader({ children, className }: SheetHeaderProps): React.ReactElement {
  return <div className={cn('sheet-header', className)}>{children}</div>;
}

interface SheetTitleProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function SheetTitle({ children, className }: SheetTitleProps): React.ReactElement {
  return <h2 className={cn('sheet-title', className)}>{children}</h2>;
}

interface SheetFooterProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function SheetFooter({ children, className }: SheetFooterProps): React.ReactElement {
  return <div className={cn('sheet-footer', className)}>{children}</div>;
}

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

interface PopoverPosition {
  readonly top: number;
  readonly left: number;
}

interface PopoverContextValue {
  readonly open: boolean;
  readonly triggerRef: React.RefObject<HTMLElement | null>;
  readonly toggle: () => void;
  readonly close: () => void;
  readonly position: PopoverPosition;
  readonly setContentRef: (el: HTMLDivElement | null) => void;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (ctx == null) throw new Error('Popover subcomponents must be inside <Popover>');
  return ctx;
}

interface PopoverProps {
  readonly children: React.ReactNode;
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
}

export function Popover({
  children,
  open: controlledOpen,
  onOpenChange,
}: PopoverProps): React.ReactElement {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<PopoverPosition>({ top: 0, left: 0 });

  const computePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (trigger == null) return;
    const rect = trigger.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
    });
  }, []);

  const close = useCallback(() => {
    if (controlledOpen == null) setInternalOpen(false);
    onOpenChange?.(false);
  }, [controlledOpen, onOpenChange]);

  const toggle = useCallback(() => {
    const next = !open;
    if (controlledOpen == null) setInternalOpen(next);
    onOpenChange?.(next);
    if (next) computePosition();
  }, [open, controlledOpen, onOpenChange, computePosition]);

  const setContentRef = useCallback((el: HTMLDivElement | null) => {
    contentRef.current = el;
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        contentRef.current != null &&
        !contentRef.current.contains(target) &&
        triggerRef.current != null &&
        !triggerRef.current.contains(target)
      ) {
        close();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, close]);

  return (
    <PopoverContext.Provider value={{ open, triggerRef, toggle, close, position, setContentRef }}>
      {children}
    </PopoverContext.Provider>
  );
}

interface PopoverTriggerProps {
  readonly children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

export function PopoverTrigger({ children }: PopoverTriggerProps): React.ReactElement {
  const { triggerRef, toggle, open } = usePopoverContext();
  const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  return (
    <>
      {Object.assign({}, child, {
        props: {
          ...child.props,
          ref: triggerRef,
          'aria-expanded': open,
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            toggle();
            child.props.onClick?.(e as React.MouseEvent<HTMLElement>);
          },
        },
      }) as React.ReactElement}
    </>
  );
}

interface PopoverContentProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function PopoverContent({ children, className }: PopoverContentProps): React.ReactElement | null {
  const { open, position, setContentRef } = usePopoverContext();

  if (typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <div
      ref={setContentRef}
      className={cn('popover-content', !open && 'popover-hidden', className)}
      style={{ top: position.top, left: position.left }}
      role="dialog"
    >
      {children}
    </div>,
    document.body,
  );
}

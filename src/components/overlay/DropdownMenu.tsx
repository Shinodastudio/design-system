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

interface DropdownPosition {
  readonly top: number;
  readonly left: number;
}

interface DropdownContextValue {
  readonly open: boolean;
  readonly triggerRef: React.RefObject<HTMLElement | null>;
  readonly contentRef: React.RefObject<HTMLDivElement | null>;
  readonly position: DropdownPosition;
  readonly activeIndex: number;
  readonly toggle: () => void;
  readonly close: () => void;
  readonly setActiveIndex: (i: number) => void;
  readonly itemRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext(): DropdownContextValue {
  const ctx = useContext(DropdownContext);
  if (ctx == null) throw new Error('DropdownMenu subcomponents must be inside <DropdownMenu>');
  return ctx;
}

interface DropdownMenuProps {
  readonly children: React.ReactNode;
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu({
  children,
  open: controlledOpen,
  onOpenChange,
}: DropdownMenuProps): React.ReactElement {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<DropdownPosition>({ top: 0, left: 0 });
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const computePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (trigger == null) return;
    const rect = trigger.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const contentWidth = contentRef.current?.offsetWidth ?? 200;

    let left = rect.left + window.scrollX;
    if (rect.left + contentWidth > viewportWidth) {
      left = rect.right + window.scrollX - contentWidth;
    }

    setPosition({
      top: rect.bottom + window.scrollY + 4,
      left,
    });
  }, []);

  const close = useCallback(() => {
    if (controlledOpen == null) setInternalOpen(false);
    onOpenChange?.(false);
    setActiveIndex(-1);
  }, [controlledOpen, onOpenChange]);

  const toggle = useCallback(() => {
    const next = !open;
    if (controlledOpen == null) setInternalOpen(next);
    onOpenChange?.(next);
    if (next) {
      computePosition();
      setActiveIndex(-1);
    }
  }, [open, controlledOpen, onOpenChange, computePosition]);

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
      if (e.key === 'Escape') {
        close();
        triggerRef.current?.focus();
        return;
      }
      const items = itemRefs.current.filter((el): el is HTMLButtonElement => el != null && !el.disabled);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => {
          const next = prev < items.length - 1 ? prev + 1 : 0;
          items[next]?.focus();
          return next;
        });
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => {
          const next = prev > 0 ? prev - 1 : items.length - 1;
          items[next]?.focus();
          return next;
        });
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, close]);

  return (
    <DropdownContext.Provider
      value={{ open, triggerRef, contentRef, position, activeIndex, toggle, close, setActiveIndex, itemRefs }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

interface DropdownMenuTriggerProps {
  readonly children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps): React.ReactElement {
  const { triggerRef, toggle, open } = useDropdownContext();
  const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  return (
    <>
      {Object.assign({}, child, {
        props: {
          ...child.props,
          ref: triggerRef,
          'aria-haspopup': 'menu',
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

interface DropdownMenuContentProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function DropdownMenuContent({ children, className }: DropdownMenuContentProps): React.ReactElement | null {
  const { open, position, contentRef } = useDropdownContext();

  if (typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <div
      ref={contentRef}
      className={cn('dropdown-content', !open && 'dropdown-hidden', className)}
      style={{ top: position.top, left: position.left }}
      role="menu"
    >
      {children}
    </div>,
    document.body,
  );
}

interface DropdownMenuItemProps {
  readonly children: React.ReactNode;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly index?: number;
}

export function DropdownMenuItem({
  children,
  onClick,
  disabled = false,
  className,
  index = 0,
}: DropdownMenuItemProps): React.ReactElement {
  const { close, itemRefs } = useDropdownContext();

  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick?.();
    close();
  }, [disabled, onClick, close]);

  return (
    <button
      ref={el => { itemRefs.current[index] = el; }}
      type="button"
      role="menuitem"
      disabled={disabled}
      className={cn('dropdown-item', disabled && 'dropdown-item-disabled', className)}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {children}
    </button>
  );
}

interface DropdownMenuSeparatorProps {
  readonly className?: string;
}

export function DropdownMenuSeparator({ className }: DropdownMenuSeparatorProps): React.ReactElement {
  return <div className={cn('dropdown-separator', className)} role="separator" />;
}

interface DropdownMenuLabelProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function DropdownMenuLabel({ children, className }: DropdownMenuLabelProps): React.ReactElement {
  return <div className={cn('dropdown-label', className)}>{children}</div>;
}

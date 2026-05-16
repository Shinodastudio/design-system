'use client';

import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@/lib/cn';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

interface TooltipPosition {
  readonly top: number;
  readonly left: number;
}

interface TooltipContextValue {
  readonly id: string;
  readonly visible: boolean;
  readonly position: TooltipPosition;
  readonly side: TooltipSide;
  readonly triggerRef: React.RefObject<HTMLElement | null>;
  readonly show: () => void;
  readonly hide: () => void;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext(): TooltipContextValue {
  const ctx = useContext(TooltipContext);
  if (ctx == null) throw new Error('Tooltip subcomponents must be inside <Tooltip>');
  return ctx;
}

interface TooltipProps {
  readonly content: React.ReactNode;
  readonly children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  readonly side?: TooltipSide;
  readonly delay?: number;
}

export function Tooltip({
  content,
  children,
  side = 'top',
  delay = 400,
}: TooltipProps): React.ReactElement {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const computePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (trigger == null) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipWidth = tooltip?.offsetWidth ?? 120;
    const tooltipHeight = tooltip?.offsetHeight ?? 32;
    const OFFSET = 8;

    let top = 0;
    let left = 0;

    if (side === 'top') {
      top = triggerRect.top + window.scrollY - tooltipHeight - OFFSET;
      left = triggerRect.left + window.scrollX + triggerRect.width / 2 - tooltipWidth / 2;
    } else if (side === 'bottom') {
      top = triggerRect.bottom + window.scrollY + OFFSET;
      left = triggerRect.left + window.scrollX + triggerRect.width / 2 - tooltipWidth / 2;
    } else if (side === 'left') {
      top = triggerRect.top + window.scrollY + triggerRect.height / 2 - tooltipHeight / 2;
      left = triggerRect.left + window.scrollX - tooltipWidth - OFFSET;
    } else {
      top = triggerRect.top + window.scrollY + triggerRect.height / 2 - tooltipHeight / 2;
      left = triggerRect.right + window.scrollX + OFFSET;
    }

    setPosition({ top, left });
  }, [side]);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => {
      computePosition();
      setVisible(true);
    }, delay);
  }, [delay, computePosition]);

  const hide = useCallback(() => {
    if (timerRef.current != null) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current != null) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (visible) computePosition();
  }, [visible, computePosition]);

  const triggerEl = cloneElement(children, {
    ref: triggerRef,
    'aria-describedby': visible ? id : undefined,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      show();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      hide();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      show();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      hide();
      children.props.onBlur?.(e);
    },
  } as React.HTMLAttributes<HTMLElement> & { ref: React.RefObject<HTMLElement | null> });

  return (
    <TooltipContext.Provider value={{ id, visible, position, side, triggerRef, show, hide }}>
      {triggerEl}
      {typeof document !== 'undefined' &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            id={id}
            role="tooltip"
            className={cn('tooltip-content', `tooltip-content-${side}`, !visible && 'tooltip-hidden')}
            style={{ top: position.top, left: position.left }}
            aria-hidden={!visible}
          >
            {content}
          </div>,
          document.body,
        )}
    </TooltipContext.Provider>
  );
}

// Named export for direct usage without wrapping
export function TooltipRoot({ children, className }: { readonly children: React.ReactNode; readonly className?: string }): React.ReactElement {
  return <div className={cn('tooltip-root', className)}>{children}</div>;
}

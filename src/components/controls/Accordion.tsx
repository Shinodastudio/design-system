'use client';

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
} from 'react';
import { cn } from '@/lib/cn';
import { type ButtonSize } from '@/components/primitives/Button.constants';

type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  readonly type: AccordionType;
  readonly openValues: ReadonlySet<string>;
  readonly toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (ctx == null) throw new Error('Accordion subcomponents must be inside <Accordion>');
  return ctx;
}

interface AccordionItemContextValue {
  readonly value: string;
  readonly triggerId: string;
  readonly contentId: string;
  readonly isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext(): AccordionItemContextValue {
  const ctx = useContext(AccordionItemContext);
  if (ctx == null) throw new Error('AccordionTrigger/AccordionContent must be inside <AccordionItem>');
  return ctx;
}

interface AccordionProps {
  readonly type: AccordionType;
  readonly defaultValue?: string | readonly string[];
  readonly value?: string | readonly string[];
  readonly onValueChange?: (value: string | readonly string[]) => void;
  readonly children: React.ReactNode;
  /** Size variant — mirrors the button/type scale. Default: heading-xs (1rem). */
  readonly size?: ButtonSize;
  readonly className?: string;
}

export function Accordion({
  type,
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  size = 'heading-xs',
  className,
}: AccordionProps): React.ReactElement {
  const defaultSet = new Set(
    defaultValue == null
      ? []
      : typeof defaultValue === 'string'
      ? [defaultValue]
      : [...defaultValue],
  );
  const [internalSet, setInternalSet] = useState<ReadonlySet<string>>(defaultSet);

  const openValues: ReadonlySet<string> = controlledValue != null
    ? new Set(typeof controlledValue === 'string' ? [controlledValue] : [...controlledValue])
    : internalSet;

  const toggle = useCallback(
    (val: string) => {
      let next: ReadonlySet<string>;
      if (type === 'single') {
        next = openValues.has(val) ? new Set() : new Set([val]);
      } else {
        const copy = new Set(openValues);
        if (copy.has(val)) copy.delete(val);
        else copy.add(val);
        next = copy;
      }
      if (controlledValue == null) setInternalSet(next);
      const arr = [...next];
      onValueChange?.(type === 'single' ? (arr[0] ?? '') : arr);
    },
    [type, openValues, controlledValue, onValueChange],
  );

  return (
    <AccordionContext.Provider value={{ type, openValues, toggle }}>
      <div className={cn('accordion', `accordion-size-${size}`, className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  readonly value: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function AccordionItem({ value, children, className }: AccordionItemProps): React.ReactElement {
  const { openValues } = useAccordionContext();
  const triggerId = useId();
  const contentId = useId();
  const isOpen = openValues.has(value);

  return (
    <AccordionItemContext.Provider value={{ value, triggerId, contentId, isOpen }}>
      <div className={cn('accordion-item', className)} data-open={isOpen}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

interface AccordionTriggerProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps): React.ReactElement {
  const { toggle } = useAccordionContext();
  const { value, triggerId, contentId, isOpen } = useAccordionItemContext();

  return (
    <button
      id={triggerId}
      type="button"
      className={cn('accordion-trigger', className)}
      aria-expanded={isOpen}
      aria-controls={contentId}
      onClick={() => toggle(value)}
    >
      <span className="accordion-trigger-text">{children}</span>
      <svg
        className={cn('accordion-chevron', isOpen && 'accordion-chevron-open')}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

interface AccordionContentProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function AccordionContent({ children, className }: AccordionContentProps): React.ReactElement {
  const { triggerId, contentId, isOpen } = useAccordionItemContext();

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={cn('accordion-content', isOpen && 'accordion-content-open', className)}
    >
      <div className="accordion-content-inner">{children}</div>
    </div>
  );
}

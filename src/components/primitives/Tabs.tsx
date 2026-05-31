'use client';

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useGravity } from '@/hooks/useGravity';
import { cn } from '@/lib/cn';

interface TabsContextValue {
  readonly active: string;
  readonly setActive: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (ctx == null) throw new Error('Tabs subcomponents must be used inside <Tabs>');
  return ctx;
}

interface TabsProps {
  readonly defaultValue: string;
  readonly value?: string;
  readonly onValueChange?: (value: string) => void;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: TabsProps): React.ReactElement {
  const [internal, setInternal] = useState(defaultValue);
  const active = value ?? internal;
  const setActive = useCallback(
    (next: string) => {
      if (value == null) setInternal(next);
      onValueChange?.(next);
    },
    [value, onValueChange],
  );

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={cn('tabs', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly ariaLabel?: string;
}

/**
 * TabsList — renders the trigger row plus a single shared indicator bar
 * that slides horizontally to the active trigger's bounds (May 2026 spec
 * section 15). Position is measured via a layout effect so the indicator
 * animates rather than jumping.
 */
export function TabsList({ children, className, ariaLabel }: TabsListProps): React.ReactElement {
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>(
    { left: 0, width: 0, ready: false },
  );
  const { active, setActive } = useTabsContext();

  // Measure the active trigger's bounds within the list. Re-run on active change.
  // useLayoutEffect avoids a frame of mis-positioned indicator on initial paint.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (list == null) return;
    const node = list.querySelector<HTMLButtonElement>(`[data-tab-value="${CSS.escape(active)}"]`);
    if (node == null) return;
    const listRect = list.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    setIndicator({
      left: nodeRect.left - listRect.left,
      width: nodeRect.width,
      ready: true,
    });
  }, [active]);

  // Re-measure on resize — keeps the indicator pinned if the layout reflows.
  useEffect(() => {
    const list = listRef.current;
    if (list == null) return;
    const observer = new ResizeObserver(() => {
      const node = list.querySelector<HTMLButtonElement>(`[data-tab-value="${CSS.escape(active)}"]`);
      if (node == null) return;
      const listRect = list.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      setIndicator({
        left: nodeRect.left - listRect.left,
        width: nodeRect.width,
        ready: true,
      });
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    const list = listRef.current;
    if (list == null) return;
    const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (currentIndex === -1) return;
    let next = currentIndex;
    if (e.key === 'ArrowRight') next = (currentIndex + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    const target = tabs[next];
    if (target == null) return;
    target.focus();
    setActive(target.dataset['tabValue'] ?? '');
  };

  return (
    <div
      ref={listRef}
      className={cn('tabs-list', className)}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    >
      {children}
      <span
        className="tabs-indicator"
        aria-hidden="true"
        data-ready={indicator.ready}
        style={{
          transform: `translateX(${indicator.left}px)`,
          width: `${indicator.width}px`,
        }}
      />
    </div>
  );
}

interface TabsTriggerProps {
  readonly value: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps): React.ReactElement {
  const { active, setActive } = useTabsContext();
  const isActive = active === value;
  const ref = useRef<HTMLButtonElement>(null);
  useGravity(ref);

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isActive}
      data-active={isActive}
      data-tab-value={value}
      tabIndex={isActive ? 0 : -1}
      className={cn('tabs-trigger', className)}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

interface TabsPanelProps {
  readonly value: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function TabsPanel({ value, children, className }: TabsPanelProps): React.ReactElement | null {
  const { active } = useTabsContext();
  if (active !== value) return null;
  // `key` on the wrapper forces React to remount on each switch so the CSS
  // enter animation in shinoda-base.css `.tabs-panel` plays fresh each time.
  return (
    <div key={value} role="tabpanel" className={cn('tabs-panel', className)}>
      {children}
    </div>
  );
}

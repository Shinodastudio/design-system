'use client';

import { createContext, useCallback, useContext, useState } from 'react';
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

export function TabsList({ children, className, ariaLabel }: TabsListProps): React.ReactElement {
  return (
    <div className={cn('tabs-list', className)} role="tablist" aria-label={ariaLabel}>
      {children}
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
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-active={isActive}
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
  return (
    <div role="tabpanel" className={cn('tabs-panel', className)}>
      {children}
    </div>
  );
}

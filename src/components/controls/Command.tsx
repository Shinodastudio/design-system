'use client';

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/cn';

interface CommandContextValue {
  readonly query: string;
  readonly setQuery: (q: string) => void;
  readonly activeIndex: number;
  readonly setActiveIndex: (i: number) => void;
  readonly itemRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  readonly inputId: string;
}

const CommandContext = createContext<CommandContextValue | null>(null);

function useCommandContext(): CommandContextValue {
  const ctx = useContext(CommandContext);
  if (ctx == null) throw new Error('Command subcomponents must be inside <Command>');
  return ctx;
}

interface CommandProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function Command({ children, className }: CommandProps): React.ReactElement {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inputId = useId();

  return (
    <CommandContext.Provider value={{ query, setQuery, activeIndex, setActiveIndex, itemRefs, inputId }}>
      <div className={cn('command', className)} role="combobox" aria-haspopup="listbox" aria-expanded="true">
        {children}
      </div>
    </CommandContext.Provider>
  );
}

interface CommandInputProps {
  readonly placeholder?: string;
  readonly className?: string;
}

export function CommandInput({ placeholder = 'Search…', className }: CommandInputProps): React.ReactElement {
  const { query, setQuery, activeIndex, setActiveIndex, itemRefs, inputId } = useCommandContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const items = itemRefs.current.filter((el): el is HTMLButtonElement => el != null);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const currentDown = activeIndex;
      const nextDown = currentDown < items.length - 1 ? currentDown + 1 : 0;
      items[nextDown]?.focus();
      setActiveIndex(nextDown);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const currentUp = activeIndex;
      const nextUp = currentUp > 0 ? currentUp - 1 : items.length - 1;
      items[nextUp]?.focus();
      setActiveIndex(nextUp);
    }
  };

  return (
    <div className="command-input-wrap">
      <input
        id={inputId}
        type="text"
        className={cn('command-input', className)}
        placeholder={placeholder}
        value={query}
        autoComplete="off"
        spellCheck={false}
        onChange={e => { setQuery(e.target.value); setActiveIndex(-1); }}
        onKeyDown={handleKeyDown}
        role="searchbox"
        aria-autocomplete="list"
      />
    </div>
  );
}

interface CommandListProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function CommandList({ children, className }: CommandListProps): React.ReactElement {
  return (
    <div className={cn('command-list', className)} role="listbox">
      {children}
    </div>
  );
}

interface CommandEmptyProps {
  readonly children?: React.ReactNode;
  readonly className?: string;
}

export function CommandEmpty({ children, className }: CommandEmptyProps): React.ReactElement {
  return (
    <div className={cn('command-empty', className)}>
      {children ?? 'No results found.'}
    </div>
  );
}

interface CommandGroupProps {
  readonly label?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function CommandGroup({ label, children, className }: CommandGroupProps): React.ReactElement {
  return (
    <div className={cn('command-group', className)} role="group" aria-label={label}>
      {label != null && <div className="command-group-label">{label}</div>}
      {children}
    </div>
  );
}

interface CommandItemProps {
  readonly children: React.ReactNode;
  readonly onSelect?: () => void;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly value?: string;
}

export function CommandItem({
  children,
  onSelect,
  disabled = false,
  className,
}: CommandItemProps): React.ReactElement | null {
  const { query, itemRefs, setActiveIndex } = useCommandContext();
  const indexRef = useRef<number | null>(null);

  const registerRef = useCallback(
    (el: HTMLButtonElement | null) => {
      if (el != null) {
        const idx = itemRefs.current.indexOf(null);
        if (indexRef.current == null) {
          indexRef.current = itemRefs.current.length;
          itemRefs.current.push(el);
        } else {
          itemRefs.current[indexRef.current] = el;
        }
      }
    },
    [itemRefs],
  );

  const textContent = typeof children === 'string' ? children : '';
  const matches = query === '' || textContent.toLowerCase().includes(query.toLowerCase());

  if (!matches) return null;

  return (
    <button
      ref={registerRef}
      type="button"
      role="option"
      disabled={disabled}
      className={cn('command-item', disabled && 'command-item-disabled', className)}
      onClick={() => {
        if (!disabled) onSelect?.();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!disabled) onSelect?.();
        }
      }}
      onFocus={() => {
        if (indexRef.current != null) setActiveIndex(indexRef.current);
      }}
    >
      {children}
    </button>
  );
}

interface CommandSeparatorProps {
  readonly className?: string;
}

export function CommandSeparator({ className }: CommandSeparatorProps): React.ReactElement {
  return <div className={cn('command-separator', className)} role="separator" />;
}

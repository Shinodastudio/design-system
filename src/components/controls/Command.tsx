'use client';

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/icons/Icon';
import { Input } from '@/components/primitives/Input';

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
      const nextDown = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
      items[nextDown]?.focus();
      setActiveIndex(nextDown);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextUp = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
      items[nextUp]?.focus();
      setActiveIndex(nextUp);
    }
  };

  const clearQuery = useCallback((): void => {
    setQuery('');
    setActiveIndex(-1);
  }, [setQuery, setActiveIndex]);

  return (
    <div className="command-search-wrap">
      <div className="command-search-row">
        <Input
          id={inputId}
          type="text"
          className={cn('command-input', className)}
          placeholder={placeholder}
          value={query}
          autoComplete="off"
          spellCheck={false}
          borderless
          onChange={(e): void => { setQuery(e.target.value); setActiveIndex(-1); }}
          onKeyDown={handleKeyDown}
          role="searchbox"
          aria-autocomplete="list"
        />
        {query !== '' && (
          <button
            type="button"
            className="command-search-clear"
            aria-label="Clear search"
            onClick={clearQuery}
          >
            ×
          </button>
        )}
      </div>
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

/**
 * Renders only when the user has typed a query — prevents "No results" from
 * appearing on an empty palette before any interaction.
 */
export function CommandEmpty({ children, className }: CommandEmptyProps): React.ReactElement | null {
  const { query } = useCommandContext();
  if (query === '') return null;
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
  /** Overrides text used for query filtering. Falls back to string children. */
  readonly value?: string;
  /** Leading icon — typically <Icon name="..." size="em" /> */
  readonly icon?: React.ReactNode;
  /** Shows a CaretRight chevron on the trailing edge to signal a sub-level. */
  readonly hasSubmenu?: boolean;
}

export function CommandItem({
  children,
  onSelect,
  disabled = false,
  className,
  value,
  icon,
  hasSubmenu = false,
}: CommandItemProps): React.ReactElement | null {
  const { query, itemRefs, setActiveIndex } = useCommandContext();
  const indexRef = useRef<number | null>(null);

  const registerRef = useCallback(
    (el: HTMLButtonElement | null) => {
      if (el != null) {
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

  const textContent = value ?? (typeof children === 'string' ? children : '');
  const matches = query === '' || textContent.toLowerCase().includes(query.toLowerCase());

  if (!matches) return null;

  return (
    <button
      ref={registerRef}
      type="button"
      role="option"
      disabled={disabled}
      className={cn('command-item', disabled && 'command-item-disabled', className)}
      onClick={(): void => { if (!disabled) onSelect?.(); }}
      onKeyDown={(e): void => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!disabled) onSelect?.();
        }
      }}
      onFocus={(): void => {
        if (indexRef.current != null) setActiveIndex(indexRef.current);
      }}
    >
      {icon != null && (
        <span className="command-item-icon" aria-hidden="true">{icon}</span>
      )}
      {children}
      {hasSubmenu && (
        <span className="command-item-chevron" aria-hidden="true">
          <Icon name="CaretRight" size="em" />
        </span>
      )}
    </button>
  );
}

interface CommandSeparatorProps {
  readonly className?: string;
}

export function CommandSeparator({ className }: CommandSeparatorProps): React.ReactElement {
  return <div className={cn('command-separator', className)} role="separator" />;
}

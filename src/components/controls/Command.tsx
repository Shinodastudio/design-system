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
import { Icon } from '@/components/icons/Icon';
import { Input } from '@/components/primitives/Input';
import { useGravity } from '@/hooks/useGravity';

/**
 * Exported (alongside the type) so consumers that want the exact same
 * <CommandItem> row used by the site-wide search palette — but driven by
 * their own search field instead of <CommandInput> — can supply their own
 * provider value. See SearchDropdown for the reference usage: it renders
 * <CommandItem> straight off its own query/activeIndex/itemRefs state,
 * with no <Command> or <CommandInput> in the tree at all.
 */
export interface CommandContextValue {
  readonly query: string;
  readonly setQuery: (q: string) => void;
  readonly activeIndex: number;
  readonly setActiveIndex: (i: number) => void;
  readonly itemRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  readonly inputId: string;
  readonly onClose: (() => void) | null;
}

export const CommandContext = createContext<CommandContextValue | null>(null);

function useCommandContext(): CommandContextValue {
  const ctx = useContext(CommandContext);
  if (ctx == null) throw new Error('Command subcomponents must be inside <Command>');
  return ctx;
}

/**
 * Current search query, for consumers that need to branch on it directly —
 * e.g. rendering a group of results only while the user is actively
 * searching. Must be called from a component mounted inside <Command>.
 */
export function useCommandQuery(): string {
  return useCommandContext().query;
}

interface CommandProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  /** Optional callback invoked when Escape is pressed inside the input. */
  readonly onClose?: () => void;
}

export function Command({ children, className, onClose }: CommandProps): React.ReactElement {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inputId = useId();

  return (
    <CommandContext.Provider
      value={{ query, setQuery, activeIndex, setActiveIndex, itemRefs, inputId, onClose: onClose ?? null }}
    >
      <div className={cn('command', className)} role="combobox" aria-haspopup="listbox" aria-expanded="true">
        {children}
      </div>
    </CommandContext.Provider>
  );
}

interface CommandInputProps {
  readonly placeholder?: string;
  readonly className?: string;
  readonly autoFocus?: boolean;
  /**
   * Invoked when Backspace is pressed while the query is already empty —
   * lets a drilled-down level pop back up via the keyboard, mirroring the
   * click behaviour of <CommandHeader>'s back button. Omit at the top level.
   */
  readonly onBackspaceEmpty?: () => void;
}

export function CommandInput({ placeholder = 'Search…', className, autoFocus = false, onBackspaceEmpty }: CommandInputProps): React.ReactElement {
  const { query, setQuery, activeIndex, setActiveIndex, itemRefs, inputId, onClose } = useCommandContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Honour autoFocus on every mount — useful when the input is conditionally
  // rendered inside a modal/dialog that mounts on open.
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const items = itemRefs.current.filter((el): el is HTMLButtonElement => el != null);
    if (e.key === 'Backspace' && query === '' && onBackspaceEmpty != null) {
      e.preventDefault();
      onBackspaceEmpty();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextDown = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
      items[nextDown]?.focus();
      setActiveIndex(nextDown);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextUp = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
      items[nextUp]?.focus();
      setActiveIndex(nextUp);
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose?.();
      return;
    }
    if (e.key === 'Enter') {
      // Activate first visible item if nothing is focused yet — natural
      // "press Enter to pick the top match" behaviour after filtering.
      if (activeIndex < 0 && items.length > 0) {
        e.preventDefault();
        items[0]?.click();
      }
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
          ref={inputRef}
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

interface CommandHeaderProps {
  /** Label of the level currently being browsed, e.g. "Components". */
  readonly label: string;
  readonly onBack: () => void;
}

/**
 * Back-navigation row shown above <CommandInput> once the palette has
 * drilled 1+ levels deep (Figma 4030:948). Distinct from an in-list
 * "← Back" item — this is a persistent header, not a filterable option.
 */
export function CommandHeader({ label, onBack }: CommandHeaderProps): React.ReactElement {
  const backRef = useRef<HTMLButtonElement | null>(null);
  useGravity(backRef);

  return (
    <div className="command-header">
      <div className="command-header-row">
        <button
          ref={backRef}
          type="button"
          className="command-back"
          onClick={onBack}
          aria-label={`Back to ${label}`}
        >
          <Icon name="arrows-button-left" size="em" />
        </button>
        <div className="command-header-label">{label}</div>
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
  /** Shows a right-pointing caret chevron on the trailing edge to signal a sub-level. */
  readonly hasSubmenu?: boolean;
  /** Marks the item as the current value of a single-select list (e.g. SearchDropdown). */
  readonly selected?: boolean;
}

export function CommandItem({
  children,
  onSelect,
  disabled = false,
  className,
  value,
  icon,
  hasSubmenu = false,
  selected = false,
}: CommandItemProps): React.ReactElement | null {
  const { query, itemRefs, activeIndex, setActiveIndex, inputId, onClose } = useCommandContext();
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
      } else if (indexRef.current != null) {
        // Item unmounted (filtered out by the query) — clear its slot so
        // handleKeyDown's live-node filter doesn't keep focusing/counting a
        // stale, detached button. The index stays reserved so a later
        // remount (query matches again) refills the same slot and visual
        // ordering stays stable.
        itemRefs.current[indexRef.current] = null;
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
      aria-selected={selected}
      disabled={disabled}
      className={cn('command-item', selected && 'command-item-selected', disabled && 'command-item-disabled', className)}
      onClick={(): void => { if (!disabled) onSelect?.(); }}
      onKeyDown={(e): void => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!disabled) onSelect?.();
          return;
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose?.();
          return;
        }
        // Keep arrow navigation working when focus has moved off the input.
        const items = itemRefs.current.filter((el): el is HTMLButtonElement => el != null);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
          items[next]?.focus();
          setActiveIndex(next);
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (activeIndex <= 0) {
            // Return focus to the search input from the first item.
            document.getElementById(inputId)?.focus();
            setActiveIndex(-1);
          } else {
            const prev = activeIndex - 1;
            items[prev]?.focus();
            setActiveIndex(prev);
          }
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
          <Icon name="arrows-button-right" size="em" />
        </span>
      )}
    </button>
  );
}


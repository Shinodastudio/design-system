'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@/lib/cn';
import {
  CommandContext,
  CommandList,
  CommandGroup,
  CommandItem,
} from '@/components/controls/Command';
import type { CommandContextValue } from '@/components/controls/Command';

export interface SearchOption {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
}

interface SearchDropdownProps {
  readonly options: readonly SearchOption[];
  readonly value?: string;
  readonly onChange?: (value: string) => void;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly isLoading?: boolean;
  readonly className?: string;
}

interface DropdownPosition {
  readonly top: number;
  readonly left: number;
  readonly width: number;
}

export function SearchDropdown({
  options,
  value,
  onChange,
  placeholder = 'Search…',
  disabled = false,
  isLoading = false,
  className,
}: SearchDropdownProps): React.ReactElement {
  const [query, setQuery] = useState(() => {
    if (value == null) return '';
    const found = options.find(o => o.value === value);
    return found?.label ?? '';
  });
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [position, setPosition] = useState<DropdownPosition>({ top: 0, left: 0, width: 0 });
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inputId = useId();

  const filtered = isLoading
    ? []
    : options.filter(
        o =>
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          (o.description?.toLowerCase().includes(query.toLowerCase()) ?? false),
      );

  const computePosition = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (wrapper == null) return;
    const rect = wrapper.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }, []);

  const openList = useCallback(() => {
    if (disabled) return;
    computePosition();
    setOpen(true);
    setActiveIndex(-1);
  }, [disabled, computePosition]);

  const closeList = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const selectOption = useCallback(
    (opt: SearchOption) => {
      setQuery(opt.label);
      onChange?.(opt.value);
      closeList();
    },
    [onChange, closeList],
  );

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        listRef.current != null &&
        !listRef.current.contains(target) &&
        wrapperRef.current != null &&
        !wrapperRef.current.contains(target)
      ) {
        closeList();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, closeList]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      openList();
      return;
    }
    if (e.key === 'Escape') { closeList(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => {
        const next = prev < filtered.length - 1 ? prev + 1 : 0;
        itemRefs.current[next]?.focus();
        return next;
      });
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => {
        const next = prev > 0 ? prev - 1 : filtered.length - 1;
        itemRefs.current[next]?.focus();
        return next;
      });
    }
    if (e.key === 'Enter' && activeIndex >= 0) {
      const opt = filtered[activeIndex];
      if (opt != null) selectOption(opt);
    }
  };

  // Drives <CommandItem> — the exact row component the site-wide search
  // palette uses (Command.tsx) — off this component's own state instead of
  // mounting a full <Command>+<CommandInput>. `query` is deliberately left
  // as '' here: filtering already happened above via `filtered`, and a
  // non-empty query would make CommandItem re-filter against label/value
  // text alone, silently dropping options that only matched on description.
  const commandContextValue: CommandContextValue = {
    query: '',
    setQuery: () => {},
    activeIndex,
    setActiveIndex,
    itemRefs,
    inputId,
    onClose: closeList,
  };

  return (
    <div ref={wrapperRef} className={cn('search-dropdown', className)}>
      <input
        id={inputId}
        type="text"
        className={cn('search-dropdown-input input', disabled && 'opacity-40')}
        placeholder={placeholder}
        value={query}
        disabled={disabled}
        autoComplete="off"
        onFocus={openList}
        onChange={e => { setQuery(e.target.value); setActiveIndex(-1); if (!open) openList(); }}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-autocomplete="list"
      />
      {open &&
        typeof document !== 'undefined' &&
        ReactDOM.createPortal(
          <div
            ref={listRef}
            className="search-dropdown-popover"
            style={{ top: position.top, left: position.left, width: position.width }}
          >
            <div className="command search-dropdown-command">
              <CommandList>
                {isLoading && <div className="command-empty">Loading…</div>}
                {!isLoading && filtered.length === 0 && (
                  <div className="command-empty">No results.</div>
                )}
                {!isLoading && filtered.length > 0 && (
                  <CommandContext.Provider value={commandContextValue}>
                    <CommandGroup>
                      {filtered.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          value={opt.label}
                          selected={opt.value === value}
                          onSelect={() => selectOption(opt)}
                        >
                          <span className="command-item-text">
                            <span className="command-item-label">{opt.label}</span>
                            {opt.description != null && (
                              <span className="command-item-description">{opt.description}</span>
                            )}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandContext.Provider>
                )}
              </CommandList>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@/lib/cn';
import { CalendarPicker } from './CalendarPicker';

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

function formatDate(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = MONTH_SHORT[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function parseDate(raw: string): Date | null {
  const trimmed = raw.trim();
  // Try "DD MMM YYYY"
  const match = trimmed.match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (match != null) {
    const [, dayStr, monthStr, yearStr] = match;
    const monthIdx = MONTH_SHORT.findIndex(
      m => m.toLowerCase() === (monthStr ?? '').toLowerCase(),
    );
    if (monthIdx !== -1) {
      const d = new Date(Number(yearStr), monthIdx, Number(dayStr));
      if (!isNaN(d.getTime())) return d;
    }
  }
  // Fall back to native parse
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) return d;
  return null;
}

interface DateInputProps {
  readonly value?: Date | null;
  readonly onChange?: (date: Date | null) => void;
  readonly placeholder?: string;
  readonly hasError?: boolean;
  readonly disabled?: boolean;
  readonly minDate?: Date;
  readonly maxDate?: Date;
  readonly className?: string;
}

export function DateInput({
  value,
  onChange,
  placeholder = 'DD MMM YYYY',
  hasError = false,
  disabled = false,
  minDate,
  maxDate,
  className,
}: DateInputProps): React.ReactElement {
  const [inputText, setInputText] = useState(value != null ? formatDate(value) : '');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setInputText(value != null ? formatDate(value) : '');
  }, [value]);

  const openPopover = useCallback(() => {
    if (disabled) return;
    const wrapper = wrapperRef.current;
    if (wrapper == null) return;
    const rect = wrapper.getBoundingClientRect();
    setPopoverPos({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
    });
    setPopoverOpen(true);
  }, [disabled]);

  const closePopover = useCallback(() => setPopoverOpen(false), []);

  const handleDateSelect = useCallback(
    (date: Date) => {
      onChange?.(date);
      setInputText(formatDate(date));
      closePopover();
    },
    [onChange, closePopover],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === '') {
        onChange?.(null);
        return;
      }
      const parsed = parseDate(raw);
      if (parsed != null) {
        onChange?.(parsed);
        setInputText(formatDate(parsed));
      } else {
        // Revert to current value
        setInputText(value != null ? formatDate(value) : '');
      }
    },
    [onChange, value],
  );

  useEffect(() => {
    if (!popoverOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current != null &&
        !popoverRef.current.contains(target) &&
        wrapperRef.current != null &&
        !wrapperRef.current.contains(target)
      ) {
        closePopover();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopover();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [popoverOpen, closePopover]);

  return (
    <div ref={wrapperRef} className={cn('date-input', className)}>
      <input
        type="text"
        className={cn('input', hasError && 'is-error')}
        placeholder={placeholder}
        value={inputText}
        disabled={disabled}
        onChange={e => setInputText(e.target.value)}
        onFocus={openPopover}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {popoverOpen &&
        typeof document !== 'undefined' &&
        ReactDOM.createPortal(
          <div
            ref={popoverRef}
            className="date-input-popover"
            style={{ top: popoverPos.top, left: popoverPos.left }}
          >
            <CalendarPicker
              value={value}
              onChange={handleDateSelect}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabled}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}

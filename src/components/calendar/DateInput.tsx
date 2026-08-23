'use client';

import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@/lib/cn';
import { formatDateShort, parseDateInput } from '@/lib/date';
import { Icon } from '@/components/icons/Icon';
import { useGravity } from '@/hooks/useGravity';
import { Calendar, type CalendarSize } from './Calendar';
import type { WeekStart } from '@/hooks/useCalendar';

/**
 * First-frame estimate only. The popover is measured as soon as it exists and
 * repositioned, so this figure decides the flip for one frame at most — it is
 * deliberately generous rather than accurate, since guessing too short would
 * open a md calendar off the bottom of the window.
 */
const POPOVER_ESTIMATED_HEIGHT = 380;
const POPOVER_OFFSET = 4;
/** Keeps the popover off the very edge when a field sits near the viewport's. */
const POPOVER_VIEWPORT_MARGIN = 8;

/* Everything a native text input accepts, minus the four props this component
   redefines in Date terms (value/onChange) or fixes outright (type/role). */
type NativeFieldProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'value' | 'defaultValue' | 'onChange' | 'type' | 'role'
>;

export interface DateInputProps extends NativeFieldProps {
  readonly value?: Date | null;
  readonly onChange?: (date: Date | null) => void;
  readonly hasError?: boolean;
  /**
   * Float-label variant, identical to Input: the string starts inside the
   * field as placeholder text and floats above on focus or when filled.
   */
  readonly floatLabel?: string;
  /** Strips the bottom underline for use inside an already-bounded surface. */
  readonly borderless?: boolean;
  readonly minDate?: Date | null;
  readonly maxDate?: Date | null;
  readonly weekStartsOn?: WeekStart;
  readonly calendarSize?: CalendarSize;
}

/**
 * Text field in DD MMM YYYY format with a popover Calendar. The field owns the
 * value; the calendar is a secondary way in. Down arrow (or the trailing
 * button) opens the popover and moves focus into the grid; Escape closes it and
 * returns focus to the field.
 *
 * Sizing follows the same rule as Input: the control scales off its own
 * font-size, so `style={{ fontSize: '1.5rem' }}` on the component takes the
 * text, the trailing icon and the reserved gutter with it.
 */
export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(function DateInput({
  value = null,
  onChange,
  placeholder = 'DD MMM YYYY',
  hasError = false,
  floatLabel,
  borderless = false,
  disabled = false,
  minDate = null,
  maxDate = null,
  weekStartsOn = 1,
  calendarSize = 'sm',
  className,
  style,
  id,
  onKeyDown: onKeyDownProp,
  onBlur: onBlurProp,
  ...fieldProps
}: DateInputProps, ref): React.ReactElement {
  // The field is only "dirty" while the user is mid-edit: draft holds the raw
  // keystrokes, and clearing it hands display back to the formatted value. That
  // keeps the value prop as the single source of truth with no sync effect.
  const [draft, setDraft] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const shouldFocusGrid = useRef(false);

  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const popoverId = `${fieldId}-calendar`;

  // Gravity rides the wrapper, not the field: the trailing button is absolutely
  // positioned against it, so pulling the two separately would slide the icon
  // out of the gutter it sits in.
  useGravity(wrapperRef);

  const mergedRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref != null) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    },
    [ref],
  );

  const inputText = draft ?? (value != null ? formatDateShort(value) : '');

  const updatePosition = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (wrapper == null) return;
    const rect = wrapper.getBoundingClientRect();
    // Measure the popover once it exists; the estimate only covers the first
    // frame, and it can't know the difference between a sm and an md calendar.
    const popover = popoverRef.current;
    const height = popover?.offsetHeight ?? POPOVER_ESTIMATED_HEIGHT;
    const width = popover?.offsetWidth ?? 0;
    const spaceBelow = window.innerHeight - rect.bottom;
    const flipAbove = spaceBelow < height && rect.top > height;

    // Clamped horizontally: a field near the right edge would otherwise open a
    // popover that runs off the viewport, which on mobile is most of them.
    const maxLeft = window.innerWidth - width - POPOVER_VIEWPORT_MARGIN;
    const left = Math.max(POPOVER_VIEWPORT_MARGIN, Math.min(rect.left, maxLeft));

    setPosition({
      top: flipAbove
        ? rect.top + window.scrollY - height - POPOVER_OFFSET
        : rect.bottom + window.scrollY + POPOVER_OFFSET,
      left: left + window.scrollX,
    });
  }, []);

  const open = useCallback(
    (focusGrid: boolean) => {
      if (disabled) return;
      shouldFocusGrid.current = focusGrid;
      updatePosition();
      setIsOpen(true);
    },
    [disabled, updatePosition],
  );

  const close = useCallback((returnFocus: boolean) => {
    setIsOpen(false);
    shouldFocusGrid.current = false;
    if (returnFocus) inputRef.current?.focus();
  }, []);

  const commitText = useCallback(
    (raw: string) => {
      setDraft(null);
      if (raw.trim() === '') {
        onChange?.(null);
        return;
      }
      // An unparseable entry falls back to the last good value on display.
      const parsed = parseDateInput(raw);
      if (parsed != null) onChange?.(parsed);
    },
    [onChange],
  );

  const handleDateSelect = useCallback(
    (date: Date) => {
      setDraft(null);
      onChange?.(date);
      close(true);
    },
    [onChange, close],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDownProp?.(event);
      if (event.defaultPrevented) return;
      if (event.key === 'ArrowDown' && !isOpen) {
        event.preventDefault();
        open(true);
        return;
      }
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        commitText(event.currentTarget.value);
        close(false);
      }
    },
    [isOpen, open, close, commitText, onKeyDownProp],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      commitText(event.target.value);
      onBlurProp?.(event);
    },
    [commitText, onBlurProp],
  );

  // Reposition against the real popover the frame after it mounts. Opening has
  // to place it before it exists, which is the one moment the size estimate is
  // load-bearing; this replaces the guess with a measurement.
  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
  }, [isOpen, updatePosition]);

  // Move focus into the grid once the popover has mounted, but only when it
  // was opened deliberately by keyboard or the trigger button.
  useEffect(() => {
    if (!isOpen || !shouldFocusGrid.current) return;
    const focusable = popoverRef.current?.querySelector<HTMLElement>('.calendar-day[tabindex="0"]');
    focusable?.focus();
    shouldFocusGrid.current = false;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (
        popoverRef.current?.contains(target) === true ||
        wrapperRef.current?.contains(target) === true
      ) {
        return;
      }
      close(false);
    };
    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') close(true);
    };
    // The popover is a non-modal dialog, so focus is deliberately not trapped —
    // Tab walks out of it. Without this it would then hang open over unrelated
    // content with no visible relationship to whatever now has focus, which is
    // exactly the "keyboard trap in reverse" that leaves a screen-reader user
    // stranded. Tabbing away dismisses it instead, without stealing focus back.
    const handleFocusIn = (event: FocusEvent): void => {
      const target = event.target as Node | null;
      if (target == null) return;
      if (popoverRef.current?.contains(target) === true) return;
      if (wrapperRef.current?.contains(target) === true) return;
      close(false);
    };
    const handleReflow = (): void => updatePosition();

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKey);
    document.addEventListener('focusin', handleFocusIn);
    window.addEventListener('scroll', handleReflow, true);
    window.addEventListener('resize', handleReflow);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('scroll', handleReflow, true);
      window.removeEventListener('resize', handleReflow);
    };
  }, [isOpen, close, updatePosition]);

  const field = (
    <input
      {...fieldProps}
      ref={mergedRef}
      id={fieldId}
      type="text"
      role="combobox"
      className={cn(
        'input',
        'date-input-field',
        floatLabel != null && 'input--float',
        borderless && 'input--borderless',
        hasError && 'is-error',
      )}
      /* The float label needs :placeholder-shown to stay reliable, so it takes
         over the placeholder slot entirely. */
      placeholder={floatLabel != null ? ' ' : placeholder}
      value={inputText}
      disabled={disabled}
      aria-invalid={hasError}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={isOpen ? popoverId : undefined}
      onChange={event => setDraft(event.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      autoComplete="off"
    />
  );

  return (
    <div
      ref={wrapperRef}
      className={cn('date-input', floatLabel != null && 'date-input--float', className)}
      style={style}
    >
      {floatLabel != null ? (
        <div className="input-float-field">
          {field}
          <label htmlFor={fieldId} className="input-float-label">
            {floatLabel}
          </label>
        </div>
      ) : (
        field
      )}
      <button
        type="button"
        className="btn btn-icon date-input-trigger"
        disabled={disabled}
        aria-label={isOpen ? 'Close calendar' : 'Open calendar'}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? close(true) : open(true))}
      >
        <Icon name="calendar-date" size="em" />
      </button>

      {isOpen &&
        typeof document !== 'undefined' &&
        ReactDOM.createPortal(
          <div
            ref={popoverRef}
            id={popoverId}
            role="dialog"
            aria-modal="false"
            aria-label="Choose date"
            className="date-input-popover"
            style={{ top: position.top, left: position.left }}
          >
            <Calendar
              size={calendarSize}
              value={value}
              onChange={handleDateSelect}
              minDate={minDate}
              maxDate={maxDate}
              weekStartsOn={weekStartsOn}
              disabled={disabled}
              showDateFields={false}
            />
          </div>,
          document.body,
        )}
    </div>
  );
});

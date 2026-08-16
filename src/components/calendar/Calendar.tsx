'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import {
  formatDateShort,
  isBeforeDay,
  isSameDay,
  isSameMonth,
  parseDateInput,
  toDateKey,
} from '@/lib/date';
import { useGravityWithin } from '@/hooks/useGravity';
import {
  DAYS_IN_WEEK,
  MONTH_NAMES,
  MONTH_NAMES_SHORT,
  YEARS_PER_PAGE,
  useCalendar,
  type CalendarDay,
  type CalendarMode,
  type DateRange,
  type WeekStart,
} from '@/hooks/useCalendar';
import { Icon } from '@/components/icons/Icon';

export type { DateRange, CalendarMode, WeekStart };

export type CalendarSize = 'sm' | 'md';

export type MonthLabelFormat = 'short' | 'long';

/** Everything a custom day renderer needs; MediaCalendar builds on this. */
export interface CalendarDayContext {
  readonly day: CalendarDay;
  readonly dayNumber: number;
  readonly dateKey: string;
}

interface CalendarBaseProps {
  readonly size?: CalendarSize;
  readonly minDate?: Date | null;
  readonly maxDate?: Date | null;
  readonly disabled?: boolean;
  readonly weekStartsOn?: WeekStart;
  /** Controlled month in view. Pair with onMonthChange. */
  readonly month?: Date | null;
  readonly defaultMonth?: Date | null;
  readonly onMonthChange?: (month: Date) => void;
  readonly showOutsideDays?: boolean;
  readonly showTodayButton?: boolean;
  readonly showWeekdays?: boolean;
  /**
   * Month name in the header. Short by default — the header is a control strip,
   * not a title, and "September 2026" pushes the Today button and nav arrows
   * around as the months change width. The accessible name stays the full month
   * either way, so nothing is lost to assistive tech.
   */
  readonly monthLabelFormat?: MonthLabelFormat;
  /**
   * Typable `DD MMM YYYY` field(s) beneath the grid — one in single mode, a
   * From/To pair in range mode. Off for custom day renderers (the media grid
   * is a display surface, not a picker) and inside DateInput, where the
   * trigger field already does the job.
   */
  readonly showDateFields?: boolean;
  /** Replaces the day number with custom cell content (image, dot, badge…). */
  readonly renderDay?: (context: CalendarDayContext) => React.ReactNode;
  /**
   * Extends a cell's accessible name. Custom cell content is decorative to
   * assistive tech — the button is named by the date alone — so a renderer that
   * conveys extra meaning visually (a thumbnail, a badge) has to say so here or
   * it says nothing at all.
   */
  readonly getDayLabel?: (context: CalendarDayContext, defaultLabel: string) => string;
  readonly className?: string;
  readonly id?: string;
  readonly 'aria-label'?: string;
}

interface CalendarSingleProps extends CalendarBaseProps {
  readonly mode?: 'single';
  readonly value?: Date | null;
  readonly onChange?: (date: Date) => void;
}

interface CalendarRangeProps extends CalendarBaseProps {
  readonly mode: 'range';
  readonly value?: DateRange | null;
  readonly onChange?: (range: DateRange) => void;
}

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

const SIZE_CLASS: Record<CalendarSize, string> = {
  sm: 'calendar--sm',
  md: 'calendar--md',
};

function isRangeProps(props: CalendarProps): props is CalendarRangeProps {
  return props.mode === 'range';
}

export function Calendar(props: CalendarProps): React.ReactElement {
  const {
    size = 'md',
    minDate = null,
    maxDate = null,
    disabled = false,
    weekStartsOn = 1,
    month = null,
    defaultMonth = null,
    onMonthChange,
    showOutsideDays = true,
    showTodayButton = true,
    showWeekdays = true,
    monthLabelFormat = 'short',
    showDateFields = true,
    renderDay,
    getDayLabel,
    className,
    id,
    'aria-label': ariaLabel = 'Calendar',
  } = props;

  const mode: CalendarMode = isRangeProps(props) ? 'range' : 'single';
  const selected = isRangeProps(props) ? null : props.value ?? null;
  const range = isRangeProps(props) ? props.value ?? null : null;

  // Ref callback, not a ref object: this same ref is attached to three mutually
  // exclusive nodes (day grid, month tiles, year tiles), so it has to rebind as
  // the view switches rather than latch onto whichever mounted first.
  const gridRef = useGravityWithin('.calendar-day, .calendar-tile');
  const dayRefs = useRef(new Map<string, HTMLButtonElement>());

  const handleSelectDate = useCallback(
    (date: Date) => {
      if (isRangeProps(props)) {
        const current = props.value ?? null;
        // Third click restarts the range; second completes it, ordered.
        if (current?.from == null || current.to != null) {
          props.onChange?.({ from: date, to: null });
          return;
        }
        props.onChange?.(
          isBeforeDay(date, current.from)
            ? { from: date, to: current.from }
            : { from: current.from, to: date },
        );
        return;
      }
      props.onChange?.(date);
    },
    [props],
  );

  const calendar = useCalendar({
    mode,
    selected,
    range,
    month,
    defaultMonth,
    minDate,
    maxDate,
    weekStartsOn,
    disabled,
    onMonthChange,
    onSelectDate: handleSelectDate,
  });

  const {
    view, setView, viewDate, viewYear, viewMonth, weekdays, days, months, years,
    yearRangeStart, today, focusedDate, focusViaKeyboard, setHoveredDate,
    canGoPrevious, canGoNext, goPrevious, goNext, goToToday, goToMonth,
    goToYear, goToDate, selectDate, isDateDisabled, handleGridKeyDown,
  } = calendar;

  /* ── Typed dates ───────────────────────────────────────────────────────── */
  // Each handler returns false when the entry is unusable, which is what keeps
  // the offending text on screen (marked invalid) instead of silently reverting.

  const commitSingle = useCallback(
    (date: Date | null): boolean => {
      // A single-mode Calendar has no way to express "no date", so an empty
      // field is a no-op rather than a clear.
      if (date == null || isDateDisabled(date)) return false;
      // keepFocusMode: false — the date was typed, so the caret belongs in the
      // field. Preserving the mode would let a single earlier arrow-key press in
      // the grid yank focus out of the input mid-edit, every commit after it.
      selectDate(date, false);
      return true;
    },
    [isDateDisabled, selectDate],
  );

  const commitRangeFrom = useCallback(
    (date: Date | null): boolean => {
      if (!isRangeProps(props)) return false;
      const current = props.value ?? null;
      if (date == null) {
        props.onChange?.({ from: null, to: current?.to ?? null });
        return true;
      }
      if (isDateDisabled(date)) return false;
      const to = current?.to ?? null;
      // A start past the existing end reopens the range rather than inverting it.
      props.onChange?.(to != null && isBeforeDay(to, date) ? { from: date, to: null } : { from: date, to });
      goToDate(date);
      return true;
    },
    [props, isDateDisabled, goToDate],
  );

  const commitRangeTo = useCallback(
    (date: Date | null): boolean => {
      if (!isRangeProps(props)) return false;
      const current = props.value ?? null;
      if (date == null) {
        props.onChange?.({ from: current?.from ?? null, to: null });
        return true;
      }
      if (isDateDisabled(date)) return false;
      const from = current?.from ?? null;
      // An end before the start swaps them, matching the click behaviour.
      props.onChange?.(
        from != null && isBeforeDay(date, from) ? { from: date, to: from } : { from, to: date },
      );
      goToDate(date);
      return true;
    },
    [props, isDateDisabled, goToDate],
  );

  const showFields = showDateFields && renderDay == null;

  // Keyboard moves pull DOM focus; mount and pointer selection do not.
  useEffect(() => {
    if (view !== 'day' || !focusViaKeyboard) return;
    dayRefs.current.get(toDateKey(focusedDate))?.focus();
  }, [view, focusViaKeyboard, focusedDate]);

  // Roving tabindex: exactly one cell is tabbable. If the focused date isn't
  // rendered — outside days hidden, or a controlled month moved away from it —
  // the first day of the visible month takes over so Tab never dead-ends.
  const tabbableKey = useMemo(() => {
    const rendered = days.filter(day => showOutsideDays || !day.isOutside);
    const focusedCell = rendered.find(day => day.isFocused);
    if (focusedCell != null) return focusedCell.key;
    return rendered.find(day => !day.isDisabled)?.key ?? rendered[0]?.key ?? null;
  }, [days, showOutsideDays]);

  // A grid's cells must sit inside rows, so the flat 42-cell list is chunked
  // into six weeks. Each row is a real seven-column grid box (see .calendar-row)
  // rather than display: contents, so the layout doesn't hang on one rule.
  const weeks = useMemo(() => {
    const chunks: (readonly CalendarDay[])[] = [];
    for (let index = 0; index < days.length; index += DAYS_IN_WEEK) {
      chunks.push(days.slice(index, index + DAYS_IN_WEEK));
    }
    return chunks;
  }, [days]);

  // Two labels, deliberately: the abbreviation is a visual economy, so every
  // accessible name and announcement keeps the full month.
  const monthName = MONTH_NAMES[viewMonth] ?? '';
  const monthLabel =
    monthLabelFormat === 'short' ? MONTH_NAMES_SHORT[viewMonth] ?? monthName : monthName;
  // Only dead when there is genuinely nowhere to go: today's month on screen in
  // day view with focus already on it. Paging the month leaves focus behind, so
  // testing focus alone wrongly disabled the button the moment you navigated.
  const isTodayInView =
    view === 'day' && isSameMonth(viewDate, today) && isSameDay(focusedDate, today);

  const navLabels: Record<typeof view, readonly [string, string]> = {
    day: ['Previous month', 'Next month'],
    month: ['Previous year', 'Next year'],
    year: [`Previous ${YEARS_PER_PAGE} years`, `Next ${YEARS_PER_PAGE} years`],
  };
  const [previousLabel, nextLabel] = navLabels[view];

  const yearRangeLabel = `${yearRangeStart} to ${yearRangeStart + YEARS_PER_PAGE - 1}`;
  const viewLabel =
    view === 'day'
      ? `${monthName} ${viewYear}`
      : view === 'month'
        ? `Months of ${viewYear}`
        : `Years ${yearRangeLabel}`;

  // Paging the month swaps the grid's contents in place. Nothing about that is
  // announced — the grid's own label changing is silent — so a live region
  // carries it. Seeded empty and only written on a genuine change, so mounting
  // the calendar doesn't read a month at the user unprompted.
  const [announcement, setAnnouncement] = useState('');
  const announcedLabel = useRef(viewLabel);
  useEffect(() => {
    if (announcedLabel.current === viewLabel) return;
    announcedLabel.current = viewLabel;
    setAnnouncement(viewLabel);
  }, [viewLabel]);

  return (
    <div
      className={cn('calendar', SIZE_CLASS[size], disabled && 'calendar--disabled', className)}
      id={id}
      role="group"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
    >
      <div className="sr-only" role="status">{announcement}</div>
      <div className="calendar-header">
        <div className="calendar-title">
          {view === 'day' && (
            <>
              <button
                type="button"
                className="btn calendar-title-btn"
                onClick={() => setView('month')}
                disabled={disabled}
                aria-label={`${monthName} — choose month`}
              >
                {monthLabel}
              </button>
              <button
                type="button"
                className="btn calendar-title-btn"
                onClick={() => setView('year')}
                disabled={disabled}
                aria-label={`${viewYear} — choose year`}
              >
                {viewYear}
              </button>
            </>
          )}
          {view === 'month' && (
            <button
              type="button"
              className="btn calendar-title-btn"
              onClick={() => setView('year')}
              disabled={disabled}
              aria-label={`${viewYear} — choose year`}
            >
              {viewYear}
            </button>
          )}
          {view === 'year' && (
            <span className="calendar-title-static">
              {/* The en dash is a typographic nicety a screen reader reads as
                  "to" at best and skips at worst, so the range is spelled out. */}
              <span aria-hidden="true">
                {yearRangeStart}–{yearRangeStart + YEARS_PER_PAGE - 1}
              </span>
              <span className="sr-only">{`Years ${yearRangeLabel}`}</span>
            </span>
          )}
        </div>

        <div className="calendar-actions">
          {showTodayButton && (
            <button
              type="button"
              className="btn calendar-today-btn"
              onClick={goToToday}
              disabled={disabled || isTodayInView}
            >
              Today
            </button>
          )}
          <button
            type="button"
            className="btn btn-icon calendar-nav-btn"
            onClick={goPrevious}
            disabled={!canGoPrevious}
            aria-label={previousLabel}
          >
            <Icon name="arrows-button-left" size="em" />
          </button>
          <button
            type="button"
            className="btn btn-icon calendar-nav-btn"
            onClick={goNext}
            disabled={!canGoNext}
            aria-label={nextLabel}
          >
            <Icon name="arrows-button-right" size="em" />
          </button>
        </div>
      </div>

      {view === 'day' && (
        <div
          ref={gridRef}
          className="calendar-grid"
          role="grid"
          aria-label={`${monthName} ${viewYear}`}
          onKeyDown={handleGridKeyDown}
          onMouseLeave={() => setHoveredDate(null)}
        >
          {showWeekdays && (
            <div className="calendar-row" role="row">
              {weekdays.map(weekday => (
                // Named by the full weekday rather than an <abbr title>, whose
                // tooltip is mouse-only and whose expansion is announced
                // inconsistently across screen readers.
                <div
                  key={weekday.index}
                  className="calendar-weekday"
                  role="columnheader"
                  aria-label={weekday.long}
                >
                  <span aria-hidden="true">{weekday.short}</span>
                </div>
              ))}
            </div>
          )}

          {weeks.map((week, weekIndex) => (
            <div className="calendar-row" role="row" key={week[0]?.key ?? weekIndex}>
              {week.map(day => {
                if (day.isOutside && !showOutsideDays) {
                  return <div key={day.key} className="calendar-day-blank" role="gridcell" />;
                }

                const dateKey = toDateKey(day.date);
                const dayNumber = day.date.getDate();
                const defaultLabel = day.date.toLocaleDateString('en-GB', {
                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                });

                return (
                  <button
                    key={day.key}
                    type="button"
                    role="gridcell"
                    data-cursor="dot"
                    data-date={dateKey}
                    ref={node => {
                      if (node != null) dayRefs.current.set(dateKey, node);
                      else dayRefs.current.delete(dateKey);
                    }}
                    className={cn(
                      'calendar-day',
                      day.isOutside && 'calendar-day--outside',
                      day.isToday && 'calendar-day--today',
                      day.isSelected && 'calendar-day--selected',
                      day.isInRange && 'calendar-day--in-range',
                      day.isRangeStart && 'calendar-day--range-start',
                      day.isRangeEnd && 'calendar-day--range-end',
                      day.isDisabled && 'calendar-day--disabled',
                      renderDay != null && 'calendar-day--custom',
                    )}
                    tabIndex={day.key === tabbableKey ? 0 : -1}
                    /* Only the days that are actually selected carry the
                       attribute. Setting it false on the other 41 has a screen
                       reader announce "not selected" on every arrow press. In
                       range mode the whole band counts as selected, not just
                       the two endpoints. */
                    aria-selected={day.isSelected || day.isInRange ? true : undefined}
                    aria-current={day.isToday ? 'date' : undefined}
                    /* The date is the name; the number (or the custom content)
                       is decoration, so it isn't read twice. */
                    aria-label={
                      getDayLabel != null
                        ? getDayLabel({ day, dayNumber, dateKey }, defaultLabel)
                        : defaultLabel
                    }
                    disabled={day.isDisabled}
                    onClick={() => selectDate(day.date)}
                    onMouseEnter={() => setHoveredDate(day.date)}
                    onFocus={() => setHoveredDate(day.date)}
                  >
                    <span className="calendar-day-content" aria-hidden="true">
                      {renderDay != null
                        ? renderDay({ day, dayNumber, dateKey })
                        : <span className="calendar-day-number">{dayNumber}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Not a grid. role="grid" promises two-dimensional arrow-key navigation
          and a roving tabindex; the tiles have neither, and claiming the role
          would leave a screen reader user pressing arrows to no effect. Twelve
          plain buttons in a labelled group is what this actually is, and Tab
          reaches every one of them. */}
      {view === 'month' && (
        <div ref={gridRef} className="calendar-tiles" role="group" aria-label={`Months of ${viewYear}`}>
          {months.map(monthCell => (
            <button
              key={monthCell.month}
              type="button"
              data-cursor="dot"
              className={cn(
                'calendar-tile',
                monthCell.isCurrent && 'calendar-tile--current',
                monthCell.isSelected && 'calendar-tile--selected',
                monthCell.isDisabled && 'calendar-tile--disabled',
              )}
              aria-current={monthCell.isSelected ? true : undefined}
              aria-label={MONTH_NAMES[monthCell.month]}
              disabled={monthCell.isDisabled}
              onClick={() => goToMonth(monthCell.month)}
            >
              <span aria-hidden="true">{monthCell.label}</span>
            </button>
          ))}
        </div>
      )}

      {view === 'year' && (
        <div
          ref={gridRef}
          className="calendar-tiles"
          role="group"
          aria-label={`Years ${yearRangeLabel}`}
        >
          {years.map(yearCell => (
            <button
              key={yearCell.year}
              type="button"
              data-cursor="dot"
              className={cn(
                'calendar-tile',
                yearCell.isCurrent && 'calendar-tile--current',
                yearCell.isSelected && 'calendar-tile--selected',
                yearCell.isDisabled && 'calendar-tile--disabled',
              )}
              aria-current={yearCell.isSelected ? true : undefined}
              disabled={yearCell.isDisabled}
              onClick={() => goToYear(yearCell.year)}
            >
              {yearCell.year}
            </button>
          ))}
        </div>
      )}

      {showFields && (
        <div className={cn('calendar-fields', mode === 'range' && 'calendar-fields--range')}>
          {mode === 'range' ? (
            <>
              <CalendarDateField
                label="From"
                hideLabel
                value={range?.from ?? null}
                disabled={disabled}
                onCommit={commitRangeFrom}
              />
              {/* Same chevron the month nav uses, so the separator reads as
                  chrome of a piece with the header rather than as content. */}
              <span className="calendar-fields-arrow" aria-hidden="true">
                <Icon name="arrows-button-right" size="em" />
              </span>
              <CalendarDateField
                label="To"
                hideLabel
                value={range?.to ?? null}
                disabled={disabled}
                onCommit={commitRangeTo}
              />
            </>
          ) : (
            <CalendarDateField
              label="Date"
              hideLabel
              value={selected}
              disabled={disabled}
              onCommit={commitSingle}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ─── DATE FIELD ──────────────────────────────────────────────────────────── */

interface CalendarDateFieldProps {
  readonly label: string;
  /** Keeps the label for screen readers only — a lone field needs no caption. */
  readonly hideLabel?: boolean;
  readonly value: Date | null;
  readonly disabled: boolean;
  /** Returns false when the date is unusable, which flags the field invalid. */
  readonly onCommit: (date: Date | null) => boolean;
}

const DATE_PLACEHOLDER = 'DD MMM YYYY';
/** Spelled out for the screen-reader hint — "DD MMM YYYY" is read as letters. */
const DATE_EXAMPLE = '24 Jul 2026';

/**
 * The field is only "dirty" while being edited: `draft` holds raw keystrokes
 * and clearing it hands display back to the committed value, so the calendar
 * stays the single source of truth with no sync effect.
 */
function CalendarDateField({
  label,
  hideLabel = false,
  value,
  disabled,
  onCommit,
}: CalendarDateFieldProps): React.ReactElement {
  const [draft, setDraft] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const baseId = useId();
  const fieldId = `${baseId}-input`;
  const hintId = `${baseId}-hint`;
  const errorId = `${baseId}-error`;

  const text = draft ?? (value != null ? formatDateShort(value) : '');

  const commit = useCallback(
    (raw: string): void => {
      const trimmed = raw.trim();
      if (trimmed === '') {
        // Clearing only lands where the consumer accepts an empty value (range
        // endpoints); otherwise the field snaps back to the current selection.
        if (value != null) onCommit(null);
        setDraft(null);
        setIsInvalid(false);
        return;
      }
      const parsed = parseDateInput(trimmed);
      if (parsed == null || !onCommit(parsed)) {
        // Keep what was typed so it can be corrected rather than retyped.
        setIsInvalid(true);
        return;
      }
      setDraft(null);
      setIsInvalid(false);
    },
    [onCommit, value],
  );

  const revert = useCallback((): void => {
    setDraft(null);
    setIsInvalid(false);
  }, []);

  return (
    <div className="calendar-field">
      <label className={cn('calendar-field-label', hideLabel && 'sr-only')} htmlFor={fieldId}>
        {label}
      </label>
      <input
        id={fieldId}
        type="text"
        className={cn('input', 'calendar-field-input', isInvalid && 'is-error')}
        value={text}
        placeholder={DATE_PLACEHOLDER}
        disabled={disabled}
        autoComplete="off"
        spellCheck={false}
        /* No inputMode="numeric": the format wants a month name, and a numeric
           keypad has no letters on it. */
        aria-invalid={isInvalid}
        aria-describedby={cn(hintId, isInvalid && errorId)}
        onChange={event => {
          setDraft(event.target.value);
          setIsInvalid(false);
        }}
        onKeyDown={event => {
          // The grid owns arrow keys; typing here must not steer the calendar.
          event.stopPropagation();
          if (event.key === 'Enter') {
            event.preventDefault();
            commit(event.currentTarget.value);
          } else if (event.key === 'Escape') {
            event.preventDefault();
            revert();
          }
        }}
        onBlur={event => commit(event.target.value)}
      />
      {/* The placeholder disappears the moment anything is typed and is never
          exposed as a description, so the accepted format lives here instead —
          permanently attached to the field, read on focus. */}
      <span id={hintId} className="sr-only">
        {`Format: day, short month, year. For example, ${DATE_EXAMPLE}.`}
      </span>
      {/* Colour on the underline is the only sighted cue otherwise, which fails
          both error identification and use-of-colour. Kept to two words so it
          survives the narrow range columns. */}
      {isInvalid && (
        <p id={errorId} className="calendar-field-error" role="alert">
          Invalid date
        </p>
      )}
    </div>
  );
}

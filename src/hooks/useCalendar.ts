'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  addDays,
  addMonths,
  addYears,
  clampDate,
  isAfterDay,
  isBeforeDay,
  isSameDay,
  isSameMonth,
  isWithinDays,
  startOfDay,
  MONTH_LABELS_SHORT,
} from '@/lib/date';
import { useToday } from './useToday';

/* ─── TYPES ───────────────────────────────────────────────────────────────── */

export type CalendarMode = 'single' | 'range';
export type CalendarView = 'day' | 'month' | 'year';
export type WeekStart = 0 | 1;

export interface DateRange {
  readonly from: Date | null;
  readonly to: Date | null;
}

export interface CalendarDay {
  readonly date: Date;
  readonly key: string;
  /** Belongs to a month either side of the one in view. */
  readonly isOutside: boolean;
  readonly isToday: boolean;
  readonly isSelected: boolean;
  readonly isRangeStart: boolean;
  readonly isRangeEnd: boolean;
  readonly isInRange: boolean;
  readonly isDisabled: boolean;
  readonly isFocused: boolean;
}

export interface CalendarMonthCell {
  readonly month: number;
  readonly label: string;
  readonly isCurrent: boolean;
  readonly isSelected: boolean;
  readonly isDisabled: boolean;
}

export interface CalendarYearCell {
  readonly year: number;
  readonly isCurrent: boolean;
  readonly isSelected: boolean;
  readonly isDisabled: boolean;
}

interface FocusState {
  readonly date: Date;
  /** Only keyboard-driven moves pull DOM focus, so mounting never steals it. */
  readonly viaKeyboard: boolean;
}

export interface UseCalendarOptions {
  readonly mode: CalendarMode;
  readonly selected: Date | null;
  readonly range: DateRange | null;
  readonly month: Date | null;
  readonly defaultMonth: Date | null;
  readonly minDate: Date | null;
  readonly maxDate: Date | null;
  readonly weekStartsOn: WeekStart;
  readonly disabled: boolean;
  readonly onMonthChange?: (month: Date) => void;
  readonly onSelectDate: (date: Date) => void;
}

export interface UseCalendarResult {
  readonly view: CalendarView;
  readonly setView: (view: CalendarView) => void;
  readonly viewDate: Date;
  readonly viewYear: number;
  readonly viewMonth: number;
  readonly weekdays: readonly WeekdayLabel[];
  readonly days: readonly CalendarDay[];
  readonly months: readonly CalendarMonthCell[];
  readonly years: readonly CalendarYearCell[];
  readonly yearRangeStart: number;
  /** Today at local midnight, reconciled after hydration and across midnight. */
  readonly today: Date;
  readonly focusedDate: Date;
  readonly focusViaKeyboard: boolean;
  readonly hoveredDate: Date | null;
  readonly setHoveredDate: (date: Date | null) => void;
  readonly canGoPrevious: boolean;
  readonly canGoNext: boolean;
  readonly goPrevious: () => void;
  readonly goNext: () => void;
  readonly goToToday: () => void;
  readonly goToMonth: (month: number) => void;
  readonly goToYear: (year: number) => void;
  /** Brings a date into view without selecting it (used by the date fields). */
  readonly goToDate: (date: Date) => void;
  /**
   * Selects a date. `keepFocusMode` defaults to true, which preserves whichever
   * focus mode is current — a click keeps focus where it is, an Enter on a cell
   * keeps focus in the grid. Pass false when the selection came from outside the
   * grid (a typed date, say) so the grid doesn't pull DOM focus off the field.
   */
  readonly selectDate: (date: Date, keepFocusMode?: boolean) => void;
  readonly isDateDisabled: (date: Date) => boolean;
  readonly handleGridKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export interface WeekdayLabel {
  readonly short: string;
  readonly long: string;
  readonly index: number;
}

/* ─── CONSTANTS ───────────────────────────────────────────────────────────── */

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

/** Re-exported so consumers get month labels from the calendar surface. */
export const MONTH_NAMES_SHORT = MONTH_LABELS_SHORT;

const WEEKDAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
] as const;

const WEEKDAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

/** Six rows always render, so the grid never changes height between months. */
const WEEKS_IN_GRID = 6;
/** Exported so the grid can chunk its flat cell list back into ARIA rows. */
export const DAYS_IN_WEEK = 7;
export const YEARS_PER_PAGE = 12;

/* ─── GRID CONSTRUCTION ───────────────────────────────────────────────────── */

function buildWeekdays(weekStartsOn: WeekStart): readonly WeekdayLabel[] {
  return Array.from({ length: DAYS_IN_WEEK }, (_, offset) => {
    const index = (weekStartsOn + offset) % DAYS_IN_WEEK;
    return {
      index,
      short: WEEKDAY_INITIALS[index] ?? '',
      long: WEEKDAY_NAMES[index] ?? '',
    };
  });
}

function buildMonthGrid(
  year: number,
  month: number,
  weekStartsOn: WeekStart,
): readonly Date[] {
  const firstOfMonth = new Date(year, month, 1);
  const leading = (firstOfMonth.getDay() - weekStartsOn + DAYS_IN_WEEK) % DAYS_IN_WEEK;
  const gridStart = addDays(firstOfMonth, -leading);
  return Array.from({ length: WEEKS_IN_GRID * DAYS_IN_WEEK }, (_, index) =>
    addDays(gridStart, index),
  );
}

/* ─── HOOK ────────────────────────────────────────────────────────────────── */

export function useCalendar(options: UseCalendarOptions): UseCalendarResult {
  const {
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
    onSelectDate,
  } = options;

  const today = useToday();

  const anchorDate = useMemo(() => {
    if (month != null) return startOfDay(month);
    if (defaultMonth != null) return startOfDay(defaultMonth);
    if (mode === 'range' && range?.from != null) return startOfDay(range.from);
    if (selected != null) return startOfDay(selected);
    return today;
  }, [month, defaultMonth, mode, range, selected, today]);

  const [internalViewDate, setInternalViewDate] = useState<Date>(anchorDate);
  const [view, setView] = useState<CalendarView>('day');
  const [focus, setFocus] = useState<FocusState>({ date: anchorDate, viaKeyboard: false });
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // Controlled month wins; otherwise the component owns its own view state.
  const viewDate = month != null ? startOfDay(month) : internalViewDate;
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const setViewDate = useCallback(
    (next: Date) => {
      const normalised = startOfDay(next);
      if (month == null) setInternalViewDate(normalised);
      onMonthChange?.(normalised);
    },
    [month, onMonthChange],
  );

  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      if (disabled) return true;
      if (minDate != null && isBeforeDay(date, minDate)) return true;
      if (maxDate != null && isAfterDay(date, maxDate)) return true;
      return false;
    },
    [disabled, minDate, maxDate],
  );

  /* ── Focus ─────────────────────────────────────────────────────────────── */

  const moveFocusTo = useCallback(
    (next: Date, viaKeyboard: boolean) => {
      const clamped = clampDate(next, minDate, maxDate);
      setFocus({ date: clamped, viaKeyboard });
      if (!isSameMonth(clamped, viewDate)) {
        setViewDate(new Date(clamped.getFullYear(), clamped.getMonth(), 1));
      }
    },
    [minDate, maxDate, viewDate, setViewDate],
  );

  /* ── Navigation ────────────────────────────────────────────────────────── */

  const yearRangeStart = useMemo(
    () => Math.floor(viewYear / YEARS_PER_PAGE) * YEARS_PER_PAGE,
    [viewYear],
  );

  const goPrevious = useCallback(() => {
    if (view === 'day') setViewDate(addMonths(viewDate, -1));
    else if (view === 'month') setViewDate(addYears(viewDate, -1));
    else setViewDate(addYears(viewDate, -YEARS_PER_PAGE));
  }, [view, viewDate, setViewDate]);

  const goNext = useCallback(() => {
    if (view === 'day') setViewDate(addMonths(viewDate, 1));
    else if (view === 'month') setViewDate(addYears(viewDate, 1));
    else setViewDate(addYears(viewDate, YEARS_PER_PAGE));
  }, [view, viewDate, setViewDate]);

  const goToToday = useCallback(() => {
    setView('day');
    setViewDate(today);
    setFocus({ date: today, viaKeyboard: true });
  }, [today, setViewDate]);

  const goToMonth = useCallback(
    (nextMonth: number) => {
      setViewDate(new Date(viewYear, nextMonth, 1));
      setView('day');
    },
    [viewYear, setViewDate],
  );

  const goToYear = useCallback(
    (nextYear: number) => {
      setViewDate(new Date(nextYear, viewMonth, 1));
      setView('month');
    },
    [viewMonth, setViewDate],
  );

  const goToDate = useCallback(
    (date: Date) => {
      setView('day');
      moveFocusTo(date, false);
    },
    [moveFocusTo],
  );

  const canGoPrevious = useMemo(() => {
    if (disabled) return false;
    if (minDate == null) return true;
    if (view === 'day') {
      const lastDayOfPrevious = new Date(viewYear, viewMonth, 0);
      return !isBeforeDay(lastDayOfPrevious, minDate);
    }
    if (view === 'month') return viewYear - 1 >= minDate.getFullYear();
    return yearRangeStart - 1 >= minDate.getFullYear();
  }, [disabled, minDate, view, viewYear, viewMonth, yearRangeStart]);

  const canGoNext = useMemo(() => {
    if (disabled) return false;
    if (maxDate == null) return true;
    if (view === 'day') {
      const firstDayOfNext = new Date(viewYear, viewMonth + 1, 1);
      return !isAfterDay(firstDayOfNext, maxDate);
    }
    if (view === 'month') return viewYear + 1 <= maxDate.getFullYear();
    return yearRangeStart + YEARS_PER_PAGE <= maxDate.getFullYear();
  }, [disabled, maxDate, view, viewYear, viewMonth, yearRangeStart]);

  /* ── Selection ─────────────────────────────────────────────────────────── */

  const selectDate = useCallback(
    (date: Date, keepFocusMode = true) => {
      if (isDateDisabled(date)) return;
      const normalised = startOfDay(date);
      setFocus(current => ({
        date: normalised,
        viaKeyboard: keepFocusMode ? current.viaKeyboard : false,
      }));
      if (!isSameMonth(normalised, viewDate)) {
        setViewDate(new Date(normalised.getFullYear(), normalised.getMonth(), 1));
      }
      onSelectDate(normalised);
    },
    [isDateDisabled, onSelectDate, viewDate, setViewDate],
  );

  /* ── Cells ─────────────────────────────────────────────────────────────── */

  const weekdays = useMemo(() => buildWeekdays(weekStartsOn), [weekStartsOn]);

  const days = useMemo<readonly CalendarDay[]>(() => {
    const grid = buildMonthGrid(viewYear, viewMonth, weekStartsOn);
    const rangeFrom = range?.from ?? null;
    const rangeTo = range?.to ?? null;
    // While picking the second endpoint, the hovered day previews the band.
    const previewTo =
      mode === 'range' && rangeFrom != null && rangeTo == null ? hoveredDate : rangeTo;

    return grid.map(date => {
      const isRangeStart =
        mode === 'range' && rangeFrom != null && isSameDay(date, rangeFrom);
      const isRangeEnd =
        mode === 'range' && previewTo != null && isSameDay(date, previewTo);

      let isInRange = false;
      if (mode === 'range' && rangeFrom != null && previewTo != null) {
        const [start, end] = isBeforeDay(previewTo, rangeFrom)
          ? [previewTo, rangeFrom]
          : [rangeFrom, previewTo];
        isInRange = isWithinDays(date, start, end);
      }

      return {
        date,
        key: date.toISOString(),
        isOutside: date.getMonth() !== viewMonth,
        isToday: isSameDay(date, today),
        isSelected:
          mode === 'single'
            ? selected != null && isSameDay(date, selected)
            : isRangeStart || isRangeEnd,
        isRangeStart,
        isRangeEnd,
        isInRange,
        isDisabled: isDateDisabled(date),
        isFocused: isSameDay(date, focus.date),
      };
    });
  }, [
    viewYear, viewMonth, weekStartsOn, mode, range,
    hoveredDate, selected, today, isDateDisabled, focus.date,
  ]);

  const months = useMemo<readonly CalendarMonthCell[]>(() => {
    const selectedDate = mode === 'range' ? range?.from ?? null : selected;
    return MONTH_NAMES_SHORT.map((label, index) => {
      const lastDay = new Date(viewYear, index + 1, 0);
      const firstDay = new Date(viewYear, index, 1);
      const outOfBounds =
        (minDate != null && isBeforeDay(lastDay, minDate)) ||
        (maxDate != null && isAfterDay(firstDay, maxDate));
      return {
        month: index,
        label,
        isCurrent: today.getFullYear() === viewYear && today.getMonth() === index,
        isSelected:
          selectedDate != null &&
          selectedDate.getFullYear() === viewYear &&
          selectedDate.getMonth() === index,
        isDisabled: disabled || outOfBounds,
      };
    });
  }, [mode, range, selected, viewYear, today, minDate, maxDate, disabled]);

  const years = useMemo<readonly CalendarYearCell[]>(() => {
    const selectedDate = mode === 'range' ? range?.from ?? null : selected;
    return Array.from({ length: YEARS_PER_PAGE }, (_, offset) => {
      const year = yearRangeStart + offset;
      const outOfBounds =
        (minDate != null && year < minDate.getFullYear()) ||
        (maxDate != null && year > maxDate.getFullYear());
      return {
        year,
        isCurrent: today.getFullYear() === year,
        isSelected: selectedDate != null && selectedDate.getFullYear() === year,
        isDisabled: disabled || outOfBounds,
      };
    });
  }, [mode, range, selected, yearRangeStart, today, minDate, maxDate, disabled]);

  /* ── Keyboard ──────────────────────────────────────────────────────────── */

  const handleGridKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) return;
      const current = focus.date;
      let next: Date | null = null;

      switch (event.key) {
        case 'ArrowLeft':  next = addDays(current, -1); break;
        case 'ArrowRight': next = addDays(current, 1); break;
        case 'ArrowUp':    next = addDays(current, -DAYS_IN_WEEK); break;
        case 'ArrowDown':  next = addDays(current, DAYS_IN_WEEK); break;
        case 'Home':
          next = addDays(current, -((current.getDay() - weekStartsOn + DAYS_IN_WEEK) % DAYS_IN_WEEK));
          break;
        case 'End':
          next = addDays(
            current,
            DAYS_IN_WEEK - 1 - ((current.getDay() - weekStartsOn + DAYS_IN_WEEK) % DAYS_IN_WEEK),
          );
          break;
        case 'PageUp':
          next = event.shiftKey ? addYears(current, -1) : addMonths(current, -1);
          break;
        case 'PageDown':
          next = event.shiftKey ? addYears(current, 1) : addMonths(current, 1);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          selectDate(current);
          return;
        default:
          return;
      }

      event.preventDefault();
      moveFocusTo(next, true);
    },
    [disabled, focus.date, weekStartsOn, moveFocusTo, selectDate],
  );

  return {
    view,
    setView,
    viewDate,
    viewYear,
    viewMonth,
    weekdays,
    days,
    months,
    years,
    yearRangeStart,
    today,
    focusedDate: focus.date,
    focusViaKeyboard: focus.viaKeyboard,
    hoveredDate,
    setHoveredDate,
    canGoPrevious,
    canGoNext,
    goPrevious,
    goNext,
    goToToday,
    goToMonth,
    goToYear,
    goToDate,
    selectDate,
    isDateDisabled,
    handleGridKeyDown,
  };
}

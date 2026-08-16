'use client';

import { useCallback } from 'react';
import { cn } from '@/lib/cn';
import { toDateKey } from '@/lib/date';
import { Calendar, type CalendarDayContext, type MonthLabelFormat } from './Calendar';
import type { WeekStart } from '@/hooks/useCalendar';

export interface MediaCalendarEntry {
  readonly src: string;
  readonly alt?: string;
}

export interface MediaCalendarProps {
  /** Keyed by local `YYYY-MM-DD`. Days without an entry render an empty ring. */
  readonly entries: Readonly<Record<string, MediaCalendarEntry>>;
  readonly value?: Date | null;
  readonly onChange?: (date: Date, entry: MediaCalendarEntry | null) => void;
  readonly month?: Date | null;
  readonly defaultMonth?: Date | null;
  readonly onMonthChange?: (month: Date) => void;
  readonly minDate?: Date | null;
  readonly maxDate?: Date | null;
  readonly weekStartsOn?: WeekStart;
  /**
   * Leading/trailing days from the adjacent months, dimmed to 20%. On by
   * default, as in the picker — a photo grid with holes at either end reads as
   * missing data rather than as the edge of the month.
   */
  readonly showOutsideDays?: boolean;
  readonly showTodayButton?: boolean;
  /** Defaults to Calendar's abbreviation; pass `long` for an editorial header. */
  readonly monthLabelFormat?: MonthLabelFormat;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly 'aria-label'?: string;
}

/**
 * Photo-grid calendar: each day is a circular thumbnail when an entry exists
 * and a dashed ring when it doesn't. Hovering a filled day fades the image out
 * to reveal the day number; empty days show their number at rest.
 *
 * Built on Calendar's renderDay slot, so keyboard navigation, range/selection
 * semantics and month/year drill-down are identical to the picker.
 */
export function MediaCalendar({
  entries,
  value = null,
  onChange,
  month = null,
  defaultMonth = null,
  onMonthChange,
  minDate = null,
  maxDate = null,
  weekStartsOn = 1,
  showOutsideDays = true,
  showTodayButton = true,
  monthLabelFormat,
  disabled = false,
  className,
  'aria-label': ariaLabel = 'Photo calendar',
}: MediaCalendarProps): React.ReactElement {
  const renderDay = useCallback(
    ({ dayNumber, dateKey }: CalendarDayContext): React.ReactNode => {
      const entry = entries[dateKey] ?? null;
      return (
        <span
          className={cn('calendar-media', entry != null && 'calendar-media--filled')}
          // Swells the cursor into a large preview of this day's image while
          // the thumbnail itself fades out to expose the date beneath it.
          data-cursor-preview={entry?.src}
        >
          {entry != null ? (
            <img
              className="calendar-media-image"
              src={entry.src}
              alt={entry.alt ?? ''}
              loading="lazy"
              draggable={false}
            />
          ) : (
            <span className="calendar-media-ring" aria-hidden="true" />
          )}
          <span className="calendar-media-number body-xs">{dayNumber}</span>
        </span>
      );
    },
    [entries],
  );

  // The thumbnail is decorative to assistive tech (the day button is named by
  // its aria-label), so the presence of a photo has to be folded into that
  // name — otherwise a screen-reader user can't tell filled days from empty
  // ones. Uses the entry's alt text when it has any, since that describes the
  // photo far better than a bare "has photo".
  const getDayLabel = useCallback(
    ({ dateKey }: CalendarDayContext, defaultLabel: string): string => {
      const entry = entries[dateKey] ?? null;
      if (entry == null) return defaultLabel;
      const alt = entry.alt?.trim() ?? '';
      return alt !== '' ? `${defaultLabel}, photo: ${alt}` : `${defaultLabel}, has photo`;
    },
    [entries],
  );

  const handleChange = useCallback(
    (date: Date) => {
      onChange?.(date, entries[toDateKey(date)] ?? null);
    },
    [entries, onChange],
  );

  return (
    <Calendar
      className={cn('calendar--media', className)}
      value={value}
      onChange={handleChange}
      month={month}
      defaultMonth={defaultMonth}
      onMonthChange={onMonthChange}
      minDate={minDate}
      maxDate={maxDate}
      weekStartsOn={weekStartsOn}
      showOutsideDays={showOutsideDays}
      showTodayButton={showTodayButton}
      monthLabelFormat={monthLabelFormat}
      disabled={disabled}
      renderDay={renderDay}
      getDayLabel={getDayLabel}
      aria-label={ariaLabel}
    />
  );
}

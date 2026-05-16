'use client';

import { useCallback, useState } from 'react';
import { cn } from '@/lib/cn';

const DAYS_OF_WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function getMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  // Monday-indexed week: 0=Mon ... 6=Sun
  let dayOfWeek = firstDay.getDay(); // 0=Sun
  dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from<null>({ length: dayOfWeek }).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }

  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

interface CalendarPickerProps {
  readonly value?: Date | null;
  readonly onChange?: (date: Date) => void;
  readonly minDate?: Date;
  readonly maxDate?: Date;
  readonly disabled?: boolean;
  readonly className?: string;
}

export function CalendarPicker({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  className,
}: CalendarPickerProps): React.ReactElement {
  const today = startOfDay(new Date());
  const [viewYear, setViewYear] = useState(
    value != null ? value.getFullYear() : today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    value != null ? value.getMonth() : today.getMonth(),
  );

  const prevMonth = useCallback(() => {
    setViewMonth(m => {
      if (m === 0) { setViewYear(y => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth(m => {
      if (m === 11) { setViewYear(y => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  const cells = getMonthGrid(viewYear, viewMonth);

  const isDisabledDate = (d: Date): boolean => {
    if (disabled) return true;
    if (minDate != null && startOfDay(d) < startOfDay(minDate)) return true;
    if (maxDate != null && startOfDay(d) > startOfDay(maxDate)) return true;
    return false;
  };

  return (
    <div className={cn('calendar', className)}>
      <div className="calendar-header">
        <button
          type="button"
          className="calendar-nav-btn btn"
          onClick={prevMonth}
          aria-label="Previous month"
          disabled={disabled}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="calendar-month-label">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          className="calendar-nav-btn btn"
          onClick={nextMonth}
          aria-label="Next month"
          disabled={disabled}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="calendar-grid" role="grid" aria-label={`${MONTH_NAMES[viewMonth]} ${viewYear}`}>
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="calendar-day-header" role="columnheader" aria-label={day}>
            {day}
          </div>
        ))}
        {cells.map((date, idx) => {
          if (date == null) {
            return <div key={`empty-${idx}`} className="calendar-day calendar-day-outside" aria-hidden="true" />;
          }

          const isToday = isSameDay(date, today);
          const isSelected = value != null && isSameDay(date, value);
          const isOtherMonth = date.getMonth() !== viewMonth;
          const isDateDisabled = isDisabledDate(date);

          return (
            <button
              key={date.toISOString()}
              type="button"
              role="gridcell"
              className={cn(
                'calendar-day',
                isToday && 'calendar-day-today',
                isSelected && 'calendar-day-selected',
                isOtherMonth && 'calendar-day-outside',
                isDateDisabled && 'calendar-day-disabled',
              )}
              aria-selected={isSelected}
              aria-label={date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              disabled={isDateDisabled}
              onClick={() => {
                if (!isDateDisabled) onChange?.(date);
              }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

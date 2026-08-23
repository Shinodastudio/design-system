/**
 * Date helpers shared by the calendar components. All operations are
 * local-time and day-granular — the calendar never reasons about hours.
 */

export function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function addDays(date: Date, amount: number): Date {
  const copy = startOfDay(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

export function addMonths(date: Date, amount: number): Date {
  const copy = startOfDay(date);
  const targetDay = copy.getDate();
  copy.setDate(1);
  copy.setMonth(copy.getMonth() + amount);
  const daysInTarget = new Date(copy.getFullYear(), copy.getMonth() + 1, 0).getDate();
  copy.setDate(Math.min(targetDay, daysInTarget));
  return copy;
}

export function addYears(date: Date, amount: number): Date {
  return addMonths(date, amount * 12);
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

export function isWithinDays(date: Date, from: Date, to: Date): boolean {
  const time = startOfDay(date).getTime();
  return time >= startOfDay(from).getTime() && time <= startOfDay(to).getTime();
}

export function clampDate(date: Date, min: Date | null, max: Date | null): Date {
  if (min != null && isBeforeDay(date, min)) return startOfDay(min);
  if (max != null && isAfterDay(date, max)) return startOfDay(max);
  return startOfDay(date);
}

/** Stable local `YYYY-MM-DD` key — safe for lookup maps (no UTC shift). */
export function toDateKey(date: Date): string {
  // Padded, because fromDateKey requires four digits — an unpadded year 50 would
  // produce a key its own parser rejects.
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Month labels shared by the date fields, the tiles and the text parser. */
export const MONTH_LABELS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

/** The one text format the calendar reads and writes: `DD MMM YYYY`. */
export function formatDateShort(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = MONTH_LABELS_SHORT[date.getMonth()];
  return `${day} ${month} ${date.getFullYear()}`;
}

/**
 * Parses typed input against three explicit grammars: `DD MMM YYYY` (canonical),
 * day-first numeric (`24/07/2026`, `24-7-2026`, `24.07.2026`) since the DS is
 * en-GB, and ISO `YYYY-MM-DD` so a date key round-trips. Null = unusable.
 *
 * Deliberately no fall-through to `new Date(string)`. The native parser is
 * implementation-defined for anything but ISO, reads a bare `YYYY-MM-DD` as UTC
 * midnight — which lands on the previous day for every user west of the meridian
 * — and rolls overflow forward, so `2026-02-31` would come back as 2 March. A
 * parser that quietly returns the wrong day is worse than one that returns null.
 */
export function parseDateInput(raw: string): Date | null {
  const trimmed = raw.trim();
  if (trimmed === '') return null;

  const named = trimmed.match(/^(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})$/);
  if (named != null) {
    const [, dayStr, monthStr, yearStr] = named;
    const prefix = (monthStr ?? '').slice(0, 3).toLowerCase();
    const monthIndex = MONTH_LABELS_SHORT.findIndex(m => m.toLowerCase() === prefix);
    if (monthIndex !== -1) {
      return buildDate(Number(yearStr), monthIndex, Number(dayStr));
    }
    return null;
  }

  const numeric = trimmed.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (numeric != null) {
    const [, dayStr, monthStr, yearStr] = numeric;
    return buildDate(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
  }

  const iso = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso != null) {
    const [, yearStr, monthStr, dayStr] = iso;
    return buildDate(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
  }

  return null;
}

/** Rejects overflow (31 Feb rolls into March, which is never what was meant). */
function buildDate(year: number, monthIndex: number, day: number): Date | null {
  if (!Number.isInteger(year) || year < 1 || year > 9999) return null;
  if (monthIndex < 0 || monthIndex > 11 || day < 1 || day > 31) return null;
  const date = new Date(year, monthIndex, day);
  // Years 0–99 are remapped to 1900+ by the Date constructor, so state the year
  // again through the setter, which has no such rule.
  if (year < 100) date.setFullYear(year);
  if (isNaN(date.getTime())) return null;
  if (date.getMonth() !== monthIndex || date.getDate() !== day) return null;
  return startOfDay(date);
}

/**
 * Parses a `YYYY-MM-DD` key back to a local date. Returns null if malformed or
 * if the date doesn't exist, so the round-trip with toDateKey is total.
 */
export function fromDateKey(key: string): Date | null {
  const match = key.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match == null) return null;
  const [, year, month, day] = match;
  return buildDate(Number(year), Number(month) - 1, Number(day));
}

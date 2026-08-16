'use client';

import { useMemo, useState } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { Calendar } from '@/components/calendar/Calendar';
import { MediaCalendar, type MediaCalendarEntry } from '@/components/calendar/MediaCalendar';
import { DateInput } from '@/components/calendar/DateInput';
import {
  INPUT_SIZES,
  INPUT_FONT,
  type InputSize,
} from '@/components/catalogue/inputSizes';
import type { DateRange } from '@/hooks/useCalendar';
import { addDays, toDateKey } from '@/lib/date';

const SIZES = ['sm', 'md'] as const;
const SINGLE_SIZE = ['default'] as const;

/** Stand-in thumbnail so the media grid demonstrates both cell states. */
const SAMPLE_IMAGE = '/home/gallery-colour-light.jpg';

export default function CalendarPage(): React.ReactElement {
  const [pickerDate, setPickerDate] = useState<Date | null>(null);
  const [rangeValue, setRangeValue] = useState<DateRange | null>(null);
  const [inputDate, setInputDate] = useState<Date | null>(null);
  const [floatDate, setFloatDate] = useState<Date | null>(null);
  const [mediaDate, setMediaDate] = useState<Date | null>(null);

  // Two days in three carry an entry, up to today.
  const mediaEntries = useMemo<Record<string, MediaCalendarEntry>>(() => {
    const today = new Date();
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const entries: Record<string, MediaCalendarEntry> = {};
    for (let offset = 0; offset < today.getDate(); offset += 1) {
      if (offset % 3 === 2) continue;
      const date = addDays(firstOfMonth, offset);
      entries[toDateKey(date)] = { src: SAMPLE_IMAGE, alt: `Entry for ${toDateKey(date)}` };
    }
    return entries;
  }, []);

  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Calendar"
            description="Date selection: inline calendar, range picking, month and year drill-down, a text field with popover, and a media grid for photo journals."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="Calendar"
            description="Monday-indexed month grid. Today takes a solid red fill; the selected day takes the inverted fill and outranks it while selected. The header abbreviates the month; monthLabelFormat='long' spells it out. Clicking the month or year opens a tile view. Keyboard: arrows, Home/End, PageUp/PageDown (shift for years), Enter to select. The field below the grid accepts DD MMM YYYY (or 24/07/2026) typed directly — set showDateFields={false} to hide it."
            code={({ size, state }): string =>
              state === 'disabled'
                ? `<Calendar\n  size="${size}"\n  value={date}\n  onChange={setDate}\n  disabled\n/>`
                : `<Calendar\n  size="${size}"\n  value={date}\n  onChange={setDate}\n/>`
            }
            sizes={SIZES}
            defaultSize="md"
            states={['default', 'disabled']}
            render={({ size, state }): React.ReactNode => (
              <Calendar
                size={size}
                value={pickerDate}
                onChange={setPickerDate}
                disabled={state === 'disabled'}
              />
            )}
          />

          <ComponentSection
            name="Calendar — range"
            description="Range mode picks two endpoints. First click sets the start, hovering previews the band, the second click completes it (order-corrected). A third click starts over. The From and To fields take typed dates: an end before the start swaps them, a start past the end reopens the range, and clearing a field empties that endpoint."
            code={'<Calendar\n  mode="range"\n  value={range}\n  onChange={setRange}\n/>'}
            sizes={SINGLE_SIZE}
            states={['default']}
            render={(): React.ReactNode => (
              <Calendar mode="range" value={rangeValue} onChange={setRangeValue} />
            )}
          />

          <ComponentSection
            name="Calendar — bounds"
            description="minDate and maxDate constrain selection, disable out-of-range month and year tiles, and stop the navigation arrows at the boundary."
            code={'<Calendar\n  value={date}\n  onChange={setDate}\n  minDate={new Date()}\n/>'}
            sizes={SINGLE_SIZE}
            states={['default']}
            render={(): React.ReactNode => (
              <Calendar value={pickerDate} onChange={setPickerDate} minDate={new Date()} />
            )}
          />

          <ComponentSection
            name="MediaCalendar"
            description="Photo-journal grid built on Calendar's renderDay slot. Uploaded days render a circular thumbnail; empty days a dashed ring with the number visible. Hovering a filled day fades the image out to reveal the number, and swells the cursor into a large circular preview of that image."
            code={'<MediaCalendar\n  entries={entriesByDateKey}\n  value={date}\n  onChange={(date, entry) => …}\n/>'}
            sizes={SINGLE_SIZE}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ width: '100%' }}>
                <MediaCalendar
                  entries={mediaEntries}
                  value={mediaDate}
                  onChange={(date): void => setMediaDate(date)}
                />
              </div>
            )}
          />

          <ComponentSection
            name="DateInput"
            description="Underline field in DD MMM YYYY format, carrying the same rest, hover, focus and disabled treatment as Input — plus gravity, which pulls field and trigger together. The trailing button or Down arrow opens the popover and moves focus into the grid; Escape closes it and returns focus. Blur parses and validates the typed value."
            code={({ state, size }): string => {
              const props = [
                'value={date}',
                'onChange={setDate}',
                `style={{ fontSize: '${INPUT_FONT[size]}' }}`,
                state === 'disabled' ? 'disabled' : null,
              ].filter((p): p is string => p != null).join('\n  ');
              return `<DateInput\n  ${props}\n/>`;
            }}
            sizes={INPUT_SIZES}
            defaultSize="body-xs"
            states={['default', 'hover', 'focus', 'disabled']}
            render={({ state, size }): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '20em' }}>
                <DateInput
                  value={inputDate}
                  onChange={setInputDate}
                  disabled={state === 'disabled'}
                  className={state === 'disabled' ? 'op-40' : undefined}
                  style={{ fontSize: INPUT_FONT[size as InputSize] }}
                />
              </div>
            )}
          />

          <ComponentSection
            name="DateInput — float label"
            description="Same float-label variant as Input: the caption starts on the text baseline and rises on focus or once a date is set. No separate InputLabel needed."
            code={'<DateInput\n  floatLabel="Published"\n  value={date}\n  onChange={setDate}\n/>'}
            sizes={SINGLE_SIZE}
            states={['default', 'focus', 'disabled']}
            render={({ state }): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '20em' }}>
                <DateInput
                  floatLabel="Published"
                  value={floatDate}
                  onChange={setFloatDate}
                  disabled={state === 'disabled'}
                  className={state === 'disabled' ? 'op-40' : undefined}
                />
              </div>
            )}
          />

          <ComponentSection
            name="DateInput — borderless"
            description="Drops the underline and its block padding for use inside a surface that already draws its own boundary — a filter row or a command sheet."
            code={'<DateInput borderless value={date} onChange={setDate} />'}
            sizes={SINGLE_SIZE}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '20em' }}>
                <DateInput borderless value={inputDate} onChange={setInputDate} />
              </div>
            )}
          />

          <ComponentSection
            name="DateInput — error state"
            description="hasError lifts the underline to status-error. Combine with InputError for the message."
            code={'<DateInput hasError value={null} onChange={setDate} />'}
            sizes={SINGLE_SIZE}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '20em' }}>
                <DateInput value={null} onChange={setInputDate} hasError />
              </div>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}

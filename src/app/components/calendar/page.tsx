'use client';

import { useState } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { CalendarPicker } from '@/components/calendar/CalendarPicker';
import { DateInput } from '@/components/calendar/DateInput';

const SIZES = ['default'] as const;

export default function CalendarPage(): React.ReactElement {
  const [pickerDate, setPickerDate] = useState<Date | null>(null);
  const [inputDate, setInputDate] = useState<Date | null>(null);

  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Calendar"
            description="Date selection: inline calendar picker and text-input with popover calendar."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="CalendarPicker"
            description="Inline month grid. Monday-indexed. Today highlighted; selected date filled. Supports min/max bounds."
            code={({ state }): string =>
              state === 'disabled'
                ? `<CalendarPicker\n  value={date}\n  onChange={setDate}\n  disabled\n/>`
                : `<CalendarPicker\n  value={date}\n  onChange={setDate}\n/>`
            }
            sizes={SIZES}
            states={['default', 'disabled']}
            render={({ state }): React.ReactNode => (
              <CalendarPicker
                value={pickerDate}
                onChange={setPickerDate}
                disabled={state === 'disabled'}
              />
            )}
          />

          <ComponentSection
            name="CalendarPicker with bounds"
            description="minDate and maxDate constrain selectable range. Past dates are rendered disabled."
            code={`<CalendarPicker\n  value={date}\n  onChange={setDate}\n  minDate={new Date()}\n/>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <CalendarPicker
                value={pickerDate}
                onChange={setPickerDate}
                minDate={new Date()}
              />
            )}
          />

          <ComponentSection
            name="DateInput"
            description="Text field in DD MMM YYYY format. Focus opens a popover calendar. Blurring parses and validates the typed value."
            code={({ state }): string =>
              state === 'disabled'
                ? `<DateInput\n  value={date}\n  onChange={setDate}\n  placeholder="DD MMM YYYY"\n  disabled\n/>`
                : `<DateInput\n  value={date}\n  onChange={setDate}\n  placeholder="DD MMM YYYY"\n/>`
            }
            sizes={SIZES}
            states={['default', 'disabled']}
            render={({ state }): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '20em' }}>
                <DateInput
                  value={inputDate}
                  onChange={setInputDate}
                  disabled={state === 'disabled'}
                />
              </div>
            )}
          />

          <ComponentSection
            name="DateInput — error state"
            description="hasError lifts the underline to status-error. Combine with InputError for message."
            code={`<DateInput hasError value={null} onChange={setDate} />`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '20em' }}>
                <DateInput
                  value={null}
                  onChange={setInputDate}
                  hasError
                  placeholder="DD MMM YYYY"
                />
              </div>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}

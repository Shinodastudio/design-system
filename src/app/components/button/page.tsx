'use client';

import { useId, useState } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Button } from '@/components/primitives/Button';
import { BUTTON_SIZES, type ButtonSize, ACCENT_COLORS, type AccentColor } from '@/components/primitives/Button.constants';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { Icon } from '@/components/icons';

const SIZE_LABELS: Record<ButtonSize, string> = {
  'heading-xl':    'heading-xl · 40px',
  'heading-lg':    'heading-lg · 32px',
  'heading-md':    'heading-md · 24px',
  'heading-sm':    'heading-sm · 20px',
  'heading-xs':    'heading-xs · 16px',
  'heading-2xs':   'heading-2xs · 14px',
  'subheading-lg': 'subheading-lg · 48px',
  'subheading-md': 'subheading-md · 32px',
  'subheading-sm': 'subheading-sm · 24px',
  'body-xl':       'body-xl · 24px',
  'body-lg':       'body-lg · 22px',
  'body-md':       'body-md · 20px',
  'body-sm':       'body-sm · 18px',
  'body-xs':       'body-xs · 16px',
  'body-2xs':      'body-2xs · 14px',
};

const BUTTON_STATES = ['default', 'hover', 'active', 'focus', 'disabled'] as const;

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ButtonPage(): React.ReactElement {
  const [accent, setAccent] = useState<AccentColor | undefined>(undefined);
  const accentSelectId = useId();

  const accentCode = accent != null
    ? `<Button size="heading-md" accent="${accent}">Label</Button>`
    : `<Button size="heading-md">Label</Button>`;

  const accentChip = accent != null ? (
    <button
      type="button"
      className="section-chip section-chip--active"
      onClick={(): void => setAccent(undefined)}
      aria-label={`Reset accent to default (currently ${accent})`}
    >
      <span className="section-chip-text">{capitalize(accent)}</span>
      <span className="section-chip-close" aria-hidden="true" />
    </button>
  ) : (
    <label className="section-chip" htmlFor={accentSelectId}>
      <select
        id={accentSelectId}
        className="section-chip-select"
        value=""
        onChange={(e): void => {
          const val = e.target.value;
          setAccent(val !== '' ? val as AccentColor : undefined);
        }}
      >
        <option value="">Accent</option>
        <optgroup label="Semantic">
          {(['error', 'warning', 'success', 'info'] as const).map((a) => (
            <option key={a} value={a}>{capitalize(a)}</option>
          ))}
        </optgroup>
        <optgroup label="Palette">
          {ACCENT_COLORS.filter((a) => !['error', 'warning', 'success', 'info'].includes(a)).map((a) => (
            <option key={a} value={a}>{capitalize(a)}</option>
          ))}
        </optgroup>
      </select>
      <span className="section-chip-chevron" aria-hidden="true" />
    </label>
  );

  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Button"
            description="Transparent at rest. 20% overlay on hover. Gravity-pulled on proximity. Never cursor: pointer."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="Text Button"
            description="Transparent at rest — 20% overlay fill reveals on hover via ::before scale-up. Accent tints text and background; 10% at rest, 20% on hover."
            code={accentCode}
            sizes={BUTTON_SIZES}
            defaultSize="heading-md"
            sizeLabel={(s): string => SIZE_LABELS[s]}
            states={BUTTON_STATES}
            extraChips={accentChip}
            render={({ state, size }): React.ReactNode => (
              <Button
                size={size}
                accent={accent}
                disabled={state === 'disabled'}
                className={state === 'disabled' ? 'op-40' : undefined}
              >
                Label
              </Button>
            )}
          />

          <ComponentSection
            name="Button with leading icon"
            description="Icon uses size='em' — scales with the button's font size across all tiers."
            code={`<Button>\n  <Icon name="ArrowRight" size="em" />\n  Continue\n</Button>`}
            sizes={BUTTON_SIZES}
            defaultSize="heading-md"
            sizeLabel={(s): string => SIZE_LABELS[s]}
            states={['default', 'hover']}
            render={({ size }): React.ReactNode => (
              <Button size={size}>
                <Icon name="ArrowRight" size="em" />
                Continue
              </Button>
            )}
          />

          <ComponentSection
            name="Button with trailing icon"
            description="Same em-sized glyph placed after the label — direction signals forward navigation."
            code={`<Button>\n  Continue\n  <Icon name="ArrowRight" size="em" />\n</Button>`}
            sizes={BUTTON_SIZES}
            defaultSize="heading-md"
            sizeLabel={(s): string => SIZE_LABELS[s]}
            states={['default', 'hover']}
            render={({ size }): React.ReactNode => (
              <Button size={size}>
                Continue
                <Icon name="ArrowRight" size="em" />
              </Button>
            )}
          />

          <ComponentSection
            name="Link button (asChild)"
            description="Pass asChild to render as an anchor while keeping all button styles and gravity."
            code={`<Button asChild>\n  <a href="/path">Navigate</a>\n</Button>`}
            sizes={BUTTON_SIZES}
            defaultSize="heading-md"
            sizeLabel={(s): string => SIZE_LABELS[s]}
            states={['default', 'hover']}
            render={({ size }): React.ReactNode => (
              <Button size={size} asChild>
                <a href="#example">Navigate</a>
              </Button>
            )}
          />

          <ComponentSection
            name="Icon only"
            description="No label — icon footprint only. Use for toolbars and compact UI."
            code={`<Button className="btn-icon" size={size}>\n  <Icon name="ArrowRight" size="em" />\n</Button>`}
            sizes={BUTTON_SIZES}
            defaultSize="heading-md"
            sizeLabel={(s): string => SIZE_LABELS[s]}
            states={['default', 'hover']}
            render={({ size }): React.ReactNode => (
              <Button className="btn-icon" size={size}>
                <Icon name="ArrowRight" size="em" />
              </Button>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}

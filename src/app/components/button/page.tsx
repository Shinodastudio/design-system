'use client';

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Button } from '@/components/primitives/Button';
import { BUTTON_SIZES, type ButtonSize } from '@/components/primitives/Button.constants';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { Icon } from '@/components/icons';

const SIZE_LABELS: Record<ButtonSize, string> = {
  xs:    'xs · 14px',
  sm:    'sm · 16px',
  md:    'md · 20px',
  lg:    'lg · 24px',
  xl:    'xl · 32px',
  '2xl': '2xl · 40px',
};

const BUTTON_STATES = ['default', 'hover', 'active', 'disabled'] as const;

export default function ButtonPage(): React.ReactElement {
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
            description="Transparent at rest — 20% overlay fill reveals on hover via ::before scale-up."
            code={`<Button size="lg">Label</Button>`}
            sizes={BUTTON_SIZES}
            defaultSize="lg"
            sizeLabel={(s): string => SIZE_LABELS[s]}
            states={BUTTON_STATES}
            render={({ state, size }): React.ReactNode => (
              <Button
                size={size}
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
            defaultSize="lg"
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
            defaultSize="lg"
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
            defaultSize="lg"
            sizeLabel={(s): string => SIZE_LABELS[s]}
            states={['default', 'hover']}
            render={({ size }): React.ReactNode => (
              <Button size={size} asChild>
                <a href="#example">Navigate</a>
              </Button>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}

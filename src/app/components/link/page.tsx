'use client';

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { ShinodaLink, LINK_SIZES, type LinkSize } from '@/components/primitives/ShinodaLink';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

const SIZE_LABELS: Record<LinkSize, string> = {
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

const LINK_STATES = ['default', 'hover', 'active', 'focus', 'disabled'] as const;

export default function LinkPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Link"
            description="Underline always present — 20% opacity at rest, 100% on hover. 2px thickness. Never cursor: pointer."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="Text Link"
            description="Underline is the semantic signal — always visible at 20%, lifts to full on hover. 2px thick across all sizes."
            code={`<ShinodaLink href="/path" size="body-md">Visit the work</ShinodaLink>`}
            sizes={LINK_SIZES}
            defaultSize="body-md"
            sizeLabel={(s): string => SIZE_LABELS[s]}
            states={LINK_STATES}
            render={({ state, size }): React.ReactNode => (
              <ShinodaLink
                href="#"
                size={size}
                disabled={state === 'disabled'}
              >
                Visit the work
              </ShinodaLink>
            )}
          />

          <ComponentSection
            name="External Link"
            description="Opens in a new tab. rel='noopener noreferrer' is applied automatically."
            code={`<ShinodaLink href="https://example.com" size="body-md" external>\n  External site\n</ShinodaLink>`}
            sizes={LINK_SIZES}
            defaultSize="body-md"
            sizeLabel={(s): string => SIZE_LABELS[s]}
            states={['default', 'hover']}
            render={({ size }): React.ReactNode => (
              <ShinodaLink href="https://shinoda.studio" size={size} external>
                External site
              </ShinodaLink>
            )}
          />

          <ComponentSection
            name="Inline in body copy"
            description="Links sit inline without disrupting rhythm — the underline holds so they read even when motionless."
            code={`<p className="body-md">\n  Read more about the{' '}\n  <ShinodaLink href="#">design system</ShinodaLink>.\n</p>`}
            sizes={['body-md', 'body-sm', 'body-xs'] as const}
            defaultSize="body-md"
            states={['default', 'hover']}
            render={(): React.ReactNode => (
              <p className="body-md" style={{ maxWidth: '32em' }}>
                Read more about the{' '}
                <ShinodaLink href="#">design system</ShinodaLink>{' '}
                principles — the underline holds at rest.
              </p>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}

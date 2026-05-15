'use client';

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { ShinodaLink } from '@/components/primitives/ShinodaLink';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

const LINK_SIZES = [
  'heading-xl', 'heading-lg', 'heading-md', 'heading-sm', 'heading-xs',
  'body-md', 'body-sm', 'body-xs', 'body-2xs',
] as const;

type LinkSize = typeof LINK_SIZES[number];

export default function LinkPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Link"
            description="Underline always present — 20% opacity at rest, 100% on hover. Never cursor: pointer."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="Text Link"
            description="Underline is the semantic signal — always visible at 20%, lifts to full on hover."
            code={`<ShinodaLink href="/path">Visit the work</ShinodaLink>`}
            sizes={LINK_SIZES}
            defaultSize="body-md"
            states={['default', 'hover']}
            render={({ size }): React.ReactNode => (
              <span className={size as LinkSize}>
                <ShinodaLink href="#">Visit the work</ShinodaLink>
              </span>
            )}
          />

          <ComponentSection
            name="External Link"
            description="Opens in a new tab. rel='noopener noreferrer' is applied automatically."
            code={`<ShinodaLink href="https://example.com" external>\n  External site\n</ShinodaLink>`}
            sizes={LINK_SIZES}
            defaultSize="body-md"
            states={['default', 'hover']}
            render={({ size }): React.ReactNode => (
              <span className={size as LinkSize}>
                <ShinodaLink href="https://shinoda.studio" external>External site</ShinodaLink>
              </span>
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

'use client';

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { ContentCard } from '@/components/content/ContentCard';
import { CodeSnippet } from '@/components/content/CodeSnippet';
import { Button } from '@/components/primitives/Button';

const SIZES = ['default'] as const;

export default function ContentPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Content"
            description="Content card for structured copy and inline code snippet for click-to-copy lines."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="ContentCard"
            description="Structured content surface. Supports title, description, body children, metadata, and action slot."
            code={`<ContentCard\n  title="Project update"\n  description="A brief description."\n  metadata="2 days ago"\n/>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <ContentCard
                title="Project update"
                description="Initial system tokens merged into main. Type scale, spacing, and opacity layer are stable."
                metadata="2 days ago"
              />
            )}
          />

          <ComponentSection
            name="ContentCard — with actions"
            description="Pass JSX to the actions slot for inline controls alongside metadata."
            code={`<ContentCard\n  title="Draft component"\n  metadata="Updated just now"\n  actions={<Button size="heading-xs">Publish</Button>}\n/>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <ContentCard
                title="Draft component"
                description="Accordion variant with multiple-open support. Needs review before merge."
                metadata="Updated just now"
                actions={<Button size="heading-xs">Publish</Button>}
              />
            )}
          />

          <ComponentSection
            name="ContentCard — interactive"
            description="Pass onClick to make the card a button role with keyboard support."
            code={`<ContentCard\n  title="Click to open"\n  onClick={() => open()}\n/>`}
            sizes={SIZES}
            states={['default', 'hover']}
            render={(): React.ReactNode => (
              <ContentCard
                title="Click to open"
                description="This card is interactive. It responds to click, Enter, and Space."
                onClick={() => undefined}
              />
            )}
          />

          <ComponentSection
            name="CodeSnippet"
            description="Click-to-copy code line. 40% opacity at rest, fills in on hover with a Copy icon, and confirms the write with a CheckCircle + 'Copied to Clipboard' for ~1.6s."
            code={`<CodeSnippet code="<Button>Label</Button>" />`}
            sizes={SIZES}
            states={['default', 'hover', 'active']}
            render={(): React.ReactNode => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%', maxWidth: 400 }}>
                <CodeSnippet code="<Button>Label</Button>" />
                <CodeSnippet code="import { Button } from '@shinodastudio/ds';" />
                <CodeSnippet code="bun add @shinodastudio/ds" />
              </div>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}

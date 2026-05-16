'use client';

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { ContentCard } from '@/components/content/ContentCard';
import { DownloadTile } from '@/components/content/DownloadTile';
import { Button } from '@/components/primitives/Button';

const SIZES = ['default'] as const;

export default function ContentPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Content"
            description="Content card for structured copy, and download tile for file assets."
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
            code={`<ContentCard\n  title="Draft component"\n  metadata="Updated just now"\n  actions={<Button size="sm">Publish</Button>}\n/>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <ContentCard
                title="Draft component"
                description="Accordion variant with multiple-open support. Needs review before merge."
                metadata="Updated just now"
                actions={<Button size="sm">Publish</Button>}
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
            name="DownloadTile"
            description="File asset row with icon, filename, type/size metadata, and a download action."
            code={`<DownloadTile\n  filename="shinoda-tokens.css"\n  fileType="CSS"\n  fileSize="12 KB"\n  onDownload={fn}\n/>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%' }}>
                <DownloadTile
                  filename="shinoda-tokens.css"
                  fileType="CSS"
                  fileSize="12 KB"
                  description="All design tokens as CSS custom properties"
                  onDownload={() => undefined}
                />
                <DownloadTile
                  filename="shinoda-base.css"
                  fileType="CSS"
                  fileSize="8 KB"
                  description="Reset, typography, layout shell"
                  onDownload={() => undefined}
                />
                <DownloadTile
                  filename="brand-guidelines.pdf"
                  fileType="PDF"
                  fileSize="4.2 MB"
                  onDownload={() => undefined}
                />
              </div>
            )}
          />

          <ComponentSection
            name="DownloadTile — loading state"
            description="Pass isDownloading to replace the button with a Skeleton placeholder during async download."
            code={`<DownloadTile\n  filename="export.zip"\n  onDownload={fn}\n  isDownloading\n/>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <DownloadTile
                filename="export.zip"
                fileType="ZIP"
                fileSize="56 MB"
                onDownload={() => undefined}
                isDownloading
              />
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}

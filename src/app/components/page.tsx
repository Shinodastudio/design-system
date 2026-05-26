'use client';

import { useRef } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Text } from '@/components/primitives/Text';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { useGravity } from '@/hooks/useGravity';
import NextLink from 'next/link';

/**
 * Components index — May 2026 spec (section 6, 10, 18).
 *
 * Title reduced to a single line. Removed pages:
 *   - Nav / Grid / Text — don't exist as standalone primitives.
 *   - Rich Text — folded into /type as a subsection (Type page is now the
 *     single home for type, text styles, colour, alignment and rich-text).
 */
const COMPONENTS = [
  { label: 'Button',      href: '/components/button',     description: 'Transparent at rest, 20% overlay on hover. Gravity-pulled.' },
  { label: 'Link',        href: '/components/link',       description: '20% underline at rest, 100% on hover. Gravity-pulled.' },
  { label: 'Divider',     href: '/components/divider',    description: 'Horizontal only. 5% opacity. No vertical dividers ever.' },
  { label: 'Input',       href: '/components/input',      description: 'Text fields, select, choice, and search dropdown.' },
  { label: 'Tabs',        href: '/components/tabs',       description: 'Horizontal tabs with animated indicator transitions.' },
  { label: 'Icon',        href: '/components/icon',       description: 'Searchable catalogue. currentColor strokes, 6 size variants.' },
  { label: 'Cursor',      href: '/components/cursor',     description: '1.25em inverted dot. Morphs on context. Lerp 0.22.' },
  { label: 'Feedback',    href: '/components/feedback',   description: 'Badge, Alert, Progress, Skeleton — status and loading signals.' },
  { label: 'Overlay',     href: '/components/overlay',    description: 'Tooltip, Dialog, Sheet, Popover, DropdownMenu.' },
  { label: 'Controls',    href: '/components/controls',   description: 'Switch, Accordion, Command palette.' },
  { label: 'Data',        href: '/components/data',       description: 'Read-only and inline-editable data tables.' },
  { label: 'Calendar',    href: '/components/calendar',   description: 'Inline calendar picker and date text input.' },
  { label: 'Card',        href: '/components/card',       description: 'Square tiles with hover-revealed actions and timestamp meta.' },
  { label: 'Content',     href: '/components/content',    description: 'ContentCard and DownloadTile for structured content.' },
  { label: 'Map',         href: '/components/map',        description: 'Interactive Leaflet map — requires optional peer dependency.' },
  { label: 'Upload',      href: '/components/upload',     description: 'File dropzone with drag-and-drop and queued file chips.' },
] as const;

interface ComponentTileProps {
  readonly label: string;
  readonly href: string;
  readonly description: string;
}

function ComponentTile({ label, href, description }: ComponentTileProps): React.ReactElement {
  const ref = useRef<HTMLAnchorElement>(null);
  useGravity(ref);

  return (
    <NextLink
      ref={ref}
      href={href}
      className="components-index-row btn"
    >
      <Text variant="heading-md" as="span">{label}</Text>
      <Text variant="body-sm" opacity={40} as="p" style={{ marginTop: 'var(--space-2)' }}>
        {description}
      </Text>
    </NextLink>
  );
}

export default function ComponentsPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Components"
            description="Primitives and composed UI, built from the token layer up."
          />
        </StickyCol>
        <div>
          {COMPONENTS.map((comp) => (
            <ComponentTile
              key={comp.href}
              label={comp.label}
              href={comp.href}
              description={comp.description}
            />
          ))}
        </div>
      </Grid>
    </MainWrapper>
  );
}

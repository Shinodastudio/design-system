import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
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
  { label: 'Input',       href: '/components/input',      description: 'Underline-only field with label, help, error states.' },
  { label: 'Select',      href: '/components/select',     description: 'Native select, checkbox and radio.' },
  { label: 'Tabs',        href: '/components/tabs',       description: 'Horizontal tabs with animated indicator transitions.' },
  { label: 'Icon',        href: '/components/icon',       description: 'Searchable catalogue. currentColor strokes, 6 size variants.' },
  { label: 'Cursor',      href: '/components/cursor',     description: '1.25em inverted dot. Morphs on context. Lerp 0.22.' },
] as const;

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
        <div style={{ paddingLeft: 'var(--padding-columns)' }}>
          {COMPONENTS.map((comp) => (
            <div key={comp.href}>
              <Divider />
              <NextLink href={comp.href} className="components-index-row">
                <Text variant="heading-sm" as="span">{comp.label}</Text>
                <Text variant="body-sm" opacity={40} as="p" style={{ marginTop: 'var(--space-2)' }}>
                  {comp.description}
                </Text>
              </NextLink>
            </div>
          ))}
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

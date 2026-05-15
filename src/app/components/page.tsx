import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import NextLink from 'next/link';

const COMPONENTS = [
  { label: 'Button',    href: '/components/button',    description: 'Transparent at rest, 20% overlay on hover. Gravity-pulled.' },
  { label: 'Link',      href: '/components/link',      description: '20% underline at rest, 100% on hover. Gravity-pulled.' },
  { label: 'Divider',   href: '/components/divider',   description: 'Horizontal only. 5% opacity. No vertical dividers ever.' },
  { label: 'Text',      href: '/components/text',      description: 'All 15 type variants via a single polymorphic component.' },
  { label: 'Rich Text', href: '/components/rich-text', description: 'Long-form text flow — headings, lists, code, hr.' },
  { label: 'Input',     href: '/components/input',     description: 'Text and textarea with label, help, error states.' },
  { label: 'Select',    href: '/components/select',    description: 'Native select, checkbox, radio.' },
  { label: 'Tabs',      href: '/components/tabs',      description: 'Horizontal tab control with 2px active indicator.' },
  { label: 'Icon',      href: '/components/icon',      description: 'Searchable catalogue. currentColor strokes, 6 size variants.' },
  { label: 'Cursor',    href: '/components/cursor',    description: '1.25em inverted dot. Morphs on context. Lerp 0.22.' },
  { label: 'Nav',       href: '/components/nav',       description: 'Navigation bar with links at 40% opacity, theme toggle.' },
  { label: 'Grid',      href: '/components/grid',      description: '50/50 two-column layout with optional sticky left column.' },
] as const;

export default function ComponentsPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Components</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Built from the token layer up.<br />
            No third-party component library.<br />
            Each component is the system in use.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          {COMPONENTS.map((comp) => (
            <div key={comp.href}>
              <Divider />
              <NextLink href={comp.href} style={{ display: 'block', paddingBlock: 'var(--space-6)', textDecoration: 'none' }}>
                <Text variant="body-md" as="span">{comp.label}</Text>
                <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-2)' }}>
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

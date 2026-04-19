import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import NextLink from 'next/link';

const SECTIONS = [
  { label: 'Colour',     href: '/colour',    description: 'Semantic colour tokens, light and dark mode values.' },
  { label: 'Type',       href: '/type',       description: 'Full type scale — headings, subheadings, body.' },
  { label: 'Components', href: '/components', description: 'Interactive primitives: Button, Link, and more.' },
  { label: 'Structure',  href: '/structure',  description: 'Layout system, grid, spacing, and containers.' },
] as const;

export default function HomePage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol style={{ paddingTop: 'var(--space-16)' }}>
          <Text variant="heading-xl" as="h1">Shinoda<br />Design System</Text>
          <Text variant="body-md" opacity={60} as="p" style={{ marginTop: 'var(--space-4)' }}>
            v3 — April 2026
          </Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            React component library.<br />
            Monochromatic. Opacity-led hierarchy.<br />
            Dark and light from day one.
          </Text>
        </StickyCol>
        <div style={{ paddingTop: 'var(--space-16)', paddingInline: 'var(--space-6)' }}>
          {SECTIONS.map((section) => (
            <div key={section.href}>
              <Divider />
              <NextLink href={section.href} style={{ display: 'block', paddingBlock: 'var(--space-8)', textDecoration: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Text variant="heading-md" as="span">{section.label}</Text>
                  <Text variant="body-md" opacity={40} as="span">→</Text>
                </div>
                <Text variant="body-md" opacity={60} as="p" style={{ marginTop: 'var(--space-2)' }}>
                  {section.description}
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

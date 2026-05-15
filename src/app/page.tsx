import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import NextLink from 'next/link';

/**
 * Every subpage in the catalogue, presented on the homepage as a large
 * Button (no arrow, no description in-line). The homepage IS the navigation —
 * the global Nav is hidden on `/` (see `[data-route="home"] .nav` in base CSS).
 *
 * Components/* subpages are intentionally grouped under the Components index
 * rather than listed individually — keeps the entry page from sprawling.
 */
const SECTIONS = [
  { label: 'Colour',     href: '/colour'     },
  { label: 'Type',       href: '/type'       },
  { label: 'Components', href: '/components' },
  { label: 'Structure',  href: '/structure'  },
  { label: 'Widths',     href: '/widths'     },
  { label: 'Paddings',   href: '/paddings'   },
  { label: 'Margins',    href: '/margins'    },
  { label: 'Grids',      href: '/grids'      },
  { label: 'Utility',    href: '/utility'    },
] as const;

export default function HomePage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Shinoda<br />Design System</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-4)' }}>
            v3 — April 2026
          </Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            React component library.<br />
            Monochromatic. Opacity-led hierarchy.<br />
            Dark and light from day one.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          <Divider />
          {SECTIONS.map((section) => (
            <div key={section.href}>
              <div style={{ paddingBlock: 'var(--space-4)' }}>
                <Button asChild size="2xl">
                  <NextLink href={section.href}>{section.label}</NextLink>
                </Button>
              </div>
              <Divider />
            </div>
          ))}
        </div>
      </Grid>
    </MainWrapper>
  );
}

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';

const UTILITY_GROUPS = [
  {
    title: 'Opacity (content)',
    note: 'Hierarchy tool — only these four values for content. Never 30/50/70/90/10/15.',
    items: [
      { name: '.op-80', value: 'opacity: 0.80' },
      { name: '.op-60', value: 'opacity: 0.60' },
      { name: '.op-40', value: 'opacity: 0.40' },
      { name: '.op-20', value: 'opacity: 0.20' },
    ],
  },
  {
    title: 'Layout',
    note: 'Flex utilities, page shells, and the canonical 2-column grid.',
    items: [
      { name: '.page-wrapper',   value: 'min-height: 100dvh; flex column' },
      { name: '.main-wrapper',   value: 'max-width: 1312px; centred; padding-inline 24px' },
      { name: '.padding-global', value: 'padding-inline: 24px' },
      { name: '.grid-2col',      value: 'display: grid; grid-template-columns: 1fr 1fr' },
      { name: '.col-sticky',     value: 'position: sticky; top: 24px' },
      { name: '.flex',           value: 'display: flex' },
      { name: '.flex-col',       value: 'flex-direction: column' },
      { name: '.items-center',   value: 'align-items: center' },
      { name: '.justify-between',value: 'justify-content: space-between' },
      { name: '.gap-4',          value: 'gap: 16px' },
      { name: '.gap-6',          value: 'gap: 24px' },
      { name: '.w-full',         value: 'width: 100%' },
      { name: '.min-h-screen',   value: 'min-height: 100dvh' },
    ],
  },
  {
    title: 'Containers',
    note: 'Constrained inner widths. Use sparingly — most content sits in 1312px page container.',
    items: [
      { name: '.container-sm',  value: 'max-width: 320px' },
      { name: '.container-md',  value: 'max-width: 384px' },
      { name: '.container-lg',  value: 'max-width: 512px' },
      { name: '.container-xl',  value: 'max-width: 640px' },
      { name: '.container-5xl', value: 'max-width: 1312px' },
    ],
  },
  {
    title: 'Dividers',
    note: 'Horizontal only. 5% opacity. Never vertical. Never full viewport — always inside container.',
    items: [
      { name: '.divider', value: '1px solid text-primary @ 5% opacity' },
    ],
  },
  {
    title: 'Accessibility',
    note: 'Screen-reader-only helpers.',
    items: [
      { name: '.sr-only', value: 'Visually hidden but available to assistive tech' },
    ],
  },
] as const;

export default function UtilityPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Utility</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Single-purpose classes for spacing, flow, and visibility.<br /><br />
            Composable. Avoid duplicating their behaviour in component styles.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          {UTILITY_GROUPS.map((group) => (
            <div key={group.title} style={{ marginBottom: 'var(--space-12)' }}>
              <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-2)' }}>{group.title}</Text>
              <Text variant="body-xs" opacity={40} as="p" style={{ paddingBottom: 'var(--space-4)' }}>{group.note}</Text>
              {group.items.map(({ name, value }) => (
                <div key={name}>
                  <Divider />
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: 'var(--space-4)', gap: 'var(--space-4)' }}>
                    <CopyValue value={name}>
                      <Text variant="body-sm" as="span">{name}</Text>
                    </CopyValue>
                    <Text variant="body-sm" opacity={40} as="span">{value}</Text>
                  </div>
                </div>
              ))}
              <Divider />
            </div>
          ))}
        </div>
      </Grid>
    </MainWrapper>
  );
}

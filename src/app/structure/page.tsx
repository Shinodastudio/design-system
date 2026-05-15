import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { SPACING_TOKENS } from '@/lib/tokens';

export default function StructurePage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Structure</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Grid always 1fr 1fr.<br />
            Max width 1280px.<br />
            24px global padding.<br /><br />
            No vertical dividers.<br />
            Horizontal only at 5% opacity.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Spacing scale</Text>
          {SPACING_TOKENS.map(({ name, value }) => (
            <div key={name}>
              <Divider />
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', paddingBlock: 'var(--space-4)' }}>
                <div
                  style={{
                    height: '1px',
                    width: value,
                    backgroundColor: 'var(--color-text-primary)',
                    flexShrink: 0,
                    maxWidth: '100%',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
                  <Text variant="body-sm" as="span">{name}</Text>
                  <Text variant="body-sm" opacity={40} as="span">{value}</Text>
                </div>
              </div>
            </div>
          ))}
          <Divider />

          <div style={{ marginTop: 'var(--space-12)' }}>
            <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Grid</Text>
            <Divider />
            <div style={{ paddingBlock: 'var(--space-8)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: 'var(--color-outline)' }}>
                <div style={{ backgroundColor: 'var(--color-fill-secondary)', padding: 'var(--space-8)' }}>
                  <Text variant="body-sm" opacity={40} as="p">Column 1 — 1fr</Text>
                </div>
                <div style={{ backgroundColor: 'var(--color-fill-secondary)', padding: 'var(--space-8)' }}>
                  <Text variant="body-sm" opacity={40} as="p">Column 2 — 1fr</Text>
                </div>
              </div>
              <Text variant="body-xs" opacity={40} as="p" style={{ marginTop: 'var(--space-3)' }}>
                .grid-2col — always equal 50/50. Never asymmetric.
              </Text>
            </div>
            <Divider />
          </div>

          <div style={{ marginTop: 'var(--space-12)' }}>
            <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Radius</Text>
            {([
              { token: '--radius-none', value: '0px',    label: 'None' },
              { token: '--radius-xs',   value: '4px',    label: 'XS' },
              { token: '--radius-sm',   value: '8px',    label: 'SM — max for primary elements' },
              { token: '--radius-md',   value: '12px',   label: 'MD' },
              { token: '--radius-full', value: '9999px', label: 'Full — pills only' },
            ] as const).map(({ token, value, label }) => (
              <div key={token}>
                <Divider />
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', paddingBlock: 'var(--space-4)' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'var(--color-fill-secondary)',
                      border: '1px solid var(--color-outline)',
                      borderRadius: value,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                    <Text variant="body-sm" as="span">{label}</Text>
                    <Text variant="body-sm" opacity={40} as="span">{token} / {value}</Text>
                  </div>
                </div>
              </div>
            ))}
            <Divider />
          </div>
        </div>
      </Grid>
    </MainWrapper>
  );
}

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { CONTAINER_TOKENS, BREAKPOINT_TOKENS } from '@/lib/tokens';

export default function WidthsPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Widths</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Min and max container widths.<br />
            Breakpoint thresholds.<br /><br />
            Page container: 1312px max.<br />
            Inner padding 24px each side.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Containers</Text>
          {CONTAINER_TOKENS.map(({ name, value }) => (
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
                <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1, gap: 'var(--space-4)' }}>
                  <CopyValue value={name}>
                    <Text variant="body-sm" as="span">{name}</Text>
                  </CopyValue>
                  <Text variant="body-sm" opacity={40} as="span">{value}</Text>
                </div>
              </div>
            </div>
          ))}
          <Divider />

          <div style={{ marginTop: 'var(--space-12)' }}>
            <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Breakpoints</Text>
            {BREAKPOINT_TOKENS.map(({ name, value }) => (
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
        </div>
      </Grid>
    </MainWrapper>
  );
}

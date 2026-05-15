import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { SPACING_TOKENS } from '@/lib/tokens';

export default function MarginsPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Margins</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Same 4px base scale as paddings.<br /><br />
            Use margin to separate independent blocks.<br />
            Use padding inside containers.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Scale</Text>
          {SPACING_TOKENS.map(({ name, value }) => (
            <div key={name}>
              <Divider />
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', paddingBlock: 'var(--space-4)' }}>
                <div
                  style={{
                    width: '120px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: value,
                      height: '24px',
                      background:
                        'repeating-linear-gradient(45deg, var(--color-transparent-core) 0 2px, transparent 2px 4px)',
                      maxWidth: '100%',
                    }}
                  />
                </div>
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
        </div>
      </Grid>
    </MainWrapper>
  );
}

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { PADDING_TOKENS, SPACING_TOKENS } from '@/lib/tokens';

/**
 * Paddings — May 2026 spec section 19. Semantic responsive padding tokens
 * with their base values shown alongside the per-canvas notes. Visual format
 * may need to reconcile against the Webflow page once Designer access is available.
 */
export default function PaddingsPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Paddings"
            description="Semantic padding tokens — page, section, container, nav, card."
          />
        </StickyCol>
        <div style={{ paddingLeft: 'var(--padding-columns)' }}>
          <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Semantic</Text>
          {PADDING_TOKENS.map(({ name, value, note }) => (
            <div key={name}>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: 'var(--space-4)', gap: 'var(--space-4)' }}>
                <CopyValue value={name}>
                  <Text variant="body-sm" as="span">{name}</Text>
                </CopyValue>
                <Text variant="body-sm" opacity={40} as="span">{value} <span style={{ opacity: 0.6 }}>· {note}</span></Text>
              </div>
            </div>
          ))}
          <Divider />

          <div style={{ marginTop: 'var(--space-12)' }}>
            <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Spacing scale (base unit 4px)</Text>
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
        </div>
      </Grid>
    </MainWrapper>
  );
}

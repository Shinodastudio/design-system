import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { CONTAINER_TOKENS, BREAKPOINT_TOKENS, CONTAINER_MAXWIDTH_TOKEN } from '@/lib/tokens';

/**
 * Widths — May 2026 spec section 19.
 *
 * Now surfaces the responsive --container-maxwidth alongside the static
 * container scale and breakpoints. Webflow MCP source-of-truth still pending
 * Designer access; visual format may need to reconcile against the published
 * Webflow page once available.
 */
export default function WidthsPage(): React.ReactElement {
  const maxwidthEntries = Object.entries(CONTAINER_MAXWIDTH_TOKEN.values) as ReadonlyArray<[string, string]>;
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Widths"
            description="Container scale, responsive page max-width, and breakpoint thresholds."
          />
        </StickyCol>
        <div style={{ paddingLeft: 'var(--padding-columns)' }}>
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
            <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Page max-width (responsive)</Text>
            {maxwidthEntries.map(([canvas, value]) => (
              <div key={canvas}>
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: 'var(--space-4)', gap: 'var(--space-4)' }}>
                  <CopyValue value={`${CONTAINER_MAXWIDTH_TOKEN.name} (${canvas})`}>
                    <Text variant="body-sm" as="span">{CONTAINER_MAXWIDTH_TOKEN.name} · {canvas}</Text>
                  </CopyValue>
                  <Text variant="body-sm" opacity={40} as="span">{value}</Text>
                </div>
              </div>
            ))}
            <Divider />
          </div>

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

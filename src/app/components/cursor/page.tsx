import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { ShinodaLink } from '@/components/primitives/ShinodaLink';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

export default function CursorPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Cursor"
            description="Single inverted dot. 1.25em. mix-blend-mode: difference. Lerp 0.22. Morphs to I-beam / button footprint / expand chip."
          />
        </StickyCol>
        <div>
          <Divider />
          <div style={{ paddingBlock: 'var(--space-8)' }}>
            <Text variant="body-md" opacity={40} as="h2">States</Text>
            <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
              Move your cursor over each element to see the state change.
            </Text>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <div style={{ padding: 'var(--space-8)', backgroundColor: 'var(--color-fill-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text variant="body-md" as="p">Hover here — I-beam</Text>
              </div>
              <div style={{ padding: 'var(--space-8)', backgroundColor: 'var(--color-fill-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button>Hover — button footprint</Button>
              </div>
              <div style={{ padding: 'var(--space-8)', backgroundColor: 'var(--color-fill-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShinodaLink href="#">Hover — link</ShinodaLink>
              </div>
              <div
                style={{ padding: 'var(--space-8)', backgroundColor: 'var(--color-fill-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                data-cursor="expand"
                data-cursor-label="expand"
              >
                <Text variant="body-md" opacity={40} as="p">Hover — chip</Text>
              </div>
            </div>
            <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
              Chip label: 12px GT America regular, sentence case, <code>--tracking-n005</code>. Never uppercase. The chip stands at <code>2em</code> tall with <code>0.75em</code> horizontal padding so the label can breathe.
            </Text>
          </div>
          <Divider />
          <div style={{ paddingBlock: 'var(--space-8)' }}>
            <Text variant="body-md" opacity={40} as="h2">Implementation</Text>
            <Text variant="body-md" opacity={60} as="p" style={{ marginTop: 'var(--space-4)' }}>
              Rendered once in <code>ClientShell</code> at the root layout. Managed imperatively via <code>useCursor</code> — no React state updates in the rAF loop.
            </Text>
          </div>
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

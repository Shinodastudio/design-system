import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { ShinodaLink } from '@/components/primitives/ShinodaLink';

export default function CursorPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol style={{ paddingTop: 'var(--space-16)' }}>
          <Text variant="heading-xl" as="h1">Cursor</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Single inverted dot.<br />
            mix-blend-mode: difference.<br />
            1.25em. Lerp 0.22.<br /><br />
            Context-aware morphing —<br />
            text → I-beam<br />
            button → button footprint<br />
            image → expand chip
          </Text>
        </StickyCol>
        <div style={{ paddingTop: 'var(--space-16)', paddingInline: 'var(--space-6)' }}>
          <Divider />
          <div style={{ paddingBlock: 'var(--space-8)' }}>
            <Text variant="heading-xs" as="h2">States</Text>
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
          </div>
          <Divider />
          <div style={{ paddingBlock: 'var(--space-8)' }}>
            <Text variant="heading-xs" as="h2">Implementation</Text>
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

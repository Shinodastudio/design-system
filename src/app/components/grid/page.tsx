import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';

export default function GridPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Grid</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Always 1fr 1fr.<br />
            Never asymmetric.<br /><br />
            Left column sticky by default.<br />
            Collapses to single column at 768px.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          <ComponentFrame
            title="Grid — two equal columns"
            code={`<Grid>\n  <StickyCol>Left (sticky)</StickyCol>\n  <div>Right</div>\n</Grid>`}
          >
            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: 'var(--color-outline)' }}>
              <div style={{ backgroundColor: 'var(--color-fill-secondary)', padding: 'var(--space-6)' }}>
                <Text variant="body-sm" opacity={40} as="p">Left — sticky</Text>
              </div>
              <div style={{ backgroundColor: 'var(--color-fill-secondary)', padding: 'var(--space-6)' }}>
                <Text variant="body-sm" opacity={40} as="p">Right — scrolls</Text>
              </div>
            </div>
          </ComponentFrame>
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

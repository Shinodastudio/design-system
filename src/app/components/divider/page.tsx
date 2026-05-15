import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';

export default function DividerPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Divider</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Horizontal only.<br />
            5% opacity — barely there.<br /><br />
            No vertical dividers. Ever.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          <ComponentFrame
            title="Default"
            description="1px rule at 5% opacity. Used to separate sections, not to decorate."
            code={`<Divider />`}
          >
            <div style={{ width: '100%' }}>
              <Divider />
            </div>
          </ComponentFrame>
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

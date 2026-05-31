import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

export default function DividerPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Divider"
            description="Horizontal only — 1px at 10% opacity. No vertical dividers. Ever."
          />
        </StickyCol>
        <div>
          <ComponentFrame
            title="Default"
            description="A barely-there separator. Used to chunk sections, not to decorate."
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

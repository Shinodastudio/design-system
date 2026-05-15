import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { Tabs, TabsList, TabsTrigger, TabsPanel } from '@/components/primitives/Tabs';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

export default function TabsPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Tabs"
            description="Horizontal control. Triggers at 40% rest, 100% active. Sliding 2px indicator."
          />
        </StickyCol>
        <div style={{ paddingLeft: 'var(--padding-columns)' }}>
          <ComponentFrame
            title="Three panels"
            description="Click a trigger to switch panel. The indicator measures the active trigger and slides."
            code={`<Tabs defaultValue="overview">
  <TabsList ariaLabel="Sections">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="usage">Usage</TabsTrigger>
    <TabsTrigger value="changelog">Changelog</TabsTrigger>
  </TabsList>
  <TabsPanel value="overview">...</TabsPanel>
</Tabs>`}
          >
            <Tabs defaultValue="overview">
              <TabsList ariaLabel="Sections">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="changelog">Changelog</TabsTrigger>
              </TabsList>
              <TabsPanel value="overview">
                <Text variant="body-md" opacity={60} as="p">
                  Overview content. Each panel inherits the parent container width.
                </Text>
              </TabsPanel>
              <TabsPanel value="usage">
                <Text variant="body-md" opacity={60} as="p">
                  Usage content. Switch panels by clicking the trigger above.
                </Text>
              </TabsPanel>
              <TabsPanel value="changelog">
                <Text variant="body-md" opacity={60} as="p">
                  Changelog content. State persists on the parent Tabs component.
                </Text>
              </TabsPanel>
            </Tabs>
          </ComponentFrame>
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

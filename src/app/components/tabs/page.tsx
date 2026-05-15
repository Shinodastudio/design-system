import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { Tabs, TabsList, TabsTrigger, TabsPanel } from '@/components/primitives/Tabs';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';

export default function TabsPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Tabs</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Horizontal control.<br />
            Triggers at 40% opacity at rest, 100% when active.<br />
            2px bar under the active trigger.<br /><br />
            Headless API — Tabs / TabsList / TabsTrigger / TabsPanel.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          <ComponentFrame
            title="Three panels"
            description="Click a trigger to switch panel."
            code={`<Tabs defaultValue="overview">
  <TabsList ariaLabel="Sections">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="usage">Usage</TabsTrigger>
    <TabsTrigger value="changelog">Changelog</TabsTrigger>
  </TabsList>
  <TabsPanel value="overview">...</TabsPanel>
  <TabsPanel value="usage">...</TabsPanel>
  <TabsPanel value="changelog">...</TabsPanel>
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

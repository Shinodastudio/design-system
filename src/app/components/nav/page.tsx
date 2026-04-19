import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';
import { Nav } from '@/components/nav/Nav';

export default function NavPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol style={{ paddingTop: 'var(--space-16)' }}>
          <Text variant="heading-xl" as="h1">Nav</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Links at 40% opacity at rest.<br />
            100% on hover.<br /><br />
            Weak bottom border — 5% overlay.<br />
            Theme toggle on right.
          </Text>
        </StickyCol>
        <div style={{ paddingTop: 'var(--space-16)', paddingInline: 'var(--space-6)' }}>
          <ComponentFrame
            title="Default"
            code={`<Nav />`}
          >
            <div style={{ width: '100%' }}>
              <Nav />
            </div>
          </ComponentFrame>
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

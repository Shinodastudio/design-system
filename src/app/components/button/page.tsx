import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';

export default function ButtonPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol style={{ paddingTop: 'var(--space-16)' }}>
          <Text variant="heading-xl" as="h1">Button</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Transparent at rest.<br />
            20% overlay on hover.<br />
            40% opacity active.<br />
            Gravity-pulled on proximity.<br /><br />
            0.1em padding outside text footprint.<br />
            Never <code>cursor: pointer</code>.
          </Text>
        </StickyCol>
        <div style={{ paddingTop: 'var(--space-16)', paddingInline: 'var(--space-6)' }}>
          <ComponentFrame
            title="Default"
            description="At rest — indistinguishable from surrounding text."
            code={`<Button>Label</Button>`}
          >
            <Button>Label</Button>
          </ComponentFrame>

          <ComponentFrame
            title="Hover"
            description="20% overlay fill reveals on cursor proximity before direct hover."
            code={`<Button>Label</Button>`}
          >
            <Button style={{ backgroundColor: 'var(--color-transparent-core)' }}>Label</Button>
          </ComponentFrame>

          <ComponentFrame
            title="Disabled"
            description="40% opacity. No interaction."
            code={`<Button disabled>Label</Button>`}
          >
            <Button disabled className="op-40">Label</Button>
          </ComponentFrame>

          <ComponentFrame
            title="asChild — link button"
            description="Use asChild to render as an anchor while keeping button styles."
            code={`<Button asChild>\n  <a href="/somewhere">Navigate</a>\n</Button>`}
          >
            <Button asChild>
              <a href="#">Navigate</a>
            </Button>
          </ComponentFrame>
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

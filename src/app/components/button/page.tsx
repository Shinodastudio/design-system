import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { BUTTON_SIZES } from '@/components/primitives/Button.constants';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';

const SIZE_META: Record<typeof BUTTON_SIZES[number], string> = {
  'xs':  '0.875rem · 14px',
  'sm':  '1rem · 16px',
  'md':  '1.25rem · 20px',
  'lg':  '1.5rem · 24px · default',
  'xl':  '2rem · 32px',
  '2xl': '2.5rem · 40px',
};

export default function ButtonPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Button</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Transparent at rest.<br />
            20% overlay on hover.<br />
            40% opacity active.<br />
            Gravity-pulled on proximity.<br /><br />
            0.1em padding outside text footprint.<br />
            Never <code>cursor: pointer</code>.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
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

          {/* Size variants — Webflow parity. Six tiers tracking the heading scale. */}
          <Text variant="body-md" opacity={40} as="h2" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-2)' }}>Sizes</Text>
          {BUTTON_SIZES.map((size) => (
            <ComponentFrame
              key={size}
              title={`size="${size}"`}
              description={SIZE_META[size]}
              code={`<Button size="${size}">Label</Button>`}
            >
              <Button size={size}>Label</Button>
            </ComponentFrame>
          ))}
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

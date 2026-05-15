import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';
import { HEADING_VARIANTS, SUBHEADING_VARIANTS, BODY_VARIANTS } from '@/lib/tokens';
import type { TypeVariant } from '@/lib/tokens';

function VariantFrame({ variant }: { readonly variant: TypeVariant }): React.ReactElement {
  return (
    <ComponentFrame
      title={variant}
      code={`<Text variant="${variant}">The quick brown fox</Text>`}
    >
      <Text variant={variant} as="p">The quick brown fox</Text>
    </ComponentFrame>
  );
}

export default function TextPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Text</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            15 variants via one component.<br />
            Polymorphic — renders the<br />
            semantically correct element by default.<br /><br />
            Override with <code>as</code> prop.<br />
            Opacity via <code>opacity</code> prop.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-2)' }}>Headings</Text>
          {HEADING_VARIANTS.map((v) => <VariantFrame key={v} variant={v} />)}

          <Text variant="body-md" opacity={40} as="h2" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-2)' }}>Subheadings</Text>
          {SUBHEADING_VARIANTS.map((v) => <VariantFrame key={v} variant={v} />)}

          <Text variant="body-md" opacity={40} as="h2" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-2)' }}>Body</Text>
          {BODY_VARIANTS.map((v) => <VariantFrame key={v} variant={v} />)}
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

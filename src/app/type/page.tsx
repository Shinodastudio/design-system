import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { HEADING_VARIANTS, SUBHEADING_VARIANTS, BODY_VARIANTS, OPACITY_LEVELS } from '@/lib/tokens';
import type { TypeVariant, OpacityLevel } from '@/lib/tokens';

const TYPE_META: Record<string, { size: string; tracking: string }> = {
  'heading-xl':    { size: '2.5rem',   tracking: '-0.040em' },
  'heading-lg':    { size: '2rem',     tracking: '-0.035em' },
  'heading-md':    { size: '1.5rem',   tracking: '-0.030em' },
  'heading-sm':    { size: '1.25rem',  tracking: '-0.025em' },
  'heading-xs':    { size: '1rem',     tracking: '-0.020em' },
  'heading-2xs':   { size: '0.75rem',  tracking: '-0.015em' },
  'subheading-lg': { size: '3rem',     tracking: '-0.040em' },
  'subheading-md': { size: '2rem',     tracking: '-0.040em' },
  'subheading-sm': { size: '1.5rem',   tracking: '-0.040em' },
  'body-xl':       { size: '1.5rem',   tracking: '-0.025em' },
  'body-lg':       { size: '1.375rem', tracking: '-0.020em' },
  'body-md':       { size: '1.25rem',  tracking: '-0.015em' },
  'body-sm':       { size: '1.125rem', tracking: '-0.010em' },
  'body-xs':       { size: '1rem',     tracking: '-0.005em' },
  'body-2xs':      { size: '0.875rem', tracking: '0em' },
};

function TypeRow({ variant }: { readonly variant: TypeVariant }): React.ReactElement {
  const meta = TYPE_META[variant] ?? { size: '', tracking: '' };
  return (
    <div>
      <Divider />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-6)', alignItems: 'baseline', paddingBlock: 'var(--space-6)' }}>
        <Text variant={variant} as="p">The quick brown fox</Text>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <CopyValue value={`.${variant}`}>
            <Text variant="body-xs" opacity={40} as="p">{variant}</Text>
          </CopyValue>
          <Text variant="body-xs" opacity={40} as="p">{meta.size} / {meta.tracking}</Text>
        </div>
      </div>
    </div>
  );
}

export default function TypePage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol style={{ paddingTop: 'var(--space-16)' }}>
          <Text variant="heading-xl" as="h1">Type</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Hierarchy through opacity,<br />
            not size.<br /><br />
            GT America LCG — headings.<br />
            GT Super Text — subheadings only.
          </Text>
          <div style={{ marginTop: 'var(--space-12)' }}>
            <Text variant="heading-xs" as="h2" style={{ marginBottom: 'var(--space-4)' }}>Opacity scale</Text>
            {OPACITY_LEVELS.map((level: OpacityLevel) => (
              <div key={level} style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: 'var(--space-2)' }}>
                <Text variant="body-md" opacity={level} as="span">Text at {level}%</Text>
                <Text variant="body-sm" opacity={40} as="span">.op-{level}</Text>
              </div>
            ))}
          </div>
        </StickyCol>
        <div style={{ paddingTop: 'var(--space-16)', paddingInline: 'var(--space-6)' }}>
          <Text variant="heading-xs" as="h2" style={{ paddingBottom: 'var(--space-2)' }}>Headings</Text>
          {HEADING_VARIANTS.map((v) => <TypeRow key={v} variant={v} />)}

          <div style={{ marginTop: 'var(--space-12)' }}>
            <Text variant="heading-xs" as="h2" style={{ paddingBottom: 'var(--space-2)' }}>Subheadings</Text>
            {SUBHEADING_VARIANTS.map((v) => <TypeRow key={v} variant={v} />)}
          </div>

          <div style={{ marginTop: 'var(--space-12)' }}>
            <Text variant="heading-xs" as="h2" style={{ paddingBottom: 'var(--space-2)' }}>Body</Text>
            {BODY_VARIANTS.map((v) => <TypeRow key={v} variant={v} />)}
          </div>
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

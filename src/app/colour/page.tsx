import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';

const SEMANTIC_TOKENS = [
  { name: '--color-fill-base',      label: 'Fill Base',      description: 'Page background' },
  { name: '--color-fill-primary',   label: 'Fill Primary',   description: 'Card / elevated surface' },
  { name: '--color-fill-secondary', label: 'Fill Secondary', description: 'Input backgrounds' },
  { name: '--color-fill-tertiary',  label: 'Fill Tertiary',  description: 'Borders, dividers fill' },
  { name: '--color-text-primary',   label: 'Text Primary',   description: 'Body copy, headings' },
  { name: '--color-text-secondary', label: 'Text Secondary', description: 'Supporting text' },
  { name: '--color-text-tertiary',  label: 'Text Tertiary',  description: 'Metadata, captions' },
  { name: '--color-text-contrast',  label: 'Text Contrast',  description: 'Always white — use on coloured surfaces' },
  { name: '--color-outline',        label: 'Outline',        description: 'Border / rule colour' },
  { name: '--color-overlay-weak',   label: 'Overlay Weak',   description: '5% — very light tint' },
  { name: '--color-overlay-core',   label: 'Overlay Core',   description: '20% — button hover fill' },
  { name: '--color-overlay-strong', label: 'Overlay Strong', description: '60% — scrim, backdrop' },
] as const;

const STATUS_TOKENS = [
  { name: '--color-status-error',   label: 'Status Error',   description: 'Destructive / error state' },
  { name: '--color-status-warning', label: 'Status Warning', description: 'Caution state' },
  { name: '--color-status-info',    label: 'Status Info',    description: 'Informational state' },
  { name: '--color-status-success', label: 'Status Success', description: 'Positive / confirmed state' },
] as const;

function Swatch({ token }: { readonly token: string }): React.ReactElement {
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: `var(${token})`,
        border: '1px solid var(--color-outline)',
        flexShrink: 0,
      }}
    />
  );
}

function ColourRow({ name, label, description }: { readonly name: string; readonly label: string; readonly description: string }): React.ReactElement {
  return (
    <div>
      <Divider />
      <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr', gap: 'var(--space-6)', alignItems: 'center', paddingBlock: 'var(--space-5)' }}>
        <Swatch token={name} />
        <div>
          <Text variant="body-md" as="p">{label}</Text>
          <Text variant="body-sm" opacity={40} as="p">{name}</Text>
        </div>
        <Text variant="body-md" opacity={60} as="p">{description}</Text>
      </div>
    </div>
  );
}

export default function ColourPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol style={{ paddingTop: 'var(--space-16)' }}>
          <Text variant="heading-xl" as="h1">Colour</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Semantic tokens only.<br />
            Never raw hex in components.<br />
            All values shift automatically in dark mode.
          </Text>
        </StickyCol>
        <div style={{ paddingTop: 'var(--space-16)', paddingInline: 'var(--space-6)' }}>
          <Text variant="heading-xs" as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Surface &amp; text</Text>
          {SEMANTIC_TOKENS.map((token) => (
            <ColourRow key={token.name} {...token} />
          ))}
          <div style={{ marginTop: 'var(--space-12)' }}>
            <Text variant="heading-xs" as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Status</Text>
            {STATUS_TOKENS.map((token) => (
              <ColourRow key={token.name} {...token} />
            ))}
            <Divider />
          </div>
        </div>
      </Grid>
    </MainWrapper>
  );
}

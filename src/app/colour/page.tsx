import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';

/**
 * Colour catalogue.
 *
 * Type hierarchy follows the v3.3 Webflow-parity rule: every label is body-md;
 * emphasis comes from opacity, never size. Title is 100%, the subtitle and
 * section headings drop to 40%, descriptive copy sits at 60%.
 *
 * Status section is intentionally removed from this catalogue — status tokens
 * remain in the CSS for input-error styling but they aren't a colour the system
 * exposes for general use. (Token audit pending: see Meridian note "Colour token audit".)
 *
 * Each row supports an optional `usage` slot — a small live demo of how the
 * colour is intended to be used in context (button, divider, text). Leon will
 * supply usage examples; the scaffolding stays empty until then.
 */

interface ColourToken {
  readonly name: string;
  readonly label: string;
  readonly description: string;
  readonly usage?: React.ReactNode;
}

const CORE_TOKENS: readonly ColourToken[] = [
  { name: '--color-core-base',        label: 'Core Base',        description: 'Pure white (light) / pure black (dark) — system anchor' },
  { name: '--color-core-contrast',    label: 'Core Contrast',    description: 'Always white — text/icons on coloured fills' },
  { name: '--color-core-invert',      label: 'Core Invert',      description: 'Mirror of base — black (light) / white (dark)' },
  { name: '--color-core-transparent', label: 'Core Transparent', description: 'Zero-alpha base — use for fade transitions' },
];

const SEMANTIC_TOKENS: readonly ColourToken[] = [
  { name: '--color-fill-base',          label: 'Fill Base',          description: 'Page background' },
  { name: '--color-fill-primary',       label: 'Fill Primary',       description: 'Card / elevated surface' },
  { name: '--color-fill-secondary',     label: 'Fill Secondary',     description: 'Input backgrounds' },
  { name: '--color-fill-tertiary',      label: 'Fill Tertiary',      description: 'Borders, dividers fill' },
  { name: '--color-text-primary',       label: 'Text Primary',       description: 'Body copy, headings' },
  { name: '--color-text-secondary',     label: 'Text Secondary',     description: 'Supporting text' },
  { name: '--color-text-tertiary',      label: 'Text Tertiary',      description: 'Metadata, captions' },
  { name: '--color-text-contrast',      label: 'Text Contrast',      description: 'Always white — use on coloured surfaces' },
  { name: '--color-outline',            label: 'Outline',            description: 'Border / rule colour' },
  { name: '--color-grey-strong',        label: 'Grey Strong',        description: 'Heaviest grey block — stamps, inverted chips' },
  { name: '--color-grey-core',          label: 'Grey Core',          description: 'Solid grey emphasis — not for text' },
  { name: '--color-grey-weak',          label: 'Grey Weak',          description: 'Light grey panel / subtle elevated surface' },
  { name: '--color-transparent-weak',   label: 'Transparent Weak',   description: '5% — very light tint, dividers' },
  { name: '--color-transparent-core',   label: 'Transparent Core',   description: '20% — button hover fill' },
  { name: '--color-transparent-strong', label: 'Transparent Strong', description: '60% — scrim, backdrop' },
];

function Swatch({ token }: { readonly token: string }): React.ReactElement {
  return (
    <span
      style={{
        display: 'block',
        width: '40px',
        height: '40px',
        backgroundColor: `var(${token})`,
        border: '1px solid var(--color-outline)',
        flexShrink: 0,
        borderRadius: 'var(--radius-xs)',
      }}
    />
  );
}

function ColourRow({ name, label, description, usage }: ColourToken): React.ReactElement {
  return (
    <div>
      <Divider />
      <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr', gap: 'var(--space-6)', alignItems: 'start', paddingBlock: 'var(--space-5)' }}>
        <CopyValue value={`var(${name})`}>
          <Swatch token={name} />
        </CopyValue>
        <div>
          <Text variant="body-md" as="p">{label}</Text>
          <CopyValue value={name}>
            <Text variant="body-md" opacity={40} as="p">{name}</Text>
          </CopyValue>
        </div>
        <Text variant="body-md" opacity={60} as="p">{description}</Text>
      </div>
      {/* Usage example slot — rendered below the row, indented under the description column.
          Empty by default; populates when a token provides a `usage` ReactNode. */}
      {usage != null && (
        <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr', gap: 'var(--space-6)', paddingBottom: 'var(--space-5)' }}>
          <div />
          <div />
          <div>{usage}</div>
        </div>
      )}
    </div>
  );
}

export default function ColourPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Colour</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Semantic tokens only.<br />
            Never raw hex in components.<br />
            All values shift automatically in dark mode.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Core</Text>
          {CORE_TOKENS.map((token) => (
            <ColourRow key={token.name} {...token} />
          ))}
          <Divider />
          <div style={{ marginTop: 'var(--space-12)' }}>
            <Text variant="body-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Surface &amp; text</Text>
            {SEMANTIC_TOKENS.map((token) => (
              <ColourRow key={token.name} {...token} />
            ))}
            <Divider />
          </div>
        </div>
      </Grid>
    </MainWrapper>
  );
}

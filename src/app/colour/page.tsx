import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { SwatchCode } from '@/components/catalogue/SwatchCode';

/**
 * Colour catalogue — May 2026 spec (Figma 3904-2330).
 *
 * Each token is presented as a two-part row:
 *   1. Swatch card filled with the colour, CSS var name in mono at bottom-left.
 *      Text-colour tokens render a large "Aa" specimen in that colour over a
 *      neutral fill rather than a flat colour swatch.
 *   2. Metadata column: name in heading-sm, hex badge inline, body-sm 40% desc.
 *
 * Group headings sit in subheading-md (serif) with a single-line body-sm 40%
 * description below. Groups are separated by a horizontal divider.
 *
 * Hex values are the LIGHT MODE values per spec — the system inverts at runtime
 * via prefers-color-scheme and [data-theme], the page just documents the source.
 */

type ColourKind = 'fill' | 'text';

interface ColourToken {
  readonly name: string;
  readonly label: string;
  readonly hex: string;
  readonly description: string;
  readonly kind?: ColourKind;
}

interface ColourGroup {
  readonly title: string;
  readonly description: string;
  readonly tokens: readonly ColourToken[];
}

const GROUPS: readonly ColourGroup[] = [
  {
    title: 'Core',
    description: 'System anchors — pure values, not for general fills.',
    tokens: [
      { name: '--color-core-base',        label: 'Core Base',        hex: '#FFFFFF',     description: 'White (light) / black (dark) anchor' },
      { name: '--color-core-contrast',    label: 'Core Contrast',    hex: '#FFFFFF',     description: 'Always white — text on coloured fills' },
      { name: '--color-core-invert',      label: 'Core Invert',      hex: '#000000',     description: 'Mirror of base' },
      { name: '--color-core-transparent', label: 'Core Transparent', hex: 'transparent', description: 'Zero-alpha base — fade transitions' },
    ],
  },
  {
    title: 'Fill',
    description: 'Surface backgrounds, from page chrome to elevated cards.',
    tokens: [
      { name: '--color-fill-base',      label: 'Fill Base',      hex: '#FAFAFA', description: 'Page background' },
      { name: '--color-fill-primary',   label: 'Fill Primary',   hex: '#F4F4F5', description: 'Card / elevated surface' },
      { name: '--color-fill-secondary', label: 'Fill Secondary', hex: '#E4E4E7', description: 'Input backgrounds' },
      { name: '--color-fill-tertiary',  label: 'Fill Tertiary',  hex: '#D0D0D7', description: 'Borders, dividers fill' },
    ],
  },
  {
    title: 'Text',
    description: 'Type colours — demonstrated as "Aa" on the system page fill.',
    tokens: [
      { name: '--color-text-primary',   label: 'Text Primary',   hex: '#18181B', description: 'Body copy, headings',     kind: 'text' },
      { name: '--color-text-secondary', label: 'Text Secondary', hex: '#494951', description: 'Supporting text',         kind: 'text' },
      { name: '--color-text-tertiary',  label: 'Text Tertiary',  hex: '#A1A1AA', description: 'Metadata, captions',      kind: 'text' },
      { name: '--color-text-contrast',  label: 'Text Contrast',  hex: '#FFFFFF', description: 'On coloured surfaces',    kind: 'text' },
    ],
  },
  {
    title: 'Grey',
    description: 'Solid grey emphasis tokens — never use for body text.',
    tokens: [
      { name: '--color-grey-strong', label: 'Grey Strong', hex: '#212123', description: 'Heaviest grey block' },
      { name: '--color-grey-core',   label: 'Grey Core',   hex: '#212123', description: 'Solid grey emphasis' },
      { name: '--color-grey-weak',   label: 'Grey Weak',   hex: '#E4E4E7', description: 'Light grey panel' },
      { name: '--color-outline',     label: 'Outline',     hex: '#D0D0D7', description: 'Border / rule colour' },
    ],
  },
  {
    title: 'Transparent',
    description: 'Layered alpha overlays — for hover fills, scrims and dividers.',
    tokens: [
      { name: '--color-transparent-weak',   label: 'Transparent Weak',   hex: 'rgba(24,24,27,.05)', description: '5% — dividers, hairlines' },
      { name: '--color-transparent-core',   label: 'Transparent Core',   hex: 'rgba(24,24,27,.20)', description: '20% — button hover fill' },
      { name: '--color-transparent-strong', label: 'Transparent Strong', hex: 'rgba(24,24,27,.60)', description: '60% — scrim, backdrop' },
    ],
  },
  {
    title: 'Accent',
    description: 'Semantic status and emphasis colours — inverts to lighter values in dark mode. Aliased as error / warning / success / info on status tokens.',
    tokens: [
      { name: '--accent-red',    label: 'Accent Red',    hex: '#CC0019', description: 'Destructive actions, errors' },
      { name: '--accent-orange', label: 'Accent Orange', hex: '#E66900', description: 'Warnings, caution states' },
      { name: '--accent-yellow', label: 'Accent Yellow', hex: '#E6C800', description: 'Highlights, attention' },
      { name: '--accent-green',  label: 'Accent Green',  hex: '#009650', description: 'Success, confirmation' },
      { name: '--accent-blue',   label: 'Accent Blue',   hex: '#005096', description: 'Informational, links' },
    ],
  },
];

function Swatch({ token }: { readonly token: ColourToken }): React.ReactElement {
  const isText = token.kind === 'text';
  return (
    <div className="colour-swatch" data-kind={token.kind ?? 'fill'}>
      {isText ? (
        <span className="colour-swatch-aa" style={{ color: `var(${token.name})` }} aria-hidden="true">Aa</span>
      ) : (
        <span className="colour-swatch-fill" style={{ backgroundColor: `var(${token.name})` }} aria-hidden="true" />
      )}
      <SwatchCode value={token.name} />
    </div>
  );
}

function ColourRow({ token }: { readonly token: ColourToken }): React.ReactElement {
  // Label rendered at body-md (not heading-sm) — the swatch is the hero, the
  // label is supporting metadata. Hex badge and description carry secondary
  // emphasis via background + opacity rather than larger type.
  return (
    <div className="colour-row">
      <Swatch token={token} />
      <div className="colour-row-meta">
        <div className="colour-row-heading">
          <Text variant="heading-md" as="p">{token.label}</Text>
          <CopyValue value={token.hex} className="colour-row-hex">
            <code>{token.hex}</code>
          </CopyValue>
        </div>
        <Text variant="body-sm" opacity={40} as="p">{token.description}</Text>
      </div>
    </div>
  );
}

export default function ColourPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Colour"
            description="Semantic tokens only — values invert at runtime."
          />
        </StickyCol>
        <div>
          {GROUPS.map((group, gi) => (
            <section key={group.title}>
              {gi > 0 && <Divider />}
              <div className="colour-group-header" style={gi === 0 ? { paddingBlockStart: 0 } : undefined}>
                <Text variant="heading-md" as="h2">{group.title}</Text>
                <Text variant="body-sm" opacity={40} as="p">{group.description}</Text>
              </div>
              <div className="colour-group-list">
                {group.tokens.map((token) => (
                  <ColourRow key={token.name} token={token} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Grid>
    </MainWrapper>
  );
}

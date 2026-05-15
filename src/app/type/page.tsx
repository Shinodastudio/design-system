import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { RichText } from '@/components/primitives/RichText';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { HEADING_VARIANTS, SUBHEADING_VARIANTS, BODY_VARIANTS, OPACITY_LEVELS } from '@/lib/tokens';
import type { TypeVariant, OpacityLevel } from '@/lib/tokens';

/**
 * Type catalogue — May 2026 spec.
 *
 * Single home for everything text-shaped:
 *   - Heading / Subheading / Body scales
 *   - Inline text styles (italic, allcaps, etc.)
 *   - Text colour tokens
 *   - Alignment utilities
 *   - Rich-text long-form demo
 *   - Opacity scale (only legal levels)
 *
 * Per May 2026 spec, the standalone /components/rich-text page is folded in
 * here. The components index no longer lists it.
 */

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

interface TextUtility {
  readonly className: string;
  readonly demo: string;
  readonly description: string;
}

const TEXT_UTILITIES: readonly TextUtility[] = [
  { className: 'text-style-italic',        demo: 'Italic emphasis',                                                  description: 'font-style: italic' },
  { className: 'text-style-strikethrough', demo: 'Strikethrough copy',                                               description: 'text-decoration: line-through' },
  { className: 'text-style-allcaps',       demo: 'All caps run',                                                     description: 'uppercase + wide tracking' },
  { className: 'text-style-nowrap',        demo: 'No wrap inside this run',                                          description: 'white-space: nowrap' },
  { className: 'text-style-muted',         demo: 'Muted secondary copy',                                             description: 'opacity 40 — same as op-40' },
  { className: 'text-style-2lines',        demo: 'Two-line clamp — line one continues here and line two finally cuts off', description: '-webkit-line-clamp: 2' },
  { className: 'text-style-3lines',        demo: 'Three-line clamp — the body wraps to fill three visual lines before the ellipsis truncates the rest of the run', description: '-webkit-line-clamp: 3' },
];

interface TextColour {
  readonly token: string;
  readonly note: string;
}

const TEXT_COLOURS: readonly TextColour[] = [
  { token: '--color-text-primary',   note: 'Primary text — heading + body default' },
  { token: '--color-text-secondary', note: 'Secondary — captions, supporting copy' },
  { token: '--color-text-tertiary',  note: 'Tertiary — disabled, placeholder, metadata' },
  { token: '--color-text-contrast',  note: 'Contrast — text on dark fills' },
];

const TEXT_ALIGNMENTS = [
  { className: 'text-align-left',   demo: 'Aligned to the left edge — default for body copy.' },
  { className: 'text-align-center', demo: 'Centered run — reserve for very short labels.' },
  { className: 'text-align-right',  demo: 'Aligned to the right edge.' },
] as const;

function TypeRow({ variant }: { readonly variant: TypeVariant }): React.ReactElement {
  const meta = TYPE_META[variant] ?? { size: '', tracking: '' };
  return (
    <div>
      <Divider />
      <div className="type-row">
        <Text variant={variant} as="p">The quick brown fox</Text>
        <div className="type-row-meta">
          <CopyValue value={`.${variant}`}>
            <Text variant="body-xs" opacity={40} as="span">{variant}</Text>
          </CopyValue>
          <Text variant="body-xs" opacity={40} as="span">{meta.size} / {meta.tracking}</Text>
        </div>
      </div>
    </div>
  );
}

function UtilityRow({ utility }: { readonly utility: TextUtility }): React.ReactElement {
  return (
    <div>
      <Divider />
      <div className="type-row">
        <p className={utility.className} style={{ fontSize: '1.25rem', maxWidth: '32em' }}>
          {utility.demo}
        </p>
        <div className="type-row-meta">
          <CopyValue value={`.${utility.className}`}>
            <Text variant="body-xs" opacity={40} as="span">.{utility.className}</Text>
          </CopyValue>
          <Text variant="body-xs" opacity={40} as="span">{utility.description}</Text>
        </div>
      </div>
    </div>
  );
}

export default function TypePage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Type"
            description="Hierarchy through opacity, never through size."
          />
        </StickyCol>
        <div style={{ paddingLeft: 'var(--padding-columns)' }}>
          <Text variant="subheading-md" as="h2" className="type-section-heading">Headings</Text>
          {HEADING_VARIANTS.map((v) => <TypeRow key={v} variant={v} />)}

          <Text variant="subheading-md" as="h2" className="type-section-heading">Subheadings</Text>
          {SUBHEADING_VARIANTS.map((v) => <TypeRow key={v} variant={v} />)}

          <Text variant="subheading-md" as="h2" className="type-section-heading">Body</Text>
          {BODY_VARIANTS.map((v) => <TypeRow key={v} variant={v} />)}

          <Text variant="subheading-md" as="h2" className="type-section-heading">Inline text styles</Text>
          <Text variant="body-sm" opacity={40} as="p" style={{ paddingBottom: 'var(--space-4)' }}>
            Single-class modifiers applied to runs of type. Combine with any variant.
          </Text>
          {TEXT_UTILITIES.map((u) => <UtilityRow key={u.className} utility={u} />)}

          <Text variant="subheading-md" as="h2" className="type-section-heading">Text colour</Text>
          <Text variant="body-sm" opacity={40} as="p" style={{ paddingBottom: 'var(--space-4)' }}>
            Four semantic text-colour tokens. Use the token, never a raw hex.
          </Text>
          {TEXT_COLOURS.map((c) => (
            <div key={c.token}>
              <Divider />
              <div className="type-row">
                <p style={{ color: `var(${c.token})`, fontSize: '1.25rem' }}>The quick brown fox</p>
                <div className="type-row-meta">
                  <CopyValue value={c.token}>
                    <Text variant="body-xs" opacity={40} as="span">{c.token}</Text>
                  </CopyValue>
                  <Text variant="body-xs" opacity={40} as="span">{c.note}</Text>
                </div>
              </div>
            </div>
          ))}

          <Text variant="subheading-md" as="h2" className="type-section-heading">Alignment</Text>
          <Text variant="body-sm" opacity={40} as="p" style={{ paddingBottom: 'var(--space-4)' }}>
            Three alignment utilities. Apply to a block-level element.
          </Text>
          {TEXT_ALIGNMENTS.map((a) => (
            <div key={a.className}>
              <Divider />
              <div className="type-row">
                <p className={a.className} style={{ fontSize: '1.25rem', width: '100%' }}>
                  {a.demo}
                </p>
                <div className="type-row-meta">
                  <CopyValue value={`.${a.className}`}>
                    <Text variant="body-xs" opacity={40} as="span">.{a.className}</Text>
                  </CopyValue>
                </div>
              </div>
            </div>
          ))}

          <Text variant="subheading-md" as="h2" className="type-section-heading">Rich text</Text>
          <Text variant="body-sm" opacity={40} as="p" style={{ paddingBottom: 'var(--space-4)' }}>
            Long-form flow — every HTML primitive styled to system. The <code>&lt;RichText&gt;</code> wrapper holds h1–h6, p, lists, blockquote, code, hr, and figure with caption.
          </Text>
          <Divider />
          <div style={{ paddingBlock: 'var(--space-6)' }}>
            <RichText>
              <h1>Heading 1</h1>
              <p>The grain of a system is felt in the longest paragraph, not the loudest button.</p>
              <h2>Heading 2</h2>
              <p>Tracking eases at smaller sizes. Opacity carries hierarchy where size cannot.</p>
              <ul>
                <li>Tokens before components.</li>
                <li>Opacity before colour.</li>
                <li>Hierarchy before decoration.</li>
              </ul>
              <blockquote>To dwell is to garden. Every line is a row that needs weeding.</blockquote>
              <p>Inline <code>--space-4</code> keeps rhythm consistent.</p>
              <hr />
              <figure>
                <div className="rich-text-image-placeholder" role="img" aria-label="Placeholder image" />
                <figcaption>A pear orchard, October. The grain of the season is in the leaves, not the headline.</figcaption>
              </figure>
            </RichText>
          </div>

          <Text variant="subheading-md" as="h2" className="type-section-heading">Opacity scale</Text>
          <Text variant="body-sm" opacity={40} as="p" style={{ paddingBottom: 'var(--space-4)' }}>
            The only four content opacities permitted in the system.
          </Text>
          {OPACITY_LEVELS.map((level: OpacityLevel) => (
            <div key={level}>
              <Divider />
              <div className="type-row">
                <Text variant="body-md" opacity={level} as="span">Text at {level}%</Text>
                <div className="type-row-meta">
                  <CopyValue value={`.op-${level}`}>
                    <Text variant="body-xs" opacity={40} as="span">.op-{level}</Text>
                  </CopyValue>
                </div>
              </div>
            </div>
          ))}
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

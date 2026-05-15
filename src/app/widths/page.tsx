import { MainWrapper } from '@/components/layout/MainWrapper';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { CONTAINER_TOKENS, BREAKPOINT_TOKENS, CONTAINER_MAXWIDTH_TOKEN } from '@/lib/tokens';

/**
 * Widths — container scale, responsive page max-width, breakpoint thresholds.
 *
 * Full-width layout: content spans both columns. Each token is visualised
 * as a 2D box whose width equals the token value, with a label beside it
 * showing the token name and pixel value.
 */

function WidthRow({
  name,
  value,
}: {
  readonly name: string;
  readonly value: string;
}): React.ReactElement {
  return (
    <div>
      <Divider />
      <div className="width-bar-row">
        <div className="width-bar" style={{ width: value }} />
        <div className="width-bar-label">
          <CopyValue value={name}>
            <Text variant="body-sm" as="span">{name}</Text>
          </CopyValue>
          <Text variant="body-sm" opacity={40} as="span">{value}</Text>
        </div>
      </div>
    </div>
  );
}

export default function WidthsPage(): React.ReactElement {
  const maxwidthEntries = Object.entries(CONTAINER_MAXWIDTH_TOKEN.values) as ReadonlyArray<[string, string]>;

  return (
    <MainWrapper>
      <div className="page-wide-intro">
        <CatalogueIntro
          title="Widths"
          description="Container scale, responsive page max-width, and breakpoint thresholds."
        />
      </div>

      {/* ── Containers ───────────────────────────────────────────────── */}
      <section className="page-wide-section">
        <Text variant="heading-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-6)' }}>
          Containers
        </Text>
        {CONTAINER_TOKENS.map(({ name, value }) => (
          <WidthRow key={name} name={name} value={value} />
        ))}
        <Divider />
      </section>

      {/* ── Page max-width (responsive) ──────────────────────────────── */}
      <section className="page-wide-section">
        <Text variant="heading-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-6)' }}>
          Page max-width (responsive)
        </Text>
        {maxwidthEntries.map(([canvas, value]) => (
          <WidthRow
            key={canvas}
            name={`${CONTAINER_MAXWIDTH_TOKEN.name} · ${canvas}`}
            value={value}
          />
        ))}
        <Divider />
      </section>

      {/* ── Breakpoints ──────────────────────────────────────────────── */}
      <section className="page-wide-section">
        <Text variant="heading-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-6)' }}>
          Breakpoints
        </Text>
        {BREAKPOINT_TOKENS.map(({ name, value }) => (
          <WidthRow key={name} name={name} value={value} />
        ))}
        <Divider />
      </section>
    </MainWrapper>
  );
}

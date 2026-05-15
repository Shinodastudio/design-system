import { MainWrapper } from '@/components/layout/MainWrapper';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { PADDING_TOKENS, SPACING_TOKENS } from '@/lib/tokens';

/**
 * Paddings — semantic responsive padding tokens + 4px base spacing scale.
 *
 * Full-width layout. Semantic tokens show a bar at their desktop pixel value
 * (em × 16). Spacing scale uses the same horizontal-bar pattern.
 */
export default function PaddingsPage(): React.ReactElement {
  return (
    <MainWrapper>
      <div className="page-wide-intro">
        <CatalogueIntro
          title="Paddings"
          description="Semantic padding tokens — page, section, container, nav, card."
        />
      </div>

      {/* ── Semantic ────────────────────────────────────────────────── */}
      <section className="page-wide-section">
        <Text variant="heading-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-6)' }}>
          Semantic
        </Text>
        {PADDING_TOKENS.map(({ name, value, note }) => {
          const pxWidth = parseFloat(value) * 16;
          return (
            <div key={name}>
              <Divider />
              <div className="width-bar-row">
                <div className="width-bar" style={{ width: pxWidth }} />
                <div className="width-bar-label">
                  <CopyValue value={name}>
                    <Text variant="body-sm" as="span">{name}</Text>
                  </CopyValue>
                  <Text variant="body-sm" opacity={40} as="span">
                    {value} <span style={{ opacity: 0.6 }}>· {note}</span>
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
        <Divider />
      </section>

      {/* ── Spacing scale ───────────────────────────────────────────── */}
      <section className="page-wide-section">
        <Text variant="heading-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-6)' }}>
          Spacing scale (base unit 4px)
        </Text>
        {SPACING_TOKENS.map(({ name, value }) => (
          <div key={name}>
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', paddingBlock: 'var(--space-4)' }}>
              <div
                style={{
                  height: '1px',
                  width: value,
                  backgroundColor: 'var(--color-text-primary)',
                  flexShrink: 0,
                  maxWidth: '100%',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', flex: 1 }}>
                <CopyValue value={name}>
                  <Text variant="body-sm" as="span">{name}</Text>
                </CopyValue>
                <Text variant="body-sm" opacity={40} as="span">{value}</Text>
              </div>
            </div>
          </div>
        ))}
        <Divider />
      </section>
    </MainWrapper>
  );
}

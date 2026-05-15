import { MainWrapper } from '@/components/layout/MainWrapper';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { SPACING_TOKENS } from '@/lib/tokens';

/**
 * Margins — 4px base spacing scale, same as paddings.
 * Full-width layout. Each step visualised as a hatched block (width = value).
 */
export default function MarginsPage(): React.ReactElement {
  return (
    <MainWrapper>
      <div className="page-wide-intro">
        <CatalogueIntro
          title="Margins"
          description="Same 4px base scale as paddings — use to separate independent blocks."
        />
      </div>

      <section className="page-wide-section">
        <Text variant="heading-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-6)' }}>
          Scale
        </Text>
        {SPACING_TOKENS.map(({ name, value }) => (
          <div key={name}>
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', paddingBlock: 'var(--space-4)' }}>
              <div
                style={{
                  width: value,
                  height: '24px',
                  flexShrink: 0,
                  background: 'repeating-linear-gradient(45deg, var(--color-transparent-core) 0 2px, transparent 2px 4px)',
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

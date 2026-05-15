import { MainWrapper } from '@/components/layout/MainWrapper';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { CodeBlock } from '@/components/catalogue/CodeBlock';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

/**
 * Grids — full-width layout so the grid demos can span the entire content area.
 */

const GRID_DEMOS = [
  {
    name: '.grid-2col',
    description: 'Two equal columns — the only column system. Always 1fr 1fr.',
    cols: '1fr 1fr',
    cells: 2,
  },
  {
    name: 'Single column',
    description: 'Stacked layout for narrow viewports. Set explicit grid-template-columns: 1fr.',
    cols: '1fr',
    cells: 1,
  },
] as const;

export default function GridsPage(): React.ReactElement {
  return (
    <MainWrapper>
      <div className="page-wide-intro">
        <CatalogueIntro
          title="Grids"
          description="Always 1fr 1fr — never asymmetric, never three columns."
        />
      </div>

      <section className="page-wide-section">
        {GRID_DEMOS.map(({ name, description, cols, cells }, idx) => (
          <div key={name} style={idx > 0 ? { paddingBlockStart: 'var(--padding-section-sm)' } : undefined}>
            <Text variant="heading-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-2)' }}>
              <CopyValue value={name}>{name}</CopyValue>
            </Text>
            <Text variant="body-sm" opacity={40} as="p" style={{ paddingBottom: 'var(--space-6)' }}>
              {description}
            </Text>
            <Divider />
            <div style={{ paddingBlock: 'var(--space-8)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '1px', backgroundColor: 'var(--color-outline)' }}>
                {Array.from({ length: cells }).map((_, colIdx) => (
                  <div key={colIdx} style={{ backgroundColor: 'var(--color-fill-secondary)', padding: 'var(--space-8)' }}>
                    <Text variant="body-sm" opacity={40} as="p">Column {colIdx + 1} — {cols.split(' ')[colIdx]}</Text>
                  </div>
                ))}
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </section>

      <section className="page-wide-section">
        <Text variant="heading-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Usage</Text>
        <CodeBlock
          code={`<div className="grid-2col">
  <div>Column 1</div>
  <div>Column 2</div>
</div>`}
        />
      </section>
    </MainWrapper>
  );
}

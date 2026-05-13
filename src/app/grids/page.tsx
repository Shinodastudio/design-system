import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { CodeBlock } from '@/components/catalogue/CodeBlock';

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
      <Grid>
        <StickyCol style={{ paddingTop: 'var(--space-16)' }}>
          <Text variant="heading-xl" as="h1">Grids</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Grid is always 1fr 1fr.<br />
            Never asymmetric. Never three columns.<br /><br />
            No vertical dividers, ever.<br />
            Horizontal dividers at 5% opacity.
          </Text>
        </StickyCol>
        <div style={{ paddingTop: 'var(--space-16)', paddingInline: 'var(--space-6)' }}>
          {GRID_DEMOS.map(({ name, description, cols, cells }) => (
            <div key={name} style={{ marginBottom: 'var(--space-12)' }}>
              <Text variant="heading-xs" as="h2" style={{ paddingBottom: 'var(--space-2)' }}>
                <CopyValue value={name}>{name}</CopyValue>
              </Text>
              <Text variant="body-xs" opacity={40} as="p" style={{ paddingBottom: 'var(--space-4)' }}>
                {description}
              </Text>
              <Divider />
              <div style={{ paddingBlock: 'var(--space-8)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '1px', backgroundColor: 'var(--color-outline)' }}>
                  {Array.from({ length: cells }).map((_, idx) => (
                    <div key={idx} style={{ backgroundColor: 'var(--color-fill-secondary)', padding: 'var(--space-8)' }}>
                      <Text variant="body-sm" opacity={40} as="p">Column {idx + 1} — {cols.split(' ')[idx]}</Text>
                    </div>
                  ))}
                </div>
              </div>
              <Divider />
            </div>
          ))}

          <div style={{ marginTop: 'var(--space-12)' }}>
            <Text variant="heading-xs" as="h2" style={{ paddingBottom: 'var(--space-4)' }}>Usage</Text>
            <CodeBlock
              code={`<div className="grid-2col">
  <div>Column 1</div>
  <div>Column 2</div>
</div>`}
            />
          </div>
        </div>
      </Grid>
    </MainWrapper>
  );
}

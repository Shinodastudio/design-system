'use client';

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { GridTile, GridTileAction } from '@/components/cards/GridTile';
import { Icon } from '@/components/icons/Icon';

const SIZES = ['default'] as const;

const ITEMS = [
  { id: 'a', label: 'Apricot',  time: '12:34 PM' },
  { id: 'b', label: 'Briar',    time: '12:31 PM' },
  { id: 'c', label: 'Camphor',  time: '12:30 PM' },
  { id: 'd', label: 'Damson',   time: '12:28 PM' },
  { id: 'e', label: 'Ember',    time: '12:25 PM' },
  { id: 'f', label: 'Fennel',   time: '12:22 PM' },
] as const;

export default function CardPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Card"
            description="Square content tiles with hover-revealed actions and timestamps. Use for asset libraries, content grids, or anywhere a one-tap-or-two interaction is preferable to a context menu."
          />
        </StickyCol>
        <div>
          <ComponentSection
            name="GridTile"
            description="Square aspect, no outline at rest. A dashed outline lights when any action button inside the tile is hovered or keyboard-focused. The inner content dims to 20% while a button is hovered so the action row stays legible. Meta text sits in the grid gap and only appears on hover."
            code={`<GridTile\n  meta="12:34 PM"\n  actions={\n    <>\n      <GridTileAction ariaLabel="Delete" variant="danger" onClick={fn}>\n        <Icon name="Trash" size="sm" />\n      </GridTileAction>\n      <GridTileAction ariaLabel="Download" onClick={fn}>\n        <Icon name="DownloadSimple" size="sm" />\n      </GridTileAction>\n    </>\n  }\n>\n  {/* tile content */}\n</GridTile>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: 'var(--space-2)',
                  rowGap: 'var(--space-10)',
                  width: '100%',
                }}
              >
                {ITEMS.map((item) => (
                  <GridTile
                    key={item.id}
                    ariaLabel={item.label}
                    meta={item.time}
                    actions={
                      <>
                        <GridTileAction ariaLabel="Delete" variant="danger" onClick={(): void => {}}>
                          <Icon name="Trash" size="sm" />
                        </GridTileAction>
                        <GridTileAction ariaLabel="Download" onClick={(): void => {}}>
                          <Icon name="DownloadSimple" size="sm" />
                        </GridTileAction>
                      </>
                    }
                  >
                    <span
                      className="body-md"
                      style={{ opacity: 'var(--opacity-40)', letterSpacing: 'var(--tracking-n010)' }}
                    >
                      {item.label}
                    </span>
                  </GridTile>
                ))}
              </div>
            )}
          />
        </div>
      </Grid>
    </MainWrapper>
  );
}

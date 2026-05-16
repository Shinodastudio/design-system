'use client';

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';

const SIZES = ['default'] as const;

export default function MapPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Map"
            description="Interactive Leaflet map with marker support and click-to-coordinates callback."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="Map"
            description="Requires react-leaflet — an optional peer dependency not installed in this environment."
            code={`// Install first:\n// bun add react-leaflet leaflet @types/leaflet\n\nimport { Map } from '@/components/map/Map';\n\n<Map\n  center={[51.505, -0.09]}\n  zoom={13}\n  markers={[{ position: [51.505, -0.09], label: 'London' }]}\n  onMapClick={(pos) => console.log(pos)}\n/>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div
                style={{
                  width: '100%',
                  height: '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-3)',
                  border: '1px solid var(--color-outline)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--space-6)',
                }}
              >
                <p className="body-sm">
                  Map component requires <code>react-leaflet</code> — not installed in this environment.
                </p>
                <p className="body-sm op-60">
                  Install with: <code>bun add react-leaflet leaflet @types/leaflet</code>
                </p>
                <p className="body-sm op-40">
                  The Map component handles the missing dependency gracefully at runtime — it renders
                  a fallback notice rather than crashing.
                </p>
              </div>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}

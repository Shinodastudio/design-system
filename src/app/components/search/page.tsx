'use client';

import { useState } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import type { SearchOption } from '@/components/search/SearchDropdown';

const SIZES = ['default'] as const;

const DESIGN_TOKENS: readonly SearchOption[] = [
  { value: 'color-primary', label: 'color-primary', description: 'Primary text colour token' },
  { value: 'color-fill-base', label: 'color-fill-base', description: 'Background fill token' },
  { value: 'space-4', label: 'space-4', description: '16px standard block padding' },
  { value: 'space-8', label: 'space-8', description: '32px section spacing' },
  { value: 'radius-sm', label: 'radius-sm', description: 'Small border radius' },
  { value: 'opacity-60', label: 'opacity-60', description: '60% opacity — secondary content' },
] as const;

const CITIES: readonly SearchOption[] = [
  { value: 'london', label: 'London', description: 'United Kingdom' },
  { value: 'paris', label: 'Paris', description: 'France' },
  { value: 'berlin', label: 'Berlin', description: 'Germany' },
  { value: 'amsterdam', label: 'Amsterdam', description: 'Netherlands' },
  { value: 'lisbon', label: 'Lisbon', description: 'Portugal' },
] as const;

export default function SearchPage(): React.ReactElement {
  const [tokenValue, setTokenValue] = useState<string | undefined>(undefined);
  const [cityValue, setCityValue] = useState<string | undefined>(undefined);

  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Search"
            description="Filterable search dropdown with keyboard navigation and optional item descriptions."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="SearchDropdown"
            description="Filters options as you type. Keyboard navigable with arrow keys and Enter."
            code={`<SearchDropdown\n  options={options}\n  value={value}\n  onChange={setValue}\n  placeholder="Search tokens…"\n/>`}
            sizes={SIZES}
            states={['default', 'disabled']}
            render={({ state }): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '20em' }}>
                <SearchDropdown
                  options={DESIGN_TOKENS}
                  value={tokenValue}
                  onChange={setTokenValue}
                  placeholder="Search tokens…"
                  disabled={state === 'disabled'}
                />
              </div>
            )}
          />

          <ComponentSection
            name="SearchDropdown with descriptions"
            description="Each option can carry a secondary description line rendered at 40% opacity."
            code={`const options = [\n  { value: 'london', label: 'London', description: 'United Kingdom' },\n  …\n];\n\n<SearchDropdown options={options} onChange={setValue} />`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '20em' }}>
                <SearchDropdown
                  options={CITIES}
                  value={cityValue}
                  onChange={setCityValue}
                  placeholder="Search cities…"
                />
              </div>
            )}
          />

          <ComponentSection
            name="SearchDropdown — loading state"
            description="Pass isLoading to show a loading message while options are being fetched."
            code={`<SearchDropdown options={[]} isLoading placeholder="Searching…" />`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '20em' }}>
                <SearchDropdown
                  options={[]}
                  isLoading
                  placeholder="Searching…"
                />
              </div>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}

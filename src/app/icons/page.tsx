'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { Input, InputField } from '@/components/primitives/Input';
import { Tabs, TabsList, TabsTrigger } from '@/components/primitives/Tabs';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { Icon, ICONS, type IconSize } from '@/components/icons';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

const SIZE_OPTIONS: readonly IconSize[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'];

const SIZE_PX: Record<IconSize, number> = {
  '2xs': 12,
  xs:    14,
  sm:    16,
  md:    20,
  lg:    24,
  xl:    32,
  em:    0,
};

export default function IconPage(): React.ReactElement {
  const [query, setQuery] = useState('');
  const [size, setSize] = useState<IconSize>('md');
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (q === '') return ICONS;
    const terms = q.split(/\s+/).filter(Boolean);
    return ICONS.filter((icon) => {
      const haystack = `${icon.id.toLowerCase()} ${icon.displayName.toLowerCase()} ${icon.tags.join(' ')}`;
      return terms.every((term) => haystack.includes(term));
    });
  }, [deferredQuery]);

  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Icon"
            description={`${ICONS.length} icons — filled weight, 32px viewBox, currentColor. Search by name or tag.`}
          />

          <div style={{ marginTop: 'var(--space-8)' }}>
            <InputField>
              <Input
                id="icon-search"
                placeholder="arrow, settings, delete, home..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
            </InputField>
          </div>
        </StickyCol>
        <div>
          <Tabs defaultValue={size} value={size} onValueChange={(v) => setSize(v as IconSize)}>
            <TabsList ariaLabel="Icon size">
              {SIZE_OPTIONS.map((s) => (
                <TabsTrigger key={s} value={s}>{SIZE_PX[s]}px</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Text variant="body-sm" opacity={40} as="p" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            {filtered.length.toLocaleString()} of {ICONS.length.toLocaleString()}
          </Text>
          <Divider />
          {/* Icon grid — May 2026 spec section 16.
              Default state: icon only. Hover: icon swaps to the icon name in
              body-sm 40% opacity. Names wrap rather than forcing the cell to
              expand. The grid uses a tighter minmax floor so significantly more
              icons fit per row at small viewports. */}
          <div className="icon-grid">
            {filtered.map((icon) => {
              const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor">${icon.body}</svg>`;
              return (
                <CopyValue key={icon.id} value={svgMarkup} className="icon-grid-cell">
                  <span className="icon-grid-glyph">
                    <Icon name={icon.id} size={size} title={icon.displayName} />
                  </span>
                  <span className="icon-grid-name body-sm op-40">
                    {icon.displayName}
                  </span>
                </CopyValue>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <Text variant="body-sm" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
              No icons match &ldquo;{query}&rdquo;.
            </Text>
          )}
        </div>
      </Grid>
    </MainWrapper>
  );
}

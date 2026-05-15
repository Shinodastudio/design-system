'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { Input, InputField, InputLabel } from '@/components/primitives/Input';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { Icon, ICONS, type IconSize } from '@/components/icons';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

const SIZE_OPTIONS: readonly IconSize[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'];

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
              <InputLabel htmlFor="icon-search">Search</InputLabel>
              <Input
                id="icon-search"
                placeholder="arrow, settings, delete, home..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
            </InputField>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <Text variant="body-sm" opacity={40} as="p" style={{ marginBottom: 'var(--space-2)' }}>Size</Text>
              <div className="button-row">
                {SIZE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className="btn"
                    style={{
                      fontSize: '0.875rem',
                      padding: '0.1em 0.5em',
                      opacity: s === size ? 1 : 'var(--opacity-40)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </StickyCol>
        <div style={{ paddingLeft: 'var(--padding-columns)' }}>
          <Text variant="body-sm" opacity={40} as="p" style={{ marginBottom: 'var(--space-4)' }}>
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
              const importStmt = `<Icon name="${icon.id}" />`;
              return (
                <CopyValue key={icon.id} value={importStmt} className="icon-grid-cell">
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

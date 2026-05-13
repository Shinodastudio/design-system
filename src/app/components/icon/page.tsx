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
        <StickyCol style={{ paddingTop: 'var(--space-16)' }}>
          <Text variant="heading-xl" as="h1">Icon</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            {ICONS.length} icons. Filled weight, 32px viewBox, currentColor.<br /><br />
            Sized via <code>--icon-2xs</code> (12px) to <code>--icon-xl</code> (32px).<br />
            Search by name or tag. Click any tile to copy the JSX.
          </Text>

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
        <div style={{ paddingTop: 'var(--space-16)', paddingInline: 'var(--space-6)' }}>
          <Text variant="body-sm" opacity={40} as="p" style={{ marginBottom: 'var(--space-4)' }}>
            {filtered.length.toLocaleString()} of {ICONS.length.toLocaleString()}
          </Text>
          <Divider />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '1px',
              backgroundColor: 'var(--color-transparent-weak)',
              marginTop: 'var(--space-4)',
            }}
          >
            {filtered.map((icon) => {
              const importStmt = `<Icon name="${icon.id}" />`;
              return (
                <CopyValue key={icon.id} value={importStmt}>
                  <div
                    style={{
                      backgroundColor: 'var(--color-fill-base)',
                      padding: 'var(--space-6) var(--space-4)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      width: '100%',
                      minHeight: '110px',
                    }}
                  >
                    <Icon name={icon.id} size={size} title={icon.displayName} />
                    <Text variant="body-2xs" opacity={40} as="span" className="text-nowrap">
                      {icon.displayName}
                    </Text>
                  </div>
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

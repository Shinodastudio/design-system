'use client';

import { useState } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { FloatingActionBar } from '@/components/actions/FloatingActionBar';
import type { FloatingAction } from '@/components/actions/FloatingActionBar';
import { Button } from '@/components/primitives/Button';

const SIZES = ['default'] as const;

const BASE_ACTIONS: readonly FloatingAction[] = [
  { label: 'Edit', onClick: () => undefined },
  { label: 'Duplicate', onClick: () => undefined },
  { label: 'Archive', onClick: () => undefined },
];

const DESTRUCTIVE_ACTIONS: readonly FloatingAction[] = [
  { label: 'Edit', onClick: () => undefined },
  { label: 'Delete', onClick: () => undefined, variant: 'destructive' },
];

export default function ActionsPage(): React.ReactElement {
  const [selected, setSelected] = useState(3);
  const [selectedDestructive, setSelectedDestructive] = useState(2);

  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Actions"
            description="Floating Action Bar — contextual bulk actions that appear when items are selected."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="FloatingActionBar"
            description="Renders only when selected > 0. Shows count, optional clear, and action buttons."
            code={`<FloatingActionBar\n  selected={3}\n  actions={actions}\n  onClearSelection={() => setSelected(0)}\n/>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%' }}>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <Button size="sm" onClick={() => setSelected(prev => Math.max(0, prev - 1))}>
                    −
                  </Button>
                  <Button size="sm" onClick={() => setSelected(prev => prev + 1)}>
                    +
                  </Button>
                  <span className="body-sm op-60" style={{ alignSelf: 'center', marginLeft: 'var(--space-2)' }}>
                    {selected} item{selected !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <FloatingActionBar
                  selected={selected}
                  actions={BASE_ACTIONS}
                  onClearSelection={() => setSelected(0)}
                />
              </div>
            )}
          />

          <ComponentSection
            name="FloatingActionBar — destructive variant"
            description="Mark an action variant: 'destructive' to render it with status-error styling."
            code={`const actions = [\n  { label: 'Edit', onClick: fn },\n  { label: 'Delete', onClick: fn, variant: 'destructive' },\n];\n\n<FloatingActionBar selected={2} actions={actions} />`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%' }}>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <Button size="sm" onClick={() => setSelectedDestructive(prev => Math.max(0, prev - 1))}>
                    −
                  </Button>
                  <Button size="sm" onClick={() => setSelectedDestructive(prev => prev + 1)}>
                    +
                  </Button>
                  <span className="body-sm op-60" style={{ alignSelf: 'center', marginLeft: 'var(--space-2)' }}>
                    {selectedDestructive} item{selectedDestructive !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <FloatingActionBar
                  selected={selectedDestructive}
                  actions={DESTRUCTIVE_ACTIONS}
                  onClearSelection={() => setSelectedDestructive(0)}
                />
              </div>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}

'use client';

import { useState } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { PADDING_TOKENS, SPACING_TOKENS } from '@/lib/tokens';

/**
 * Paddings — semantic responsive padding tokens + spacing scale.
 *
 * Breakpoint toggle shows how values scale at each canvas:
 *   Desktop (≥1440)     — base unit 4px
 *   Small desktop (≤991) — base unit 3.5px
 *   Tablet (≤767)        — base unit 3px
 *   Mobile (≤479)        — base unit 3px
 *
 * Semantic padding tokens use em values which step down via responsive
 * CSS variables. Spacing tokens (--space-*) use a base-unit multiplier.
 */

type Breakpoint = 'desktop' | 'small-desktop' | 'tablet' | 'mobile';

const BREAKPOINTS: readonly { readonly key: Breakpoint; readonly label: string; readonly hint: string }[] = [
  { key: 'desktop',       label: 'Desktop',       hint: '≥1440 · 4px unit' },
  { key: 'small-desktop', label: 'Small desktop',  hint: '≤991 · 3.5px unit' },
  { key: 'tablet',        label: 'Tablet',         hint: '≤767 · 3px unit'  },
  { key: 'mobile',        label: 'Mobile',         hint: '≤479 · 3px unit'  },
];

/** Base unit px per breakpoint — spacing tokens multiply by this. */
const UNIT_PX: Record<Breakpoint, number> = {
  'desktop':       4,
  'small-desktop': 3.5,
  'tablet':        3,
  'mobile':        3,
};

/**
 * Semantic padding token resolved px values at each breakpoint.
 * Derived from the responsive CSS variable overrides in shinoda-tokens.css.
 */
const PADDING_PX: Record<string, Record<Breakpoint, number>> = {
  '--padding-page':       { desktop: 64, 'small-desktop': 32, tablet: 24, mobile: 24  },
  '--padding-columns':    { desktop: 64, 'small-desktop': 32, tablet: 24, mobile: 24  },
  '--padding-section-sm': { desktop: 64, 'small-desktop': 32, tablet: 24, mobile: 24  },
  '--padding-section-md': { desktop: 96, 'small-desktop': 96, tablet: 64, mobile: 64  },
  '--padding-section-lg': { desktop: 128, 'small-desktop': 128, tablet: 128, mobile: 128 },
  '--padding-container':  { desktop: 64, 'small-desktop': 64, tablet: 24, mobile: 24  },
  '--padding-nav':        { desktop: 128, 'small-desktop': 112, tablet: 24, mobile: 24  },
  '--padding-card':       { desktop: 32, 'small-desktop': 32, tablet: 24, mobile: 24  },
};

/** Extract the multiplier from --space-N (e.g. '--space-12' → 12). */
function spaceUnit(name: string): number {
  const match = /--space-(\d+)/.exec(name);
  return match != null && match[1] != null ? parseInt(match[1], 10) : 1;
}

export default function PaddingsPage(): React.ReactElement {
  const [bp, setBp] = useState<Breakpoint>('desktop');
  const unitPx = UNIT_PX[bp];

  // Max spacing bar width at current breakpoint for proportional scaling
  const maxSpacePx = SPACING_TOKENS.reduce((acc, { name }) => {
    return Math.max(acc, spaceUnit(name) * unitPx);
  }, 0);

  return (
    <MainWrapper>
      <div className="page-wide-intro">
        <CatalogueIntro
          title="Paddings"
          description="Semantic padding tokens — page, section, container, nav, card."
        />
      </div>

      {/* ── Breakpoint toggle ───────────────────────────────────────── */}
      <div className="page-wide-section" style={{ paddingBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          {BREAKPOINTS.map(({ key, label, hint }) => (
            <button
              key={key}
              type="button"
              className="btn"
              style={{
                fontSize: '0.875rem',
                opacity: bp === key ? 1 : 'var(--opacity-40)',
              }}
              onClick={() => setBp(key)}
            >
              {label}
              <Text variant="body-2xs" opacity={40} as="span" style={{ marginLeft: 'var(--space-1)' }}>
                {hint}
              </Text>
            </button>
          ))}
        </div>
      </div>

      {/* ── Semantic padding tokens ─────────────────────────────────── */}
      <section className="page-wide-section">
        <Text variant="heading-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-6)' }}>
          Semantic
        </Text>
        {PADDING_TOKENS.map(({ name, value, note }) => {
          const pxWidth = PADDING_PX[name]?.[bp] ?? parseFloat(value) * 16;
          return (
            <div key={name}>
              <Divider />
              <div className="width-bar-row">
                <div
                  className="width-bar"
                  style={{
                    width: pxWidth,
                    height: 'var(--space-6)',
                    backgroundColor: 'var(--color-fill-secondary)',
                    transition: 'width 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
                <div className="width-bar-label">
                  <CopyValue value={name}>
                    <Text variant="body-sm" as="span">{name}</Text>
                  </CopyValue>
                  <Text variant="body-sm" opacity={40} as="span">
                    {pxWidth}px
                    <span style={{ opacity: 0.6 }}> · {value} · {note}</span>
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
        <Divider />
      </section>

      {/* ── Spacing scale ───────────────────────────────────────────── */}
      <section className="page-wide-section">
        <Text variant="heading-md" opacity={40} as="h2" style={{ paddingBottom: 'var(--space-6)' }}>
          Spacing scale · base unit {unitPx}px
        </Text>
        {SPACING_TOKENS.map(({ name }) => {
          const units = spaceUnit(name);
          const pxValue = units * unitPx;
          return (
            <div key={name}>
              <Divider />
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', paddingBlock: 'var(--space-4)' }}>
                <div
                  style={{
                    height: 'var(--space-6)',
                    width: `${(pxValue / maxSpacePx) * 100}%`,
                    maxWidth: `${pxValue}px`,
                    backgroundColor: 'var(--color-fill-secondary)',
                    flexShrink: 0,
                    transition: 'width 250ms cubic-bezier(0.4, 0, 0.2, 1), max-width 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', flex: 1 }}>
                  <CopyValue value={name}>
                    <Text variant="body-sm" as="span">{name}</Text>
                  </CopyValue>
                  <Text variant="body-sm" opacity={40} as="span">{pxValue}px</Text>
                </div>
              </div>
            </div>
          );
        })}
        <Divider />
      </section>
    </MainWrapper>
  );
}

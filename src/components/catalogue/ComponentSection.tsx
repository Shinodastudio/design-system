'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { CollapsibleCode } from '@/components/content/CollapsibleCode';

/**
 * ComponentSection — one named variant row for component catalogue pages.
 *
 * Figma ref: 3907-10352. Anatomy:
 *
 *   Text Button  [ heading-md ▾ ]  [ Default ▾ ]    ← title + chips (independent per section)
 *   20% overlay fill reveals on cursor proximity.    ← description at 40%
 *
 *   ┌─────────────────────────────────────────────┐
 *   │                  Button                     │  ← preview (forced state via data-state)
 *   │  <Button>Label</Button>                     │  ← code snippet at 40% mono
 *   └─────────────────────────────────────────────┘
 *
 * State chip turns orange with a × dismiss button when non-default is selected.
 * Size chip turns orange with a × dismiss button when non-default is selected.
 * Clicking × resets to default. Focus state auto-focuses the first focusable child.
 */

export type SectionState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';

interface RenderContext<S extends string> {
  readonly state: SectionState;
  readonly size: S;
}

interface ComponentSectionProps<S extends string> {
  readonly name: string;
  readonly description: string;
  readonly code: string;
  readonly sizes: readonly [S, ...S[]];
  readonly defaultSize?: S;
  readonly sizeLabel?: (s: S) => string;
  readonly states?: readonly SectionState[];
  readonly defaultState?: SectionState;
  readonly render: (ctx: RenderContext<S>) => React.ReactNode;
  /** Optional extra chips rendered after the built-in size + state chips. */
  readonly extraChips?: React.ReactNode;
}

const DEFAULT_STATES: readonly SectionState[] = ['default', 'hover', 'active', 'focus', 'disabled'];

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function ComponentSection<S extends string>({
  name,
  description,
  code,
  sizes,
  defaultSize,
  sizeLabel,
  states = DEFAULT_STATES,
  defaultState = 'default',
  render,
  extraChips,
}: ComponentSectionProps<S>): React.ReactElement {
  const resolvedDefault = defaultSize ?? sizes[0];
  const [size, setSize] = useState<S>(resolvedDefault);
  const [state, setState] = useState<SectionState>(defaultState);
  const frameRef = useRef<HTMLDivElement>(null);
  const sizeId = useId();
  const stateId = useId();

  const resolvedSizeLabel = sizeLabel ?? ((s: S): string => String(s));
  const isNonDefaultState = state !== 'default';
  const isNonDefaultSize = size !== resolvedDefault;
  // Hide a chip entirely if the component exposes nothing to pick from —
  // a single-option dropdown is noise, not affordance.
  const showSizeChip = sizes.length > 1;
  const showStateChip = states.length > 1;

  // Auto-focus the first focusable child when state is 'focus'.
  useEffect(() => {
    if (state !== 'focus') return;
    const frame = frameRef.current;
    if (frame == null) return;
    const focusable = frame.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();
  }, [state, size]);

  return (
    <div className="component-section">
      {/* ── Header: name + chips ── */}
      <div className="component-section-header">
        <div className="component-section-title">
          <span className="heading-md">{name}</span>
          <div className="component-section-chips">
            {/* Size chip — orange + × when non-default, dropdown when default */}
            {showSizeChip && (isNonDefaultSize ? (
              <button
                type="button"
                className="section-chip section-chip--active"
                onClick={(): void => setSize(resolvedDefault)}
                aria-label={`Reset size to default (currently ${resolvedSizeLabel(size)})`}
              >
                <span className="section-chip-text">{resolvedSizeLabel(size)}</span>
                <span className="section-chip-close" aria-hidden="true" />
              </button>
            ) : (
              <label className="section-chip" htmlFor={sizeId}>
                <select
                  id={sizeId}
                  className="section-chip-select"
                  value={size}
                  onChange={(e): void => setSize(e.target.value as S)}
                >
                  {sizes.map((s) => (
                    <option key={s} value={s}>{resolvedSizeLabel(s)}</option>
                  ))}
                </select>
                <span className="section-chip-chevron" aria-hidden="true" />
              </label>
            ))}

            {/* State chip — orange + × when non-default, dropdown when default */}
            {showStateChip && (isNonDefaultState ? (
              <button
                type="button"
                className="section-chip section-chip--active"
                onClick={(): void => setState('default')}
                aria-label={`Reset state to default (currently ${state})`}
              >
                <span className="section-chip-text">{capitalize(state)}</span>
                <span className="section-chip-close" aria-hidden="true" />
              </button>
            ) : (
              <label className="section-chip" htmlFor={stateId}>
                <select
                  id={stateId}
                  className="section-chip-select"
                  value={state}
                  onChange={(e): void => setState(e.target.value as SectionState)}
                >
                  {states.map((s) => (
                    <option key={s} value={s}>{capitalize(s)}</option>
                  ))}
                </select>
                <span className="section-chip-chevron" aria-hidden="true" />
              </label>
            ))}
            {extraChips}
          </div>
        </div>
        <p className="body-sm op-40">{description}</p>
      </div>

      {/* ── Preview card ── */}
      <div className="component-card" style={{ position: 'relative' }}>
        <div
          ref={frameRef}
          className="component-card-preview"
          data-state={isNonDefaultState ? state : undefined}
          // Re-mount on state+size change so focus effect always fires.
          key={`${state}-${size}`}
        >
          {render({ state, size })}
        </div>
        <CollapsibleCode code={code} language="jsx" />
      </div>
    </div>
  );
}

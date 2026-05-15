'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * ComponentPreviewer — component-page demo frame with two chip dropdowns.
 *
 * Replaces the legacy pattern of one <ComponentFrame> per state. Renders a
 * single live preview that the user toggles through states and sizes via two
 * native <select> elements styled as Shinoda chips.
 *
 * Anatomy (right column of a component page):
 *   ┌───────────────────────────────┐
 *   │ [ State ▾ ]  [ Size ▾ ]       │  ← chips
 *   │                               │
 *   │     ┌─────────────────┐       │
 *   │     │  live preview   │       │  ← frame
 *   │     └─────────────────┘       │
 *   └───────────────────────────────┘
 *
 * State forcing:
 *   - `default`  → no special handling
 *   - `hover`    → `data-state="hover"` on wrapper. CSS in shinoda-base.css
 *                  mirrors the real :hover treatment for .btn / .link / .input
 *   - `active`   → `data-state="active"` (same pattern)
 *   - `focus`    → wrapper auto-focuses the first focusable child on mount
 *   - `disabled` → render fn receives state and applies the `disabled` prop
 *
 * Sizes are passed through to the render fn — the consumer decides how to
 * apply them (Button uses `size` prop; Input applies a className; etc.).
 */

export type PreviewState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';

interface RenderContext<S extends string> {
  readonly state: PreviewState;
  readonly size: S;
}

interface ComponentPreviewerProps<S extends string> {
  readonly states?: readonly PreviewState[];
  /** Non-empty tuple — first element is used as the default if `defaultSize` is omitted. */
  readonly sizes: readonly [S, ...S[]];
  readonly defaultState?: PreviewState;
  readonly defaultSize?: S;
  readonly sizeLabel?: (size: S) => string;
  readonly stateLabel?: (state: PreviewState) => string;
  readonly render: (ctx: RenderContext<S>) => React.ReactNode;
  readonly className?: string;
}

const DEFAULT_STATES: readonly PreviewState[] = ['default', 'hover', 'active', 'focus', 'disabled'];

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ComponentPreviewer<S extends string>({
  states = DEFAULT_STATES,
  sizes,
  defaultState = 'default',
  defaultSize,
  sizeLabel,
  stateLabel,
  render,
  className,
}: ComponentPreviewerProps<S>): React.ReactElement {
  const [state, setState] = useState<PreviewState>(defaultState);
  const [size, setSize] = useState<S>(defaultSize ?? sizes[0]);

  const frameRef = useRef<HTMLDivElement>(null);
  const stateId = useId();
  const sizeId = useId();

  // Focus state — auto-focus the first focusable child on mount or change.
  useEffect(() => {
    if (state !== 'focus') return;
    const frame = frameRef.current;
    if (frame == null) return;
    const focusable = frame.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();
  }, [state, size]);

  const renderedSizeLabel = sizeLabel ?? ((s: S): string => String(s));
  const renderedStateLabel = stateLabel ?? ((s: PreviewState): string => titleCase(s));

  return (
    <div className={cn('preview', className)}>
      <div className="preview-chips">
        <label className="preview-chip" htmlFor={stateId}>
          <span className="preview-chip-label">State</span>
          <select
            id={stateId}
            className="preview-chip-select"
            value={state}
            onChange={(e): void => setState(e.target.value as PreviewState)}
          >
            {states.map((s) => (
              <option key={s} value={s}>{renderedStateLabel(s)}</option>
            ))}
          </select>
          <span className="preview-chip-chevron" aria-hidden="true" />
        </label>
        <label className="preview-chip" htmlFor={sizeId}>
          <span className="preview-chip-label">Size</span>
          <select
            id={sizeId}
            className="preview-chip-select"
            value={size}
            onChange={(e): void => setSize(e.target.value as S)}
          >
            {sizes.map((s) => (
              <option key={s} value={s}>{renderedSizeLabel(s)}</option>
            ))}
          </select>
          <span className="preview-chip-chevron" aria-hidden="true" />
        </label>
      </div>
      <div
        ref={frameRef}
        className="preview-frame"
        data-state={state === 'default' ? undefined : state}
        // The key forces a remount when the user picks `focus` — guarantees
        // the auto-focus effect runs even when state was already `focus` and
        // the size changed underneath.
        key={`${state}-${size}`}
      >
        {render({ state, size })}
      </div>
    </div>
  );
}

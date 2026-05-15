'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * ComponentPreviewer — component-page demo frame with two chip dropdowns.
 *
 * Renders a single live preview that the user toggles through states and sizes
 * via two chip selectors. A chip turns orange when its value has been changed
 * from the default, and shows a × dismiss to reset it.
 *
 * Anatomy (right column of a component page):
 *   ┌───────────────────────────────┐
 *   │ [ State ▾ ]  [ Size ▾ ]       │  ← chips (orange + × when non-default)
 *   │                               │
 *   │     ┌─────────────────┐       │
 *   │     │  live preview   │       │  ← frame
 *   │     └─────────────────┘       │
 *   └───────────────────────────────┘
 *
 * State forcing:
 *   - `default`  → no special handling
 *   - `hover`    → `data-state="hover"` on wrapper (CSS mirrors real :hover)
 *   - `active`   → `data-state="active"` (same pattern)
 *   - `focus`    → wrapper auto-focuses the first focusable child on mount
 *   - `disabled` → render fn receives state and applies the `disabled` prop
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

interface ChipProps<T extends string> {
  readonly id: string;
  readonly value: T;
  readonly defaultValue: T;
  readonly options: readonly T[];
  readonly label: (v: T) => string;
  readonly onChange: (v: T) => void;
  readonly onReset: () => void;
}

function Chip<T extends string>({
  id,
  value,
  defaultValue,
  options,
  label,
  onChange,
  onReset,
}: ChipProps<T>): React.ReactElement {
  const isNonDefault = value !== defaultValue;

  return (
    <div className={cn('preview-chip', isNonDefault && 'preview-chip--active')}>
      {/* label wraps only the select so the dismiss button sits outside the label click area */}
      <label htmlFor={id} className="preview-chip-inner">
        <select
          id={id}
          className="preview-chip-select"
          value={value}
          onChange={(e): void => onChange(e.target.value as T)}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{label(opt)}</option>
          ))}
        </select>
      </label>
      {isNonDefault ? (
        <button
          className="preview-chip-dismiss"
          onClick={onReset}
          aria-label="Reset to default"
          type="button"
        >
          ×
        </button>
      ) : (
        <span className="preview-chip-chevron" aria-hidden="true" />
      )}
    </div>
  );
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
  const resolvedDefaultSize = defaultSize ?? sizes[0];
  const [state, setState] = useState<PreviewState>(defaultState);
  const [size, setSize] = useState<S>(resolvedDefaultSize);

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
        <Chip
          id={stateId}
          value={state}
          defaultValue={defaultState}
          options={states as readonly PreviewState[]}
          label={renderedStateLabel}
          onChange={(v): void => setState(v)}
          onReset={(): void => setState(defaultState)}
        />
        <Chip
          id={sizeId}
          value={size}
          defaultValue={resolvedDefaultSize}
          options={sizes as readonly S[]}
          label={renderedSizeLabel}
          onChange={(v): void => setSize(v)}
          onReset={(): void => setSize(resolvedDefaultSize)}
        />
      </div>
      <div
        ref={frameRef}
        className="preview-frame"
        data-state={state === 'default' ? undefined : state}
        key={`${state}-${size}`}
      >
        {render({ state, size })}
      </div>
    </div>
  );
}

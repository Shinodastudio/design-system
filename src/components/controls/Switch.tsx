'use client';

import { useId, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';
import { type ButtonSize } from '@/components/primitives/Button.constants';

interface SwitchProps {
  readonly checked?: boolean;
  readonly defaultChecked?: boolean;
  readonly onCheckedChange?: (value: boolean) => void;
  readonly disabled?: boolean;
  readonly label?: string;
  /** Size variant — mirrors the button/type scale. Default: heading-xs (1rem). */
  readonly size?: ButtonSize;
  readonly className?: string;
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label,
  size = 'heading-xs',
  className,
}: SwitchProps): React.ReactElement {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = controlledChecked ?? internalChecked;
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLButtonElement>(null);
  useGravity(ref);
  useGravity(rootRef as React.RefObject<HTMLElement | null>);

  const handleToggle = () => {
    if (disabled) return;
    const next = !checked;
    if (controlledChecked == null) setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <div ref={rootRef} className={cn('switch-root', `switch-root-size-${size}`, className)}>
      <button
        ref={ref}
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        className={cn('switch', checked && 'switch-on', disabled && 'switch-disabled')}
        onClick={handleToggle}
      >
        <span className="switch-thumb" />
      </button>
      {label != null && (
        <label htmlFor={id} className="switch-label" data-cursor="text">
          {label}
        </label>
      )}
    </div>
  );
}

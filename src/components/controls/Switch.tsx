'use client';

import { useId, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';

interface SwitchProps {
  readonly checked?: boolean;
  readonly defaultChecked?: boolean;
  readonly onCheckedChange?: (value: boolean) => void;
  readonly disabled?: boolean;
  readonly label?: string;
  readonly className?: string;
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label,
  className,
}: SwitchProps): React.ReactElement {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = controlledChecked ?? internalChecked;
  const id = useId();
  const ref = useRef<HTMLButtonElement>(null);
  useGravity(ref);

  const handleToggle = () => {
    if (disabled) return;
    const next = !checked;
    if (controlledChecked == null) setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <div className={cn('switch-root', className)}>
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
        <label htmlFor={id} className="switch-label">
          {label}
        </label>
      )}
    </div>
  );
}

'use client';

import { createContext, useContext, useId } from 'react';
import { cn } from '@/lib/cn';
import { Tooltip } from '@/components/overlay/Tooltip';

/**
 * ButtonGroup — pill of icon+label items where the label expands fluidly
 * on the selected item and collapses on the others. Single-select.
 *
 * Anatomy:
 *   ┌──────────────────────────────────────────────┐
 *   │ [icon]  [icon]  [icon — selected · label]    │
 *   └──────────────────────────────────────────────┘
 *
 * Each item is a button. The label sits inside a `grid-template-columns:
 * 0fr → 1fr` wrapper, so the column width animates as a single GPU-friendly
 * easeInOutQuint transition (280ms) rather than width on the label itself.
 * Inactive items show their label in a Tooltip on hover.
 *
 * Lineage: Scrapbook TabSwitcher (l0at-izar worktree, .ts-* rules in
 * src/styles/stickerizer.css). Generalised here from "tabs" to "single-select
 * button group" since the pattern isn't tab-specific.
 */
interface ButtonGroupContextValue {
  readonly value: string;
  readonly onValueChange: (next: string) => void;
  readonly name: string;
}

const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

function useButtonGroupContext(): ButtonGroupContextValue {
  const ctx = useContext(ButtonGroupContext);
  if (ctx == null) throw new Error('<ButtonGroup.Item> must be inside <ButtonGroup>');
  return ctx;
}

interface ButtonGroupProps {
  readonly value: string;
  readonly onValueChange: (next: string) => void;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly ariaLabel?: string;
}

export function ButtonGroup({
  value,
  onValueChange,
  children,
  className,
  ariaLabel,
}: ButtonGroupProps): React.ReactElement {
  const name = useId();
  return (
    <ButtonGroupContext.Provider value={{ value, onValueChange, name }}>
      <div className={cn('button-group', className)} role="radiogroup" aria-label={ariaLabel}>
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
}

interface ButtonGroupItemProps {
  readonly value: string;
  readonly icon: React.ReactNode;
  readonly children: React.ReactNode;
  readonly className?: string;
}

function ButtonGroupItem({
  value: itemValue,
  icon,
  children,
  className,
}: ButtonGroupItemProps): React.ReactElement {
  const { value, onValueChange } = useButtonGroupContext();
  const isActive = value === itemValue;
  const labelText = typeof children === 'string' ? children : undefined;

  const button = (
    <button
      type="button"
      role="radio"
      aria-checked={isActive}
      className={cn('button-group-item', isActive && 'is-active', className)}
      onClick={(): void => onValueChange(itemValue)}
    >
      <span className="button-group-item-icon" aria-hidden="true">{icon}</span>
      <span className="button-group-item-label-wrap">
        <span className="button-group-item-label">{children}</span>
      </span>
    </button>
  );

  // Tooltip the inactive items so the label is still discoverable when the
  // pill is collapsed. The active item's label is already on screen.
  if (!isActive && labelText != null) {
    return <Tooltip content={labelText} side="top">{button}</Tooltip>;
  }
  return button;
}

ButtonGroup.Item = ButtonGroupItem;

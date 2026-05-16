'use client';

import { cn } from '@/lib/cn';

export interface FloatingAction {
  readonly label: string;
  readonly icon?: React.ReactNode;
  readonly onClick: () => void;
  readonly variant?: 'default' | 'destructive';
}

interface FloatingActionBarProps {
  readonly selected: number;
  readonly actions: readonly FloatingAction[];
  readonly onClearSelection?: () => void;
  readonly className?: string;
}

export function FloatingActionBar({
  selected,
  actions,
  onClearSelection,
  className,
}: FloatingActionBarProps): React.ReactElement | null {
  if (selected <= 0) return null;

  return (
    <div className={cn('fab', className)} role="toolbar" aria-label="Bulk actions">
      <div className="fab-inner">
        <div className="fab-count">
          <span>{selected} selected</span>
          {onClearSelection != null && (
            <button
              type="button"
              className="fab-clear btn"
              aria-label="Clear selection"
              onClick={onClearSelection}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
        <div className="fab-actions">
          {actions.map((action, idx) => (
            <button
              key={idx}
              type="button"
              className={cn(
                'fab-action btn',
                action.variant === 'destructive' && 'fab-action-destructive',
              )}
              onClick={action.onClick}
            >
              {action.icon != null && <span className="fab-action-icon" aria-hidden="true">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

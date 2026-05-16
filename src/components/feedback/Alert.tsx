'use client';

import { cn } from '@/lib/cn';

export type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface AlertProps {
  readonly variant?: AlertVariant;
  readonly title?: string;
  readonly children?: React.ReactNode;
  readonly onDismiss?: () => void;
  readonly className?: string;
}

export function Alert({
  variant = 'default',
  title,
  children,
  onDismiss,
  className,
}: AlertProps): React.ReactElement {
  return (
    <div
      role="alert"
      className={cn('alert', `alert-${variant}`, className)}
    >
      <div className="alert-body">
        {title != null && <p className="alert-title">{title}</p>}
        {children != null && <div className="alert-content">{children}</div>}
      </div>
      {onDismiss != null && (
        <button
          type="button"
          className="alert-dismiss btn"
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

'use client';

import { cn } from '@/lib/cn';

interface ContentCardProps {
  readonly title: string;
  readonly description?: string;
  readonly children?: React.ReactNode;
  readonly actions?: React.ReactNode;
  readonly metadata?: string;
  readonly onClick?: () => void;
  readonly className?: string;
}

export function ContentCard({
  title,
  description,
  children,
  actions,
  metadata,
  onClick,
  className,
}: ContentCardProps): React.ReactElement {
  const isInteractive = onClick != null;

  return (
    <div
      className={cn('content-card', isInteractive && 'content-card-interactive', className)}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={isInteractive
        ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }
        : undefined
      }
    >
      <div className="content-card-body">
        <p className="content-card-title">{title}</p>
        {description != null && (
          <p className="content-card-description">{description}</p>
        )}
        {children != null && (
          <div className="content-card-content">{children}</div>
        )}
      </div>
      {(actions != null || metadata != null) && (
        <div className="content-card-actions">
          {metadata != null && (
            <span className="content-card-metadata">{metadata}</span>
          )}
          {actions}
        </div>
      )}
    </div>
  );
}

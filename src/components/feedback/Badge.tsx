'use client';

import { useRef } from 'react';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';

export type BadgeVariant = 'neutral' | 'red' | 'orange' | 'yellow' | 'green' | 'blue';

interface BadgeProps {
  readonly variant?: BadgeVariant;
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly onClick?: () => void;
}

export function Badge({
  variant = 'neutral',
  className,
  children,
  onClick,
}: BadgeProps): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  useGravity(ref);

  const Tag = onClick != null ? 'button' : 'span';

  return (
    <Tag
      ref={ref as React.RefObject<HTMLButtonElement & HTMLSpanElement>}
      type={onClick != null ? 'button' : undefined}
      className={cn('badge', `badge-${variant}`, className)}
      data-cursor="btn"
      onClick={onClick}
    >
      {children}
    </Tag>
  );
}

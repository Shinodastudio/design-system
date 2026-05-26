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
  /**
   * Disables hover/focus affordances and drops the chip to 40% opacity.
   * On interactive (button) badges, also disables the native control;
   * on static (span) badges, sets `aria-disabled` so screen readers know.
   */
  readonly disabled?: boolean;
}

export function Badge({
  variant = 'neutral',
  className,
  children,
  onClick,
  disabled = false,
}: BadgeProps): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  useGravity(ref);

  const isButton = onClick != null;
  const Tag = isButton ? 'button' : 'span';

  return (
    <Tag
      ref={ref as React.RefObject<HTMLButtonElement & HTMLSpanElement>}
      type={isButton ? 'button' : undefined}
      className={cn('badge', `badge-${variant}`, className)}
      data-cursor={isButton && !disabled ? 'btn' : undefined}
      onClick={disabled ? undefined : onClick}
      disabled={isButton ? disabled : undefined}
      aria-disabled={!isButton && disabled ? true : undefined}
    >
      {children}
    </Tag>
  );
}

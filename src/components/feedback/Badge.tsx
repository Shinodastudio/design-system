import { cn } from '@/lib/cn';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  readonly variant?: BadgeVariant;
  readonly size?: BadgeSize;
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'md',
  className,
  children,
}: BadgeProps): React.ReactElement {
  return (
    <span
      className={cn('badge', `badge-${variant}`, `badge-${size}`, className)}
    >
      {children}
    </span>
  );
}

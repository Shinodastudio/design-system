import { cn } from '@/lib/cn';

interface GridProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function Grid({ children, className }: GridProps): React.ReactElement {
  return (
    <div className={cn('grid-2col', className)}>
      {children}
    </div>
  );
}

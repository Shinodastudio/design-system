import { cn } from '@/lib/cn';

interface StickyColProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

export function StickyCol({ children, className, style }: StickyColProps): React.ReactElement {
  return (
    <div className={cn('col-sticky padding-global', className)} style={style}>
      {children}
    </div>
  );
}

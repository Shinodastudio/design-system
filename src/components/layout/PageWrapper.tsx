import { cn } from '@/lib/cn';

interface PageWrapperProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps): React.ReactElement {
  return (
    <div className={cn('page-wrapper', className)}>
      {children}
    </div>
  );
}

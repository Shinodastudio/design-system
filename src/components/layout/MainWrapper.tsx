import { cn } from '@/lib/cn';

interface MainWrapperProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly as?: 'main' | 'div' | 'section';
}

export function MainWrapper({ children, className, as: Tag = 'main' }: MainWrapperProps): React.ReactElement {
  return (
    <Tag className={cn('main-wrapper', className)}>
      {children}
    </Tag>
  );
}

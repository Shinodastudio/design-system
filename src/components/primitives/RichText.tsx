import { cn } from '@/lib/cn';

interface RichTextProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function RichText({ children, className }: RichTextProps): React.ReactElement {
  return <div className={cn('rich-text', className)}>{children}</div>;
}

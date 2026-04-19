import { cn } from '@/lib/cn';

interface DividerProps {
  readonly className?: string;
}

export function Divider({ className }: DividerProps): React.ReactElement {
  return <hr className={cn('divider', className)} />;
}

import { cn } from '@/lib/cn';

interface StickyColProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

export function StickyCol({ children, className, style }: StickyColProps): React.ReactElement {
  // NOTE: MainWrapper already applies `padding-inline: var(--padding-page)` to
  // its outer container. Adding `padding-global` here would double-pad the
  // first column. Keep this element padding-less; the Grid is the only place
  // horizontal page padding is applied for column content.
  return (
    <div className={cn('col-sticky', className)} style={style}>
      {children}
    </div>
  );
}

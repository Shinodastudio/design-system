import { cn } from '@/lib/cn';

interface StickyColProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  /**
   * Caps the column to 280px on desktop (≥992px).
   * Reverts to full-width at tablet and below — the grid collapses anyway.
   * Use when 480px is too wide for the left column content (short label lists,
   * compact nav, etc.).
   */
  readonly narrow?: boolean;
}

export function StickyCol({ children, className, narrow = false, style }: StickyColProps): React.ReactElement {
  // NOTE: MainWrapper already applies `padding-inline: var(--padding-page)` to
  // its outer container. Adding `padding-global` here would double-pad the
  // first column. Keep this element padding-less; the Grid is the only place
  // horizontal page padding is applied for column content.
  return (
    <div
      className={cn('col-sticky', narrow && 'col-sticky--280', className)}
      style={style}
    >
      {children}
    </div>
  );
}

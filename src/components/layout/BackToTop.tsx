'use client';

import { useRef } from 'react';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';

interface BackToTopProps {
  readonly label?: string;
  readonly className?: string;
}

/**
 * BackToTop — scrolls the page to the top on click.
 *
 * Uses `scrollTo` with no `behavior` option (instant — smooth scroll is
 * refused by the DS spec). Place in a footer, page end, or sidebar;
 * positioning is the parent's responsibility.
 *
 * Pairs with an icon or plain text label:
 *   <BackToTop />                       → "Back to top"
 *   <BackToTop label="↑" />             → single arrow
 *   <BackToTop><Icon name="arrow-up" /></BackToTop> — not yet (children not
 *   exposed; add if needed).
 */
export function BackToTop({
  label = 'Back to top',
  className,
}: BackToTopProps): React.ReactElement {
  const ref = useRef<HTMLButtonElement>(null);
  useGravity(ref);

  function handleClick(): void {
    window.scrollTo({ top: 0 });
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn('btn backtotop', className)}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

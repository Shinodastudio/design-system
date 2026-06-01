'use client';

import { useRef } from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';

/**
 * PlainLink — inline body-copy link variant.
 *
 * Simpler than ShinodaLink. Use when a link sits inside running body text
 * and the background-fill hover of `.link` is too heavy. The only visual
 * affordance is a `border-bottom` underline at 20% opacity at rest,
 * transitioning to full opacity on hover. No fill, no flex container —
 * renders as `display: inline` so it flows with surrounding text naturally.
 */

interface PlainLinkProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly external?: boolean;
  readonly disabled?: boolean;
}

export function PlainLink({
  href,
  children,
  className,
  external = false,
  disabled = false,
}: PlainLinkProps): React.ReactElement {
  const ref = useRef<HTMLAnchorElement>(null);
  useGravity(ref);

  const classes = cn('plainlink', disabled && 'is-disabled', className);

  if (external) {
    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled || undefined}
      >
        {children}
      </a>
    );
  }

  if (disabled) {
    return (
      <a ref={ref} className={classes} aria-disabled="true">
        {children}
      </a>
    );
  }

  return (
    <NextLink ref={ref} href={href} className={classes}>
      {children}
    </NextLink>
  );
}

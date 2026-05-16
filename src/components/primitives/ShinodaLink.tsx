'use client';

import { useRef } from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';
import { BUTTON_SIZES, type ButtonSize } from './Button.constants';

/**
 * Link sizes mirror the Button size scale 1:1 — see Button.constants for the
 * full enum. Visual styling is delegated to .btn-size-* classes so links and
 * buttons stay in lockstep with the type scale.
 */
export const LINK_SIZES = BUTTON_SIZES;
export type LinkSize = ButtonSize;

interface ShinodaLinkProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly external?: boolean;
  readonly size?: LinkSize;
  readonly disabled?: boolean;
}

export function ShinodaLink({
  href,
  children,
  className,
  external = false,
  size,
  disabled = false,
}: ShinodaLinkProps): React.ReactElement {
  const ref = useRef<HTMLAnchorElement>(null);
  useGravity(ref);

  const classes = cn(
    'link',
    size != null ? `btn-size-${size}` : undefined,
    disabled && 'is-disabled',
    className,
  );

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

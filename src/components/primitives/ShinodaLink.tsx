'use client';

import { useRef } from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';

interface ShinodaLinkProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly external?: boolean;
}

export function ShinodaLink({ href, children, className, external = false }: ShinodaLinkProps): React.ReactElement {
  const ref = useRef<HTMLAnchorElement>(null);
  useGravity(ref);

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        className={cn('link', className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink ref={ref} href={href} className={cn('link', className)}>
      {children}
    </NextLink>
  );
}

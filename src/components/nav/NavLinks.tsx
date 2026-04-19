'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { Button } from '@/components/primitives/Button';
import { cn } from '@/lib/cn';

interface NavItem {
  readonly label: string;
  readonly href: string;
}

interface NavLinksProps {
  readonly items: readonly NavItem[];
}

export function NavLinks({ items }: NavLinksProps): React.ReactElement {
  const pathname = usePathname();
  return (
    <ul className="nav-links">
      {items.map((item) => (
        <li key={item.href}>
          <Button
            asChild
            className={cn(
              'nav-link',
              'heading-xs',
              pathname === item.href ? 'is-active' : undefined,
            )}
          >
            <NextLink href={item.href}>{item.label}</NextLink>
          </Button>
        </li>
      ))}
    </ul>
  );
}

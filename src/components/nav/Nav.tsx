import NextLink from 'next/link';
import { NavLinks } from './NavLinks';
import { ThemeToggle } from './ThemeToggle';
import { NavProgressiveBlur } from './NavProgressiveBlur';

const NAV_ITEMS = [
  { label: 'Colour',     href: '/colour' },
  { label: 'Type',       href: '/type' },
  { label: 'Components', href: '/components' },
  { label: 'Structure',  href: '/structure' },
] as const;

export function Nav(): React.ReactElement {
  return (
    <header className="nav">
      <div className="nav-inner">
        <NextLink href="/" className="nav-logo">
          Shinoda DS
        </NextLink>
        <NavLinks items={NAV_ITEMS} />
        <ThemeToggle />
      </div>
      <NavProgressiveBlur />
    </header>
  );
}

import NextLink from 'next/link';
import { NavLinks } from './NavLinks';
import { ThemeToggle } from './ThemeToggle';
import { NavProgressiveBlur } from './NavProgressiveBlur';
import { NAV_ITEMS } from './navItems';

/**
 * Top navigation bar.
 *
 * Visibility contract (May 2026 spec):
 * - ≥768px: full horizontal nav, theme toggle flush right.
 * - ≤768px: nav is hidden entirely. Items are rendered as a vertical list
 *   in the <Footer> instead. The CSS rule lives in shinoda-base.css under
 *   `.nav` and its responsive overrides — kept declarative, not JS-gated.
 */
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

import NextLink from 'next/link';
import { Button } from '@/components/primitives/Button';
import { ThemeToggle } from './ThemeToggle';
import { SearchButton } from './SearchButton';
import { NavProgressiveBlur } from './NavProgressiveBlur';

/**
 * Top navigation bar.
 *
 * Layout:
 * - Top-left:  single "Shinoda Design System" brand link → /
 * - Top-right: SearchButton (opens Command palette) + ThemeToggle
 *
 * All section navigation now happens through the Command palette
 * (opened by the search icon or Cmd/Ctrl+K).
 */
export function Nav(): React.ReactElement {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Button asChild size="heading-2xs" className="nav-brand">
          <NextLink href="/">Shinoda Design System</NextLink>
        </Button>
        <nav aria-label="Primary" className="nav-actions">
          <SearchButton />
          <ThemeToggle />
        </nav>
      </div>
      <NavProgressiveBlur />
    </header>
  );
}

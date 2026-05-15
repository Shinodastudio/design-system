import NextLink from 'next/link';
import { NavLinks } from './NavLinks';
import { ThemeToggle } from './ThemeToggle';
import { NavProgressiveBlur } from './NavProgressiveBlur';

const NAV_ITEMS = [
  { label: 'Colour',     href: '/colour'     },
  { label: 'Type',       href: '/type'       },
  { label: 'Components', href: '/components' },
  { label: 'Structure',  href: '/structure'  },
  { label: 'Widths',     href: '/widths'     },
  { label: 'Paddings',   href: '/paddings'   },
  { label: 'Margins',    href: '/margins'    },
  { label: 'Grids',      href: '/grids'      },
  { label: 'Utility',    href: '/utility'    },
] as const;

export function Nav(): React.ReactElement {
  return (
    <header className="nav">
      <div className="nav-inner">
        <NextLink href="/" className="nav-logo">
          Shinoda DS
        </NextLink>
        {/* Disclosure wrapper — desktop renders inline, ≤767 collapses behind a trigger.
            <details> is purely native: works without JS, server-renderable, accessible. */}
        <details className="nav-menu">
          <summary className="nav-menu-trigger" aria-label="Toggle navigation">
            <span>Menu</span>
          </summary>
          <NavLinks items={NAV_ITEMS} />
        </details>
        <ThemeToggle />
      </div>
      <NavProgressiveBlur />
    </header>
  );
}

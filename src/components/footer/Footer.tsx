import NextLink from 'next/link';
import { ThemeToggle } from '@/components/nav/ThemeToggle';
import { ScrollToTop } from './ScrollToTop';

const FOOTER_LINKS = [
  { label: 'Colour',     href: '/colour'     },
  { label: 'Components', href: '/components' },
  { label: 'Type',       href: '/type'       },
  { label: 'Structure',  href: '/structure'  },
] as const;

export function Footer(): React.ReactElement {
  return (
    <footer className="footer">
      <hr className="divider" />
      <div className="footer-inner">
        <div className="footer-top">
          <span className="heading-md footer-wordmark">Shinoda DS</span>
          <div className="footer-controls">
            <ThemeToggle />
            <ScrollToTop />
          </div>
        </div>
        <nav className="footer-grid" aria-label="Site navigation">
          {FOOTER_LINKS.map((link) => (
            <NextLink key={link.href} href={link.href} className="footer-link heading-md">
              {link.label}
            </NextLink>
          ))}
        </nav>
      </div>
    </footer>
  );
}

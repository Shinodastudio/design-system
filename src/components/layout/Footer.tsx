import NextLink from 'next/link';
import { NAV_ITEMS } from '@/components/nav/navItems';

/**
 * Footer — only shown ≤768px (CSS-controlled). Renders the same NAV_ITEMS
 * as the top nav, but as a vertical list. This mirrors the Webflow design
 * pattern where the nav collapses entirely into the footer at small viewports.
 *
 * Above 768px the footer is hidden (display: none in shinoda-base.css).
 */
export function Footer(): React.ReactElement {
  return (
    <footer className="footer">
      <ul className="footer-nav">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <NextLink href={item.href} className="footer-nav-link body-md op-40">
              {item.label}
            </NextLink>
          </li>
        ))}
      </ul>
    </footer>
  );
}

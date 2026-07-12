'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { NAV_ITEMS, getBreadcrumbSegments } from '@/components/nav/navItems';
import { ThemeToggle } from '@/components/nav/ThemeToggle';
import { PlainLink } from '@/components/primitives/PlainLink';
import { ChangelogDialog } from './ChangelogDialog';

const STUDIO_URL = 'https://shinoda.studio';

/**
 * Site footer — one <footer> landmark, two responsive layouts (Figma 3932:13432):
 *
 *   .footer-bar  Persistent bar, ≥768px only. Current page name on the left;
 *                "Made by Shinoda · {year} · Changelog" + theme toggle on the
 *                right. Changelog opens a modal (<ChangelogDialog>).
 *
 *   .footer-nav  Mobile-only (≤767px) vertical list of NAV_ITEMS — the sole
 *                navigation surface at that breakpoint, since <Nav> hides
 *                entirely there (all other nav happens through the Command
 *                palette).
 */
export function Footer(): React.ReactElement {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumbSegments(pathname ?? '/');
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-bar">
        <div className="footer-bar-page body-xs">
          {breadcrumb.map((segment, index) => (
            <Fragment key={segment}>
              {index > 0 && <span className="footer-bar-slash" aria-hidden="true">/</span>}
              <span>{segment}</span>
            </Fragment>
          ))}
        </div>

        <div className="footer-bar-right">
          <div className="footer-bar-meta body-xs">
            <span className="op-80">
              Made by <PlainLink href={STUDIO_URL} external>Shinoda</PlainLink>
            </span>
            <span className="footer-bar-dot" aria-hidden="true" />
            <span className="footer-bar-meta-dim">{year}</span>
            <span className="footer-bar-dot" aria-hidden="true" />
            <ChangelogDialog>
              <button type="button" className="footer-bar-changelog footer-bar-meta-dim">
                Changelog
              </button>
            </ChangelogDialog>
          </div>
          <ThemeToggle />
        </div>
      </div>

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

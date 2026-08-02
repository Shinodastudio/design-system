'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { getBreadcrumbSegments } from '@/components/nav/navItems';
import { ThemeToggle } from '@/components/nav/ThemeToggle';
import { PlainLink } from '@/components/primitives/PlainLink';
import { Divider } from '@/components/primitives/Divider';
import { ChangelogDialog } from './ChangelogDialog';

const STUDIO_URL = 'https://shinoda.studio';

/**
 * Site footer — one layout at every width (Figma 3932:13432).
 *
 * A full-width <Divider> opens the block, with --padding-section-sm above and
 * below the row beneath it, holding the footer clear of page content the way
 * shinoda.studio does. All type is heading-md at 40% opacity, lifting to 100%
 * on hover.
 *
 * Clickable breadcrumb trail on the left, always opening with "Design System"
 * → "/"; "Made by Shinoda · {year} · Changelog" + theme toggle on the right.
 * Changelog opens a modal (<ChangelogDialog>). Below 768px the two halves
 * stack and the breadcrumb wraps, but nothing is added or removed — <Nav>'s
 * search icon is present at every width, so the Command palette is the sole
 * navigation surface on both sides of the breakpoint.
 */
export function Footer(): React.ReactElement {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumbSegments(pathname ?? '/');
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Divider />

      <div className="footer-bar">
        <nav className="footer-bar-page heading-md" aria-label="Breadcrumb">
          {breadcrumb.map((segment, index) => (
            <Fragment key={segment.href}>
              {index > 0 && <span className="footer-bar-crumb-slash" aria-hidden="true">/</span>}
              <NextLink
                href={segment.href}
                className="footer-bar-crumb"
                aria-current={index === breadcrumb.length - 1 ? 'page' : undefined}
              >
                {segment.label}
              </NextLink>
            </Fragment>
          ))}
        </nav>

        <div className="footer-bar-right">
          <div className="footer-bar-meta heading-md">
            <span className="footer-bar-made">
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
          <span className="footer-bar-toggle">
            <ThemeToggle />
          </span>
        </div>
      </div>
    </footer>
  );
}

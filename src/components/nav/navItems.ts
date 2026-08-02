/**
 * Single source of truth for primary navigation items.
 * Consumed by the CommandPalette (top-level sections) and Footer (mobile
 * vertical list, ≤767, and the desktop footer bar's page-name lookup).
 */
export const NAV_ITEMS = [
  // Home leads the list because the nav wordmark that used to link to "/" has
  // been removed — the palette and the mobile footer list are now the only
  // routes back to the homepage.
  { label: 'Home',       href: '/'           },
  { label: 'Colour',     href: '/colour'     },
  { label: 'Type',       href: '/type'       },
  { label: 'Icons',      href: '/icons'      },
  { label: 'Components', href: '/components' },
  { label: 'Structure',  href: '/structure'  },
  { label: 'Widths',     href: '/widths'     },
  { label: 'Paddings',   href: '/paddings'   },
  { label: 'Margins',    href: '/margins'    },
  { label: 'Grids',      href: '/grids'      },
  { label: 'Utility',    href: '/utility'    },
  { label: 'Implementation', href: '/implementation' },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

/**
 * Grouped categories for the /components/* sub-routes.
 * Used by the CommandPalette to drill from
 *   level 1 (Components) → level 2 (category) → level 3 (component page).
 *
 * Each `items` entry is a slug that maps to `/components/[slug]`.
 * Labels in level 3 are derived by title-casing the slug.
 */
export const COMPONENT_CATEGORIES = [
  { label: 'Controls', items: ['button', 'controls', 'link', 'tabs']     },
  { label: 'Input',    items: ['input', 'calendar', 'upload']            },
  { label: 'Layout',   items: ['card', 'content', 'divider']             },
  { label: 'Data',     items: ['data', 'map']                            },
  { label: 'Feedback', items: ['feedback', 'overlay']                    },
  { label: 'Display',  items: ['icon', 'cursor', 'sticker', 'media']     },
] as const;

export type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number];

/** Title-case a component slug (e.g. "button" → "Button"). */
export function componentLabel(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

/**
 * Derives the display label for the current route — used by the desktop
 * footer bar's "Page Name" slot. Matches NAV_ITEMS first, falls back to the
 * component catalogue (title-cased slug) for `/components/[slug]`, then
 * title-cases the last path segment for anything else.
 */
export function getPageName(pathname: string): string {
  if (pathname === '/') return 'Home';

  const navMatch = NAV_ITEMS.find((item) => item.href === pathname);
  if (navMatch != null) return navMatch.label;

  if (pathname.startsWith('/components/')) {
    const slug = pathname.split('/')[2] ?? '';
    return componentLabel(slug);
  }

  const lastSegment = pathname.split('/').filter(Boolean).pop() ?? '';
  return componentLabel(lastSegment);
}

export type BreadcrumbSegment = {
  readonly label: string;
  readonly href: string;
};

/** Root crumb — the only route back to the homepage now the nav wordmark is gone. */
const BREADCRUMB_ROOT: BreadcrumbSegment = { label: 'Design System', href: '/' };

/**
 * Breadcrumb trail for the current route — used by the desktop footer bar's
 * left-hand slot (Figma 3932:13432). Every trail opens with "Design System"
 * pointing at "/", then appends the route's own crumbs:
 *   /                    → Design System
 *   /colour              → Design System / Colour
 *   /components/button   → Design System / Components / Button
 * Each segment carries its own href so the whole trail is navigable.
 */
export function getBreadcrumbSegments(pathname: string): readonly BreadcrumbSegment[] {
  if (pathname === '/') return [BREADCRUMB_ROOT];

  const navMatch = NAV_ITEMS.find((item) => item.href === pathname);
  if (navMatch != null) return [BREADCRUMB_ROOT, { label: navMatch.label, href: navMatch.href }];

  if (pathname.startsWith('/components/')) {
    const slug = pathname.split('/')[2] ?? '';
    return [
      BREADCRUMB_ROOT,
      { label: 'Components', href: '/components' },
      { label: componentLabel(slug), href: `/components/${slug}` },
    ];
  }

  const lastSegment = pathname.split('/').filter(Boolean).pop() ?? '';
  return [BREADCRUMB_ROOT, { label: componentLabel(lastSegment), href: pathname }];
}

/**
 * Single source of truth for primary navigation items.
 * Consumed by the CommandPalette (top-level sections) and Footer (vertical list, ≤768).
 */
export const NAV_ITEMS = [
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
  { label: 'Display',  items: ['icon', 'cursor', 'sticker']              },
] as const;

export type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number];

/** Title-case a component slug (e.g. "button" → "Button"). */
export function componentLabel(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

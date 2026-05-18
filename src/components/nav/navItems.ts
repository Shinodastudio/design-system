/**
 * Single source of truth for primary navigation items.
 * Consumed by Nav (top bar, ≥768) and Footer (vertical list, ≤768).
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

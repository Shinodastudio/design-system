'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Command,
  CommandHeader,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  useCommandQuery,
} from '@/components/controls/Command';
import { NAV_ITEMS, COMPONENT_CATEGORIES, componentLabel } from './navItems';
import { SEARCH_INDEX } from './data/searchIndex.generated';

interface CommandPaletteProps {
  readonly onClose: () => void;
}

type Level = 'sections' | 'categories' | 'components';

const COMPONENTS_LABEL = 'Components';
// Cap nested-section matches so a broad query (e.g. a single common letter)
// can't flood the palette with every section in the catalogue.
const MAX_SECTION_RESULTS = 8;

interface DeepSearchResultsProps {
  readonly navigate: (href: string) => void;
}

/**
 * Surfaces component pages nested two levels below the top-level "Navigate"
 * list (Components → category → component) directly against the sections
 * query — so typing "button" at the top level finds the Button component
 * page without drilling into Components first. Only mounts while the user
 * is actively searching; returns null on an empty query (nothing to add to
 * the plain Navigate list) or when nothing matches (avoids a dangling
 * "Components" group heading with no items beneath it).
 */
function DeepSearchResults({ navigate }: DeepSearchResultsProps): React.ReactElement | null {
  const query = useCommandQuery();
  if (query === '') return null;

  const q = query.toLowerCase();
  const matches = COMPONENT_CATEGORIES.flatMap((cat) => cat.items).filter((slug) =>
    componentLabel(slug).toLowerCase().includes(q),
  );
  if (matches.length === 0) return null;

  return (
    <CommandGroup label="Components">
      {matches.map((slug) => (
        <CommandItem
          key={slug}
          value={componentLabel(slug)}
          onSelect={() => navigate(`/components/${slug}`)}
        >
          {componentLabel(slug)}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

/**
 * Surfaces content nested *inside* a component page — every named
 * <ComponentSection> across the catalogue (see scripts/generate-search-index.ts)
 * — directly against the sections query. This is what lets typing e.g.
 * "dialog" at the top level jump straight to the "Dialog — bottom drawer"
 * variant on the Overlay page, not just to the Overlay page itself. Same
 * mount/empty-query rules as DeepSearchResults.
 */
function DeepSectionResults({ navigate }: DeepSearchResultsProps): React.ReactElement | null {
  const query = useCommandQuery();
  if (query === '') return null;

  const q = query.toLowerCase();
  const matches = SEARCH_INDEX
    .filter((entry) => entry.label.toLowerCase().includes(q))
    .slice(0, MAX_SECTION_RESULTS);
  if (matches.length === 0) return null;

  return (
    <CommandGroup label="In pages">
      {matches.map((entry) => (
        <CommandItem
          key={entry.href}
          value={entry.label}
          onSelect={() => navigate(entry.href)}
        >
          {entry.label}
          <span className="op-40"> — {entry.pageLabel}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

/**
 * Navigation-aware Command palette with three drill-down levels:
 *   1. sections    — all NAV_ITEMS (leaf items navigate, "Components" drills in)
 *   2. categories  — COMPONENT_CATEGORIES (drills into level 3)
 *   3. components  — component pages within the active category (navigate)
 *
 * The whole Command is keyed by `${level}:${activeCategory}` so it remounts on
 * every level transition. Remounting clears query, activeIndex, and the itemRefs
 * registry inside Command, and re-triggers the CommandInput autoFocus.
 */
export function CommandPalette({ onClose }: CommandPaletteProps): React.ReactElement {
  const router = useRouter();
  const [level, setLevel] = useState<Level>('sections');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const navigate = (href: string): void => {
    router.push(href);
    onClose();
  };

  const goBack = (): void => {
    if (level === 'components') {
      setLevel('categories');
      setActiveCategory(null);
    } else if (level === 'categories') {
      setLevel('sections');
    }
  };

  const placeholder =
    level === 'sections'   ? 'Search the design system…'
    : level === 'categories' ? 'Search component groups…'
    : `Search ${activeCategory?.toLowerCase() ?? ''} components…`;

  // Header only appears once the palette has drilled 1+ levels deep; its
  // label names the level currently being browsed (matches Figma 4030:948).
  const headerLabel = level === 'categories' ? COMPONENTS_LABEL : activeCategory;

  return (
    <Command
      key={`${level}:${activeCategory ?? ''}`}
      className="command-palette"
      onClose={onClose}
    >
      {level !== 'sections' && headerLabel != null && (
        <CommandHeader label={headerLabel} onBack={goBack} />
      )}
      <CommandInput
        placeholder={placeholder}
        autoFocus
        onBackspaceEmpty={level !== 'sections' ? goBack : undefined}
      />
      <CommandList>
        {level === 'sections' && (
          <>
            <CommandGroup>
              {NAV_ITEMS.map((item) => (
                <CommandItem
                  key={item.href}
                  hasSubmenu={item.label === COMPONENTS_LABEL}
                  onSelect={() => {
                    if (item.label === COMPONENTS_LABEL) {
                      setLevel('categories');
                    } else {
                      navigate(item.href);
                    }
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <DeepSearchResults navigate={navigate} />
            <DeepSectionResults navigate={navigate} />
          </>
        )}

        {level === 'categories' && (
          <CommandGroup>
            <CommandItem onSelect={() => navigate('/components')}>
              All components
            </CommandItem>
            {COMPONENT_CATEGORIES.map((cat) => (
              <CommandItem
                key={cat.label}
                hasSubmenu
                onSelect={() => {
                  setActiveCategory(cat.label);
                  setLevel('components');
                }}
              >
                {cat.label}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {level === 'components' && activeCategory != null && (
          <CommandGroup>
            {COMPONENT_CATEGORIES
              .find((c) => c.label === activeCategory)
              ?.items.map((slug) => (
                <CommandItem
                  key={slug}
                  onSelect={() => navigate(`/components/${slug}`)}
                >
                  {componentLabel(slug)}
                </CommandItem>
              ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}

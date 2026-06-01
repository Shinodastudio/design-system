'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from '@/components/controls/Command';
import { NAV_ITEMS, COMPONENT_CATEGORIES, componentLabel } from './navItems';

interface CommandPaletteProps {
  readonly onClose: () => void;
}

type Level = 'sections' | 'categories' | 'components';

const COMPONENTS_LABEL = 'Components';

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

  return (
    <Command
      key={`${level}:${activeCategory ?? ''}`}
      className="command-palette"
      onClose={onClose}
    >
      <CommandInput placeholder={placeholder} autoFocus />
      <CommandList>
        {level === 'sections' && (
          <CommandGroup label="Navigate">
            {NAV_ITEMS.map((item) => (
              <CommandItem
                key={item.href}
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
        )}

        {level === 'categories' && (
          <>
            <CommandGroup>
              <CommandItem onSelect={goBack}>← Back</CommandItem>
            </CommandGroup>
            <CommandGroup label="Components">
              <CommandItem onSelect={() => navigate('/components')}>
                All components
              </CommandItem>
              {COMPONENT_CATEGORIES.map((cat) => (
                <CommandItem
                  key={cat.label}
                  onSelect={() => {
                    setActiveCategory(cat.label);
                    setLevel('components');
                  }}
                >
                  {cat.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {level === 'components' && activeCategory != null && (
          <>
            <CommandGroup>
              <CommandItem onSelect={goBack}>← Back</CommandItem>
            </CommandGroup>
            <CommandGroup label={`Components / ${activeCategory}`}>
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
          </>
        )}
      </CommandList>
    </Command>
  );
}

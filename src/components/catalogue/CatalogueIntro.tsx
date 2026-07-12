'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { Button } from '@/components/primitives/Button';
import { Text } from '@/components/primitives/Text';
import { Icon } from '@/components/icons';

/**
 * Left-column intro block used across catalogue pages (May 2026 spec).
 *
 * Layout (Figma 3907-10330):
 *
 *   [◀ icon btn]  Title          ← heading-md, separate from button
 *                 Description    ← heading-md, 40% opacity
 *
 * The back button is icon-ONLY (left-pointing caret, 24×24). Title and description live
 * in a sibling text block, not inside the button. Both sit in a flex row at
 * items-start so their tops align with the first row of right-column content.
 *
 * Back target: computed from pathname — /components/button → /components,
 * /colour → /. Pass backHref to override.
 */
interface CatalogueIntroProps {
  readonly title: string;
  readonly description: string;
  readonly backHref?: string;
}

function useParentPath(override?: string): string {
  const pathname = usePathname();
  if (override != null) return override;
  const segments = pathname.split('/').filter(Boolean);
  segments.pop();
  return segments.length === 0 ? '/' : `/${segments.join('/')}`;
}

export function CatalogueIntro({
  title,
  description,
  backHref,
}: CatalogueIntroProps): React.ReactElement {
  const parent = useParentPath(backHref);

  return (
    <div className="catalogue-intro">
      <div className="catalogue-intro-header">
        <Button asChild size="heading-md" className="btn-icon catalogue-intro-back" aria-label="Back">
          <NextLink href={parent}>
            <Icon name="arrows-button-left" size="em" />
          </NextLink>
        </Button>
        <div className="catalogue-intro-text">
          <Text variant="heading-md" as="h1">{title}</Text>
          <Text variant="heading-md" opacity={40} as="p">{description}</Text>
        </div>
      </div>
    </div>
  );
}

import NextLink from 'next/link';
import { Text } from '@/components/primitives/Text';

/**
 * Left-column intro block used across catalogue pages (May 2026 spec).
 *
 *   ◀ Title       ← heading-md, back-link to /
 *   Single-line description (body-sm 40%)
 *
 * Drop inside <StickyCol> on a two-column page. The back arrow links to the
 * homepage so the user can always retreat one level without using the global nav.
 */
interface CatalogueIntroProps {
  readonly title: string;
  readonly description: string;
  readonly backHref?: string;
}

export function CatalogueIntro({
  title,
  description,
  backHref = '/',
}: CatalogueIntroProps): React.ReactElement {
  return (
    <div className="catalogue-intro">
      <NextLink href={backHref} className="catalogue-intro-back" aria-label={`Back to ${backHref}`}>
        <Text variant="heading-md" as="span" className="catalogue-intro-arrow" aria-hidden="true">◀</Text>
        <Text variant="heading-md" as="h1">{title}</Text>
      </NextLink>
      <Text variant="body-sm" opacity={40} as="p" className="catalogue-intro-desc">
        {description}
      </Text>
    </div>
  );
}

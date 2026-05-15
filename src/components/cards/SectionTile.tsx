import NextLink from 'next/link';
import { Text } from '@/components/primitives/Text';
import { cn } from '@/lib/cn';

/**
 * Homepage section tile — replaces the previous full-bleed Button rows
 * (May 2026 spec, Figma 3907-10763).
 *
 * Anatomy:
 *   ┌──────────────────────────────┐
 *   │ [ image placeholder ]        │
 *   │                              │
 *   │ Title (heading-md)           │
 *   │ Sub-description (body-sm 40) │
 *   └──────────────────────────────┘
 *
 * No border at rest — the system's opacity scale reserves 5% for horizontal
 * dividers only, so the previous hairline-around-the-tile violated the rule.
 * Affordance now comes from the hover overlay alone: 20% transparent-core
 * fill reveals on :hover (CSS fallback for the Figma proximity treatment).
 *
 * Figma source could not be read at implementation time (MCP blocked).
 * Refine visual treatment when access returns.
 */
interface SectionTileProps {
  readonly label: string;
  readonly description: string;
  readonly href: string;
  readonly className?: string;
}

export function SectionTile({
  label,
  description,
  href,
  className,
}: SectionTileProps): React.ReactElement {
  return (
    <NextLink href={href} className={cn('section-tile', className)}>
      <div className="section-tile-image" aria-hidden="true" />
      <div className="section-tile-body">
        <Text variant="heading-md" as="h2" className="section-tile-title">
          {label}
        </Text>
        <Text variant="body-sm" opacity={40} as="p" className="section-tile-desc">
          {description}
        </Text>
      </div>
    </NextLink>
  );
}

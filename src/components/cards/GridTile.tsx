'use client';

import { cn } from '@/lib/cn';

interface GridTileProps {
  readonly children: React.ReactNode;
  /**
   * Action row revealed on hover, centred over the tile content. Pass an
   * array of buttons (e.g. delete / download). Buttons should be plain
   * <button> nodes with the `grid-tile-btn` class — see the catalogue
   * for the canonical icon-button pattern.
   */
  readonly actions?: React.ReactNode;
  /**
   * Timestamp or short metadata rendered below the tile, visible only on
   * hover. Escapes the tile box — sits in the grid gap.
   */
  readonly meta?: React.ReactNode;
  readonly onClick?: () => void;
  readonly className?: string;
  readonly ariaLabel?: string;
}

/**
 * Square tile with hover-revealed action row and optional timestamp meta.
 *
 * Lineage: Scrapbook LibraryView .lv-tile pattern (l0at-izar worktree,
 * src/styles/stickerizer.css L884–1040).
 *
 * Behavioural notes:
 * - The container reserves no overflow:hidden so meta and tooltips can
 *   escape into the grid gap.
 * - :has() drives the dashed outline whenever an action button inside the
 *   tile is hovered or focus-visible. No outline at rest.
 * - Inner content dims to 20% while an action button is hovered, so the
 *   buttons remain legible without occluding the underlying content.
 */
export function GridTile({
  children,
  actions,
  meta,
  onClick,
  className,
  ariaLabel,
}: GridTileProps): React.ReactElement {
  const interactive = onClick != null;
  return (
    <div
      className={cn('grid-tile', className)}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e): void => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      <div className="grid-tile-inner">{children}</div>
      {actions != null && <div className="grid-tile-actions">{actions}</div>}
      {meta != null && <div className="grid-tile-meta">{meta}</div>}
    </div>
  );
}

/**
 * Canonical icon-button used inside a <GridTile>'s `actions` row. Renders
 * a 24×24 button with a coloured background pill that follows the
 * GridTile's action-hover state.
 *
 * Use `variant="danger"` for destructive actions (red icon, permanent
 * 10% red pill). Use `variant="default"` for neutral (transparent at
 * rest, 10% neutral pill on hover).
 */
interface GridTileActionProps {
  readonly children: React.ReactNode;
  readonly onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly ariaLabel: string;
  readonly variant?: 'default' | 'danger';
  readonly className?: string;
}

export function GridTileAction({
  children,
  onClick,
  ariaLabel,
  variant = 'default',
  className,
}: GridTileActionProps): React.ReactElement {
  return (
    <button
      type="button"
      className={cn(
        'grid-tile-btn',
        variant === 'danger' && 'grid-tile-btn--danger',
        className,
      )}
      aria-label={ariaLabel}
      onClick={(e): void => {
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      <span className="grid-tile-btn-bg" aria-hidden="true" />
      {children}
    </button>
  );
}

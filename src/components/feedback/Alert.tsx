'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';
import { Icon } from '@/components/icons/Icon';

/**
 * Alert variants — accent-coloured pill banners.
 *
 * Canonical palette names: default, red, orange, yellow, green, blue.
 * Semantic aliases (success/warning/error/info/urgent) are kept as
 * convenience names — they map to a palette colour internally.
 */
export type AlertVariant =
  | 'default'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  // Semantic aliases — preferred when the meaning is more important than the colour.
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'urgent';

interface AlertProps {
  readonly variant?: AlertVariant;
  readonly title?: string;
  readonly children?: React.ReactNode;
  readonly onDismiss?: () => void;
  /**
   * Icon name (from the Shinoda icon set) or a fully-formed node.
   * Pass `null` to render no icon. Defaults to "Warning" triangle.
   */
  readonly icon?: string | React.ReactNode | null;
  /** Dismiss control label. Defaults to "Dismiss". */
  readonly dismissLabel?: string;
  readonly className?: string;
}

const DISMISS_ANIMATION_MS = 200;

/**
 * Map semantic aliases to canonical palette variant. The CSS only declares
 * .alert-default and .alert-{red|orange|yellow|green|blue} — aliases are
 * resolved here so consumers can carry on writing variant="error" etc.
 */
const VARIANT_ALIAS: Record<AlertVariant, AlertVariant> = {
  default: 'default',
  red: 'red',
  orange: 'orange',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  success: 'green',
  warning: 'orange',
  error: 'red',
  info: 'blue',
  urgent: 'red',
};

function renderIcon(icon: AlertProps['icon']): React.ReactNode {
  if (icon === null) return null;
  if (icon === undefined) return <Icon name="warning-triangle" size="sm" />;
  if (typeof icon === 'string') return <Icon name={icon} size="sm" />;
  return icon;
}

export function Alert({
  variant = 'default',
  title,
  children,
  onDismiss,
  icon,
  dismissLabel = 'Dismiss',
  className,
}: AlertProps): React.ReactElement | null {
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const dismissTimerRef = useRef<number | null>(null);
  useGravity(alertRef as React.RefObject<HTMLElement | null>);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsMounted(true));
    return (): void => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    return (): void => {
      if (dismissTimerRef.current != null) {
        window.clearTimeout(dismissTimerRef.current);
      }
    };
  }, []);

  function handleDismiss(): void {
    if (onDismiss == null) return;
    setIsExiting(true);
    dismissTimerRef.current = window.setTimeout(() => onDismiss(), DISMISS_ANIMATION_MS);
  }

  const resolvedVariant = VARIANT_ALIAS[variant];

  return (
    <div
      ref={alertRef}
      role="alert"
      className={cn(
        'alert',
        `alert-${resolvedVariant}`,
        isMounted && !isExiting && 'alert-visible',
        isExiting && 'alert-exiting',
        className,
      )}
    >
      {renderIcon(icon) != null && (
        <span className="alert-icon" aria-hidden="true">
          {renderIcon(icon)}
        </span>
      )}
      <div className="alert-body">
        {title != null && <p className="alert-title">{title}</p>}
        {children != null && <div className="alert-content">{children}</div>}
      </div>
      {onDismiss != null && (
        <button
          type="button"
          className="alert-dismiss btn"
          onClick={handleDismiss}
        >
          {dismissLabel}
        </button>
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';

export type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'urgent';

interface AlertProps {
  readonly variant?: AlertVariant;
  readonly title?: string;
  readonly children?: React.ReactNode;
  readonly onDismiss?: () => void;
  readonly className?: string;
}

const DISMISS_ANIMATION_MS = 200;

export function Alert({
  variant = 'default',
  title,
  children,
  onDismiss,
  className,
}: AlertProps): React.ReactElement | null {
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const dismissTimerRef = useRef<number | null>(null);
  useGravity(alertRef as React.RefObject<HTMLElement | null>);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    return () => {
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

  return (
    <div
      ref={alertRef}
      role="alert"
      className={cn(
        'alert',
        `alert-${variant}`,
        isMounted && !isExiting && 'alert-visible',
        isExiting && 'alert-exiting',
        className,
      )}
    >
      <div className="alert-body">
        {title != null && <p className="alert-title">{title}</p>}
        {children != null && <div className="alert-content">{children}</div>}
      </div>
      {onDismiss != null && (
        <button
          type="button"
          className="alert-dismiss btn"
          aria-label="Dismiss"
          onClick={handleDismiss}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/icons/Icon';

const COPIED_FEEDBACK_MS = 1600;

interface CodeSnippetProps {
  /** The code text to display and copy. */
  readonly code: string;
  /** Optional aria label for the copy action. Defaults to "Copy code". */
  readonly copyLabel?: string;
  readonly className?: string;
}

/**
 * Click-to-copy code snippet. Three states (Figma: Default / Hovered / Active):
 *   - Default — 40% opacity, no background, no action affordance
 *   - Hovered — full opacity, fill-secondary background, Copy icon button
 *   - Active  — same background, "Copied to Clipboard" feedback with CheckCircle
 *
 * Whole tile is clickable. After copy, the active state holds for ~1.6s
 * before returning to hover/default.
 */
export function CodeSnippet({
  code,
  copyLabel = 'Copy code',
  className,
}: CodeSnippetProps): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
  }, []);

  const handleCopy = useCallback(async (): Promise<void> => {
    if (typeof navigator === 'undefined' || navigator.clipboard == null) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    } catch (err) {
      console.error('CodeSnippet — clipboard write failed', err);
    }
  }, [code]);

  return (
    <button
      type="button"
      className={cn('code-snippet', copied && 'code-snippet-copied', className)}
      onClick={handleCopy}
      aria-label={copyLabel}
      data-cursor="btn"
    >
      <span className="code-snippet-text">
        {copied ? 'Copied to Clipboard' : code}
      </span>
      <span className="code-snippet-action" aria-hidden="true">
        <Icon name={copied ? 'CheckCircle' : 'Copy'} size="sm" />
      </span>
    </button>
  );
}

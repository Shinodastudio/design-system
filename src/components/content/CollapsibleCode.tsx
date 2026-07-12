'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/icons/Icon';

const COPIED_FEEDBACK_MS = 1600;

interface CollapsibleCodeProps {
  /** Raw text to display verbatim and copy. Whitespace preserved. */
  readonly code: string;
  /** Optional language label rendered as a quiet caption above the block. */
  readonly language?: string;
  readonly className?: string;
}

/**
 * Long-form code/text block intended for copy-paste of prompts and skill files.
 *
 * Fully collapsed by default — only the header (language label + action
 * icons) is visible, the code body itself is hidden. Both actions are
 * icon-only per the Figma "Code Snippet" component (node 3904:6552):
 * Copy always writes the full body to clipboard; the expand/collapse toggle
 * sits immediately to its right and reveals or hides the code below.
 *
 * Visual contract:
 *   - Mono font, 1.5em line-height, transparent at rest, --color-transparent-weak
 *     (5% text-primary — theme-adaptive, works on any surface) on hover
 *   - Border-radius: --radius-sm (system maximum on primary elements)
 *   - No drop shadow, no gradient fill
 */
export function CollapsibleCode({
  code,
  language,
  className,
}: CollapsibleCodeProps): React.ReactElement {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [bodyHeight, setBodyHeight] = useState(0);

  useEffect(() => () => {
    if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el == null) return;
    setBodyHeight(expanded ? el.scrollHeight : 0);
  }, [expanded, code]);

  const handleCopy = useCallback(async (): Promise<void> => {
    if (typeof navigator === 'undefined' || navigator.clipboard == null) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    } catch (err) {
      console.error('CollapsibleCode — clipboard write failed', err);
    }
  }, [code]);

  const handleToggle = useCallback((): void => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <div className={cn('collapsible-code', expanded && 'is-expanded', className)}>
      <div className="collapsible-code-header">
        {language != null && (
          <span className="collapsible-code-language">{language}</span>
        )}
        <div className="collapsible-code-actions">
          <button
            type="button"
            className="collapsible-code-action"
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy to clipboard'}
            data-cursor="btn"
          >
            <Icon name={copied ? 'check-circle-2' : 'copy-paste'} size="sm" />
          </button>
          <button
            type="button"
            className="collapsible-code-action"
            onClick={handleToggle}
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse code' : 'Expand code'}
            data-cursor="btn"
          >
            <Icon name={expanded ? 'arrows-shrink-vertical' : 'arrows-expand-vertical'} size="sm" />
          </button>
        </div>
      </div>

      <div
        ref={bodyRef}
        className="collapsible-code-body"
        style={{ maxHeight: `${bodyHeight}px` }}
        aria-hidden={!expanded}
      >
        <pre className="collapsible-code-pre">{code}</pre>
      </div>
    </div>
  );
}

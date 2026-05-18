'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/icons/Icon';

const COPIED_FEEDBACK_MS = 1600;
const COLLAPSED_LINES = 8;

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
 * Collapsed by default to {@link COLLAPSED_LINES} lines with a soft fade at the
 * bottom edge. The whole footer row is the expand/collapse affordance; a
 * separate copy button writes the entire body to the clipboard.
 *
 * Visual contract:
 *   - Mono font, 1.5em line-height, fill-secondary background
 *   - Border-radius: --radius-sm (system maximum on primary elements)
 *   - Fade overlay only while collapsed
 *   - No drop shadow, no gradient fill — overlay fade is fill-base → transparent
 */
export function CollapsibleCode({
  code,
  language,
  className,
}: CollapsibleCodeProps): React.ReactElement {
  const [expanded, setExpanded] = useState(false);
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
        <button
          type="button"
          className="collapsible-code-copy"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy to clipboard'}
          data-cursor="btn"
        >
          <span>{copied ? 'Copied' : 'Copy'}</span>
          <Icon name={copied ? 'CheckCircle' : 'Copy'} size="sm" />
        </button>
      </div>

      <div
        className="collapsible-code-body"
        style={{
          maxHeight: expanded ? 'none' : `calc(1.5em * ${COLLAPSED_LINES})`,
        }}
      >
        <pre className="collapsible-code-pre">{code}</pre>
      </div>

      <button
        type="button"
        className="collapsible-code-toggle"
        onClick={handleToggle}
        aria-expanded={expanded}
        data-cursor="btn"
      >
        <span>{expanded ? 'Collapse' : 'Expand'}</span>
        <Icon name={expanded ? 'CaretUp' : 'CaretDown'} size="sm" />
      </button>
    </div>
  );
}

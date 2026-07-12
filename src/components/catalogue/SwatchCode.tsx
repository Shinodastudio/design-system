'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/icons';

interface SwatchCodeProps {
  readonly value: string;
}

/**
 * Copyable CSS-var label at the bottom of a colour swatch card.
 *
 * States (matching Figma 3904-6412 componentcode):
 *   default  — code text only, 40% opacity
 *   hover    — fill-secondary bg, copy icon appears at right
 *   copied   — "Copied to Clipboard" text + CheckCircle icon, 1400ms then resets
 */
export function SwatchCode({ value }: SwatchCodeProps): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }, [value]);

  return (
    <button
      className={cn('colour-swatch-code', copied && 'is-copied')}
      onClick={handleClick}
      title={`Copy ${value}`}
      aria-label={copied ? 'Copied to clipboard' : `Copy ${value}`}
    >
      <code className="colour-swatch-code-text">
        {copied ? 'Copied to Clipboard' : value}
      </code>
      <span className="colour-swatch-code-icon" aria-hidden="true">
        <Icon name={copied ? 'check-circle-2' : 'copy-paste'} size="em" />
      </span>
    </button>
  );
}

'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/cn';

interface CopyValueProps {
  readonly value: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function CopyValue({ value, children, className }: CopyValueProps): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }, [value]);

  return (
    <button
      className={cn('copy-value', copied && 'is-copied', className)}
      onClick={handleClick}
      title={`Copy ${value}`}
      aria-label={copied ? 'Copied' : `Copy ${value}`}
    >
      {copied ? <span className="copy-feedback">Copied</span> : children}
    </button>
  );
}

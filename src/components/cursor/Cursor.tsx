'use client';

import { useRef } from 'react';
import { useCursor, type CursorRef } from '@/hooks/useCursor';

export function Cursor(): React.ReactElement {
  const elRef    = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const cursorRef = useRef<CursorRef>({
    get el()    { return elRef.current; },
    get label() { return labelRef.current; },
  });

  useCursor(cursorRef);

  return (
    <div ref={elRef} className="cursor is-hidden" aria-hidden="true">
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCursor, type CursorRef } from '@/hooks/useCursor';
import { subscribeDialogStack } from '@/lib/dialogStack';

export function Cursor(): React.ReactElement {
  const elRef      = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [dialogHost, setDialogHost] = useState<HTMLDialogElement | null>(null);

  const cursorRef = useRef<CursorRef>({
    get el()      { return elRef.current; },
    get label()   { return labelRef.current; },
    get preview() { return previewRef.current; },
  });

  useCursor(cursorRef);

  // A native <dialog> shown via showModal() renders in the browser's top
  // layer, which paints above the rest of the document regardless of
  // z-index — including this element. While one is open, portal the cursor
  // inside it so it stays on top of the dialog's scrim and content instead
  // of getting stuck underneath.
  useEffect(() => subscribeDialogStack(setDialogHost), []);

  const cursor = (
    <div ref={elRef} className="cursor is-hidden" aria-hidden="true">
      <div ref={previewRef} className="cursor-preview" />
      <span ref={labelRef} className="cursor-label" />
    </div>
  );

  return dialogHost != null ? createPortal(cursor, dialogHost) : cursor;
}

'use client';

import { useEffect, useRef } from 'react';

const LERP = 0.22;

const TEXT_TAGS = new Set([
  'p','h1','h2','h3','h4','h5','h6','li','blockquote','span','em','strong','time','cite',
]);

export interface CursorRef {
  readonly el: HTMLDivElement | null;
  readonly label: HTMLSpanElement | null;
}

export function useCursor(cursorRef: React.RefObject<CursorRef>): void {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const curX   = useRef(0);
  const curY   = useRef(0);
  const rafId  = useRef<number>(0);
  const hiddenByContext = useRef(false);

  useEffect(() => {
    const html   = document.documentElement;
    const cursor = cursorRef.current?.el;
    const label  = cursorRef.current?.label;

    if (!cursor || !label) return;

    function animate() {
      if (!cursor) return;
      curX.current += (mouseX.current - curX.current) * LERP;
      curY.current += (mouseY.current - curY.current) * LERP;
      cursor.style.left = `${curX.current}px`;
      cursor.style.top  = `${curY.current}px`;
      rafId.current = requestAnimationFrame(animate);
    }
    rafId.current = requestAnimationFrame(animate);

    function onMove(e: MouseEvent) {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (!hiddenByContext.current) {
        cursor?.classList.remove('is-hidden');
      }
    }
    function onLeave() { cursor?.classList.add('is-hidden'); }
    function onEnter() {
      if (!hiddenByContext.current) cursor?.classList.remove('is-hidden');
    }

    function clearContext() {
      hiddenByContext.current = false;
      html.classList.remove('cursor--text', 'cursor--chip', 'cursor--active');
      cursor?.style.removeProperty('--cursor-btn-w');
      cursor?.style.removeProperty('--cursor-btn-h');
      if (label) label.textContent = '';
    }

    function setContext(el: Element | null) {
      clearContext();
      if (!el || el === document.body || el === html) return;

      const tag  = el.tagName.toLowerCase();
      const role = el.getAttribute('role');

      // Buttons and slider controls: hide custom cursor
      if (
        tag === 'button' ||
        role === 'button' ||
        role === 'slider' ||
        el.classList.contains('btn')
      ) {
        hiddenByContext.current = true;
        cursor?.classList.add('is-hidden');
        return;
      }

      // Links: cursor hides as background appears behind text
      if (tag === 'a' || el.classList.contains('link')) {
        hiddenByContext.current = true;
        cursor?.classList.add('is-hidden');
        return;
      }

      // Text inputs / textarea / select: cursor: none on element, hide custom cursor too
      // Exclude checkbox + radio — they are controls, not text fields; cursor should stay.
      const inputType = (el as HTMLInputElement).type ?? '';
      const isTextInput =
        (tag === 'input' && inputType !== 'checkbox' && inputType !== 'radio') ||
        tag === 'textarea' ||
        tag === 'select';
      if (isTextInput) {
        hiddenByContext.current = true;
        cursor?.classList.add('is-hidden');
        return;
      }

      // Image expand chip
      if (tag === 'img' || tag === 'figure' || (el as HTMLElement).dataset['cursor'] === 'expand') {
        html.classList.add('cursor--chip');
        if (label) label.textContent = (el as HTMLElement).dataset['cursorLabel'] ?? 'expand';
        return;
      }

      // Text I-beam
      if (TEXT_TAGS.has(tag) || (el as HTMLElement).isContentEditable) {
        html.classList.add('cursor--text');
      }
    }

    function onOver(e: MouseEvent)  { setContext(e.target as Element); }
    function onOut()                { clearContext(); }
    function onDown()               { html.classList.add('cursor--active'); }
    function onUp()                 { html.classList.remove('cursor--active'); }

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseout',   onOut);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
    };
  }, [cursorRef]);
}

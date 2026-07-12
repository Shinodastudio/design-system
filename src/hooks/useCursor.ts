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
    const html = document.documentElement;

    if (!cursorRef.current?.el || !cursorRef.current?.label) return;

    // Read the element fresh from cursorRef on every use rather than
    // capturing it once above. `Cursor` portals its DOM node into the
    // topmost open <dialog> while one is open (see dialogStack.ts) — React
    // unmounts and remounts a new host node when a component's render
    // output switches in/out of a portal, so a variable captured at effect
    // setup would go stale the first time that happens. cursorRef's getters
    // always resolve to whatever node is currently mounted.
    function animate() {
      const cursor = cursorRef.current?.el;
      if (!cursor) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }
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
        cursorRef.current?.el?.classList.remove('is-hidden');
      }
    }
    function onLeave() { cursorRef.current?.el?.classList.add('is-hidden'); }
    function onEnter() {
      if (!hiddenByContext.current) cursorRef.current?.el?.classList.remove('is-hidden');
    }

    function clearContext() {
      hiddenByContext.current = false;
      html.classList.remove('cursor--text', 'cursor--chip', 'cursor--active');
      cursorRef.current?.el?.style.removeProperty('--cursor-btn-w');
      cursorRef.current?.el?.style.removeProperty('--cursor-btn-h');
      const label = cursorRef.current?.label;
      if (label) label.textContent = '';
    }

    function setContext(el: Element | null) {
      clearContext();
      if (!el || el === document.body || el === html) return;

      const tag  = el.tagName.toLowerCase();
      const role = el.getAttribute('role');

      // Buttons and slider controls: hide custom cursor. Also honour an explicit
      // data-cursor="btn" on the element or a nearest ancestor — used by controls
      // that aren't semantic <button>s but should behave like one, e.g. Choice
      // (checkbox/radio row) and Slider. Without the ancestor lookup, hovering a
      // text node inside (like ChoiceLabel's <span>) falls through to the text
      // I-beam check below instead of inheriting the parent's button context.
      const btnAncestor = (el as HTMLElement).closest('[data-cursor="btn"]');
      if (
        tag === 'button' ||
        role === 'button' ||
        role === 'slider' ||
        el.classList.contains('btn') ||
        btnAncestor
      ) {
        hiddenByContext.current = true;
        cursorRef.current?.el?.classList.add('is-hidden');
        return;
      }

      // Links: cursor hides as background appears behind text
      if (tag === 'a' || el.classList.contains('link')) {
        hiddenByContext.current = true;
        cursorRef.current?.el?.classList.add('is-hidden');
        return;
      }

      // Text inputs / textarea / select: cursor: none on element, hide custom cursor too.
      // (Checkbox/radio are covered above via Choice's data-cursor="btn" ancestor.)
      const inputType = (el as HTMLInputElement).type ?? '';
      const isTextInput =
        (tag === 'input' && inputType !== 'checkbox' && inputType !== 'radio') ||
        tag === 'textarea' ||
        tag === 'select';
      if (isTextInput) {
        hiddenByContext.current = true;
        cursorRef.current?.el?.classList.add('is-hidden');
        return;
      }

      // Image expand chip
      if (tag === 'img' || tag === 'figure' || (el as HTMLElement).dataset['cursor'] === 'expand') {
        html.classList.add('cursor--chip');
        const label = cursorRef.current?.label;
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

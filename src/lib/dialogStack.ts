/**
 * dialogStack — tracks which native <dialog> elements are currently open via
 * showModal(), most-recent last.
 *
 * Why this exists: a <dialog> shown with showModal() is promoted to the
 * browser's top layer, a stacking context that always paints above every
 * other element in the document — regardless of z-index. The custom cursor
 * (`Cursor.tsx`) lives in the ordinary DOM tree with `z-index: 9999`, which
 * is meaningless against the top layer: it renders stuck underneath any open
 * dialog's scrim and content. The only way to draw above a top-layer
 * element is to be inside its own subtree, so `Cursor` subscribes here and
 * portals itself into the topmost open <dialog> while one exists.
 */

type Listener = (node: HTMLDialogElement | null) => void;

let stack: readonly HTMLDialogElement[] = [];
const listeners = new Set<Listener>();

function topOfStack(): HTMLDialogElement | null {
  return stack.length > 0 ? (stack[stack.length - 1] ?? null) : null;
}

function notify(): void {
  const top = topOfStack();
  listeners.forEach((listener) => listener(top));
}

export function pushDialog(node: HTMLDialogElement): void {
  stack = [...stack.filter((n) => n !== node), node];
  notify();
}

export function popDialog(node: HTMLDialogElement): void {
  stack = stack.filter((n) => n !== node);
  notify();
}

/** Subscribes to the topmost open dialog; fires immediately with the current value. */
export function subscribeDialogStack(listener: Listener): () => void {
  listeners.add(listener);
  listener(topOfStack());
  return (): void => {
    listeners.delete(listener);
  };
}

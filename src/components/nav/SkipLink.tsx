/**
 * SkipLink — keyboard-only shortcut to jump past the nav into main content.
 * Visually hidden until focused; slides in from above the viewport on focus.
 * Target: #main-content (the <main> element in MainWrapper).
 */
export function SkipLink(): React.ReactElement {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}

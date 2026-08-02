import { SearchButton } from './SearchButton';
import { NavProgressiveBlur } from './NavProgressiveBlur';

/**
 * Top navigation — reduced to a single affordance (shinoda.studio parity).
 *
 * The brand wordmark and theme toggle are both gone: the toggle now lives
 * only in the footer, and every route (Home included) is reachable through
 * the Command palette. What remains is the search icon alone, top-right, at
 * heading-md, over the progressive blur strip that keeps scrolling content
 * legible beneath it.
 */
export function Nav(): React.ReactElement {
  return (
    <header className="nav">
      <div className="nav-inner">
        <nav aria-label="Primary" className="nav-actions">
          <SearchButton />
        </nav>
      </div>
      <NavProgressiveBlur />
    </header>
  );
}

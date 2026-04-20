'use client';

export function ScrollToTop(): React.ReactElement {
  return (
    <button
      className="btn btn-icon footer-scroll-top"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0 })}
    >
      ●
    </button>
  );
}

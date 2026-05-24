/**
 * Smooth progressive blur rendered below the fixed nav bar.
 * All visual logic lives in the .progressive-blur CSS class —
 * three backdrop-filter layers (16 → 8 → 4 px) with overlapping
 * gradient masks so no seams appear between blur zones.
 *
 * Customise via CSS custom properties on the element or a parent:
 *   --pb-height    (default 80px)
 *   --pb-blur-a    (default 16px — heaviest, top zone)
 *   --pb-blur-b    (default  8px — mid zone)
 *   --pb-blur-c    (default  4px — lightest, bottom zone)
 */
export function NavProgressiveBlur(): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      className="progressive-blur"
      style={{ top: 0, zIndex: 0 }}
    />
  );
}

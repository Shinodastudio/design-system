/**
 * Button size constants — kept in a non-client module so server components
 * (catalogue pages) can import them without crossing the RSC boundary.
 *
 * Sizes map 1:1 to the Shinoda type scale (Figma May 2026 spec):
 *   - 6 heading sizes (sans serif, fw-normal)
 *   - 3 subheading sizes (serif, fw-book)
 *   - 6 body sizes (sans serif, fw-normal)
 *
 * Previous t-shirt scale (xs/sm/md/lg/xl/2xl) was Webflow-parity shorthand;
 * the Figma source defines buttons by type tier instead.
 */

export const BUTTON_SIZES = [
  'heading-xl',
  'heading-lg',
  'heading-md',
  'heading-sm',
  'heading-xs',
  'heading-2xs',
  'subheading-lg',
  'subheading-md',
  'subheading-sm',
  'body-xl',
  'body-lg',
  'body-md',
  'body-sm',
  'body-xs',
  'body-2xs',
] as const;

export type ButtonSize = typeof BUTTON_SIZES[number];

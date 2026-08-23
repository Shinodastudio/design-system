/**
 * Size chips shared by every catalogue section that previews a form field.
 *
 * Fields have no `size` prop: an underline-only control is defined entirely by
 * its type, so it scales off font-size and nothing else. The chips therefore
 * map a type-scale name onto the `fontSize` the preview applies.
 */
export const INPUT_SIZES = [
  'heading-xl', 'heading-lg', 'heading-md', 'heading-sm', 'heading-xs', 'heading-2xs',
  'body-xl', 'body-lg', 'body-md', 'body-sm', 'body-xs', 'body-2xs',
] as const;

export type InputSize = typeof INPUT_SIZES[number];

export const INPUT_FONT: Record<InputSize, string> = {
  'heading-xl':  '2.5rem',
  'heading-lg':  '2rem',
  'heading-md':  '1.5rem',
  'heading-sm':  '1.25rem',
  'heading-xs':  '1rem',
  'heading-2xs': '0.75rem',
  'body-xl':     '1.5rem',
  'body-lg':     '1.375rem',
  'body-md':     '1.25rem',
  'body-sm':     '1.125rem',
  'body-xs':     '1rem',
  'body-2xs':    '0.875rem',
};

/** The native chevron stops rendering legibly below 0.875rem. */
export const SELECT_FONT: Record<InputSize, string> = {
  ...INPUT_FONT,
  'heading-2xs': '0.875rem',
};

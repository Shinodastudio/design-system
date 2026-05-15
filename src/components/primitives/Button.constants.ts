/**
 * Button size constants — kept in a non-client module so server components
 * (catalogue pages) can import them without crossing the RSC boundary.
 *
 * Exporting non-function values from a `'use client'` file makes Next.js
 * treat them as reference holders, which breaks at prerender time
 * ("BUTTON_SIZES.map is not a function").
 */

export const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
export type ButtonSize = typeof BUTTON_SIZES[number];

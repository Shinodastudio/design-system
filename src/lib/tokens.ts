export const HEADING_VARIANTS = [
  'heading-xl',
  'heading-lg',
  'heading-md',
  'heading-sm',
  'heading-xs',
  'heading-2xs',
] as const;

export const SUBHEADING_VARIANTS = [
  'subheading-lg',
  'subheading-md',
  'subheading-sm',
] as const;

export const BODY_VARIANTS = [
  'body-xl',
  'body-lg',
  'body-md',
  'body-sm',
  'body-xs',
  'body-2xs',
] as const;

export const ALL_TYPE_VARIANTS = [
  ...HEADING_VARIANTS,
  ...SUBHEADING_VARIANTS,
  ...BODY_VARIANTS,
] as const;

export type HeadingVariant    = typeof HEADING_VARIANTS[number];
export type SubheadingVariant = typeof SUBHEADING_VARIANTS[number];
export type BodyVariant       = typeof BODY_VARIANTS[number];
export type TypeVariant       = typeof ALL_TYPE_VARIANTS[number];

export const OPACITY_LEVELS = [80, 60, 40, 20] as const;
export type OpacityLevel = typeof OPACITY_LEVELS[number];

export const SEMANTIC_COLORS = [
  'fill-base',
  'fill-primary',
  'fill-secondary',
  'fill-tertiary',
  'text-primary',
  'text-secondary',
  'text-tertiary',
  'text-contrast',
  'outline',
  'overlay-weak',
  'overlay-core',
  'overlay-strong',
  'status-error',
  'status-warning',
  'status-info',
  'status-success',
] as const;

export type SemanticColor = typeof SEMANTIC_COLORS[number];

export const SPACING_TOKENS = [
  { name: '--space-1',  value: '4px' },
  { name: '--space-2',  value: '8px' },
  { name: '--space-3',  value: '12px' },
  { name: '--space-4',  value: '16px' },
  { name: '--space-5',  value: '20px' },
  { name: '--space-6',  value: '24px' },
  { name: '--space-8',  value: '32px' },
  { name: '--space-10', value: '40px' },
  { name: '--space-12', value: '48px' },
  { name: '--space-16', value: '64px' },
  { name: '--space-20', value: '80px' },
  { name: '--space-24', value: '96px' },
  { name: '--space-32', value: '128px' },
] as const;

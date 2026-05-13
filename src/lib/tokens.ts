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
  { name: '--space-7',  value: '28px' },
  { name: '--space-8',  value: '32px' },
  { name: '--space-9',  value: '36px' },
  { name: '--space-10', value: '40px' },
  { name: '--space-12', value: '48px' },
  { name: '--space-14', value: '56px' },
  { name: '--space-16', value: '64px' },
  { name: '--space-18', value: '72px' },
  { name: '--space-20', value: '80px' },
  { name: '--space-24', value: '96px' },
  { name: '--space-28', value: '112px' },
  { name: '--space-32', value: '128px' },
] as const;

export const CONTAINER_TOKENS = [
  { name: '--container-3xs', value: '128px'  },
  { name: '--container-2xs', value: '192px'  },
  { name: '--container-xs',  value: '256px'  },
  { name: '--container-sm',  value: '320px'  },
  { name: '--container-md',  value: '384px'  },
  { name: '--container-lg',  value: '512px'  },
  { name: '--container-xl',  value: '640px'  },
  { name: '--container-2xl', value: '768px'  },
  { name: '--container-3xl', value: '896px'  },
  { name: '--container-4xl', value: '1024px' },
  { name: '--container-5xl', value: '1312px' },
] as const;

export const BREAKPOINT_TOKENS = [
  { name: '--breakpoint-2xs', value: '400px'  },
  { name: '--breakpoint-xs',  value: '428px'  },
  { name: '--breakpoint-sm',  value: '640px'  },
  { name: '--breakpoint-md',  value: '768px'  },
  { name: '--breakpoint-lg',  value: '1024px' },
  { name: '--breakpoint-xl',  value: '1280px' },
  { name: '--breakpoint-2xl', value: '1440px' },
  { name: '--breakpoint-3xl', value: '1920px' },
] as const;

export const RADIUS_TOKENS = [
  { name: '--radius-none', value: '0px'    },
  { name: '--radius-xs',   value: '4px'    },
  { name: '--radius-sm',   value: '8px'    },
  { name: '--radius-md',   value: '12px'   },
  { name: '--radius-lg',   value: '16px'   },
  { name: '--radius-xl',   value: '24px'   },
  { name: '--radius-2xl',  value: '32px'   },
  { name: '--radius-3xl',  value: '64px'   },
  { name: '--radius-4xl',  value: '128px'  },
  { name: '--radius-full', value: '9999px' },
] as const;

export const BORDER_TOKENS = [
  { name: '--border-none', value: '0px' },
  { name: '--border-sm',   value: '1px' },
  { name: '--border-md',   value: '2px' },
  { name: '--border-lg',   value: '4px' },
  { name: '--border-xl',   value: '8px' },
] as const;

export const BLUR_TOKENS = [
  { name: '--blur-none', value: '0px'    },
  { name: '--blur-xs',   value: '8px'    },
  { name: '--blur-sm',   value: '16px'   },
  { name: '--blur-md',   value: '32px'   },
  { name: '--blur-lg',   value: '64px'   },
  { name: '--blur-xl',   value: '128px'  },
  { name: '--blur-2xl',  value: '256px'  },
  { name: '--blur-3xl',  value: '512px'  },
  { name: '--blur-4xl',  value: '1024px' },
] as const;

export const ALPHA_TOKENS = [
  { name: '--alpha-5',  value: '5%'  },
  { name: '--alpha-10', value: '10%' },
  { name: '--alpha-20', value: '20%' },
  { name: '--alpha-30', value: '30%' },
  { name: '--alpha-40', value: '40%' },
  { name: '--alpha-50', value: '50%' },
  { name: '--alpha-60', value: '60%' },
  { name: '--alpha-70', value: '70%' },
  { name: '--alpha-80', value: '80%' },
  { name: '--alpha-90', value: '90%' },
] as const;

export const ACCENT_TOKENS = [
  { name: '--accent-red',    label: 'Red'    },
  { name: '--accent-orange', label: 'Orange' },
  { name: '--accent-yellow', label: 'Yellow' },
  { name: '--accent-green',  label: 'Green'  },
  { name: '--accent-blue',   label: 'Blue'   },
] as const;

export const PADDING_TOKENS = [
  { name: '--padding-page',       value: '4em',  note: 'Outer page gutter'  },
  { name: '--padding-columns',    value: '4em',  note: 'Between columns'    },
  { name: '--padding-section-sm', value: '4em',  note: 'Section vertical, small'  },
  { name: '--padding-section-md', value: '6em',  note: 'Section vertical, medium' },
  { name: '--padding-section-lg', value: '8em',  note: 'Section vertical, large'  },
  { name: '--padding-container',  value: '4em',  note: 'Inner container'    },
  { name: '--padding-nav',        value: '8em',  note: 'Nav region'         },
  { name: '--padding-card',       value: '2em',  note: 'Card interior'      },
] as const;

export const LEADING_TOKENS = [
  { name: '--leading-heading',    value: '1.05', note: 'Display + heading'  },
  { name: '--leading-body-xl',    value: '1.20', note: 'Body XL'            },
  { name: '--leading-body-md',    value: '1.30', note: 'Body MD'            },
  { name: '--leading-body-xs',    value: '1.40', note: 'Body XS'            },
  { name: '--leading-title',      value: '1.05', note: 'Figma primitive'    },
  { name: '--leading-subtitle',   value: '1.05', note: 'Figma primitive'    },
  { name: '--leading-body',       value: '1.30', note: 'Figma primitive'    },
  { name: '--leading-paragraph',  value: '1.50', note: 'Figma primitive'    },
  { name: '--leading-caption',    value: '1.00', note: 'Figma primitive'    },
] as const;

export const TRACKING_TOKENS = [
  { name: '--tracking-n040', value: '-0.040em' },
  { name: '--tracking-n035', value: '-0.035em' },
  { name: '--tracking-n030', value: '-0.030em' },
  { name: '--tracking-n025', value: '-0.025em' },
  { name: '--tracking-n020', value: '-0.020em' },
  { name: '--tracking-n015', value: '-0.015em' },
  { name: '--tracking-n010', value: '-0.010em' },
  { name: '--tracking-n005', value: '-0.005em' },
  { name: '--tracking-none',  value: '0em'      },
] as const;

export const FONT_WEIGHT_TOKENS = [
  { name: '--fw-thin',       value: '100' },
  { name: '--fw-extralight', value: '200' },
  { name: '--fw-light',      value: '300' },
  { name: '--fw-normal',     value: '400' },
  { name: '--fw-book',       value: '450' },
  { name: '--fw-medium',     value: '500' },
  { name: '--fw-semibold',   value: '600' },
  { name: '--fw-bold',       value: '700' },
  { name: '--fw-extrabold',  value: '800' },
  { name: '--fw-black',      value: '900' },
] as const;

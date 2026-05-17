'use client';

import { useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';
import { BUTTON_SIZES, type ButtonSize, type AccentColor } from './Button.constants';

export { BUTTON_SIZES, type ButtonSize, type AccentColor };

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  readonly asChild?: boolean;
  /**
   * Size variant — maps to the Shinoda type scale (heading / subheading / body).
   * Default base is heading-md (1.5rem). Sizes follow the Figma spec.
   */
  readonly size?: ButtonSize;
  /**
   * Accent colour variant — tints the button text and background with a
   * semantic or raw palette colour. Background is 10% tint at rest, 20% on
   * hover. Applies to text buttons and icon-only (.btn-icon) buttons alike.
   */
  readonly accent?: AccentColor;
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  'heading-xl':    'btn-size-heading-xl',
  'heading-lg':    'btn-size-heading-lg',
  'heading-md':    'btn-size-heading-md',
  'heading-sm':    'btn-size-heading-sm',
  'heading-xs':    'btn-size-heading-xs',
  'heading-2xs':   'btn-size-heading-2xs',
  'subheading-lg': 'btn-size-subheading-lg',
  'subheading-md': 'btn-size-subheading-md',
  'subheading-sm': 'btn-size-subheading-sm',
  'body-xl':       'btn-size-body-xl',
  'body-lg':       'btn-size-body-lg',
  'body-md':       'btn-size-body-md',
  'body-sm':       'btn-size-body-sm',
  'body-xs':       'btn-size-body-xs',
  'body-2xs':      'btn-size-body-2xs',
};

export function Button({
  asChild = false,
  size,
  accent,
  className,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const ref = useRef<HTMLButtonElement>(null);
  useGravity(ref);

  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      className={cn(
        'btn',
        size != null ? SIZE_CLASS[size] : undefined,
        accent != null ? `btn--accent btn--accent-${accent}` : undefined,
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

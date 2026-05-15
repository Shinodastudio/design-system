'use client';

import { useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';
import { BUTTON_SIZES, type ButtonSize } from './Button.constants';

export { BUTTON_SIZES, type ButtonSize };

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  readonly asChild?: boolean;
  /**
   * Size variant — overrides the default 1.5rem (lg) base.
   * Each step matches a heading tier and applies the corresponding tracking.
   */
  readonly size?: ButtonSize;
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  'xs':  'btn-size-xs',
  'sm':  'btn-size-sm',
  'md':  'btn-size-md',
  'lg':  'btn-size-lg',
  'xl':  'btn-size-xl',
  '2xl': 'btn-size-2xl',
};

export function Button({
  asChild = false,
  size,
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
      className={cn('btn', size != null ? SIZE_CLASS[size] : undefined, className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

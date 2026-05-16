'use client';

import { forwardRef, useRef } from 'react';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';

type CheckboxProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn('checkbox', className)}
        {...props}
      />
    );
  },
);

type RadioProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        type="radio"
        className={cn('radio', className)}
        {...props}
      />
    );
  },
);

interface ChoiceProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function Choice({ children, className }: ChoiceProps): React.ReactElement {
  const ref = useRef<HTMLLabelElement>(null);
  useGravity(ref as React.RefObject<HTMLElement | null>);

  return (
    <label ref={ref} className={cn('choice', className)} data-cursor="btn">
      {children}
    </label>
  );
}

interface ChoiceLabelProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function ChoiceLabel({ children, className }: ChoiceLabelProps): React.ReactElement {
  return <span className={cn('choice-label', className)}>{children}</span>;
}

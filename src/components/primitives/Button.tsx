'use client';

import { useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  readonly asChild?: boolean;
}

export function Button({ asChild = false, className, children, ...props }: ButtonProps): React.ReactElement {
  const ref = useRef<HTMLButtonElement>(null);
  useGravity(ref);

  const Comp = asChild ? Slot : 'button';
  return (
    <Comp ref={ref} className={cn('btn', className)} {...props}>
      {children}
    </Comp>
  );
}

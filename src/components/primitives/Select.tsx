import { forwardRef, useCallback, useRef } from 'react';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';

interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
  readonly hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, hasError = false, children, ...props }, ref) {
    const localRef = useRef<HTMLSelectElement>(null);
    useGravity(localRef as React.RefObject<HTMLElement | null>);

    const mergedRef = useCallback(
      (node: HTMLSelectElement | null) => {
        (localRef as React.MutableRefObject<HTMLSelectElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref != null) (ref as React.MutableRefObject<HTMLSelectElement | null>).current = node;
      },
      [ref],
    );

    return (
      <div className="select">
        <select
          ref={mergedRef}
          className={cn('select-native', hasError && 'is-error', className)}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  },
);

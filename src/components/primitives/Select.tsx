import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
  readonly hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, hasError = false, children, ...props }, ref) {
    return (
      <div className="select">
        <select
          ref={ref}
          className={cn('select-native', hasError && 'is-error', className)}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  },
);

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  readonly hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, hasError = false, type = 'text', ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        className={cn('input', hasError && 'is-error', className)}
        {...props}
      />
    );
  },
);

interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'> {
  readonly hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, hasError = false, rows = 4, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn('textarea', hasError && 'is-error', className)}
        {...props}
      />
    );
  },
);

interface InputLabelProps extends React.ComponentPropsWithoutRef<'label'> {
  readonly children: React.ReactNode;
}

export function InputLabel({ className, children, ...props }: InputLabelProps): React.ReactElement {
  return (
    <label className={cn('input-label', className)} {...props}>
      {children}
    </label>
  );
}

interface InputHelpProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function InputHelp({ children, className }: InputHelpProps): React.ReactElement {
  return <p className={cn('input-help', className)}>{children}</p>;
}

interface InputErrorProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function InputError({ children, className }: InputErrorProps): React.ReactElement {
  return (
    <p className={cn('input-error', className)} role="alert">
      {children}
    </p>
  );
}

interface InputFieldProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

export function InputField({ children, className, style }: InputFieldProps): React.ReactElement {
  return (
    <div className={cn(className)} style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {children}
    </div>
  );
}

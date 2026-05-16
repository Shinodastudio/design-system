import { cn } from '@/lib/cn';

export type ProgressSize = 'sm' | 'md';

interface ProgressProps {
  readonly value: number;
  readonly size?: ProgressSize;
  readonly label?: string;
  readonly className?: string;
}

export function Progress({
  value,
  size = 'md',
  label,
  className,
}: ProgressProps): React.ReactElement {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('progress', `progress-${size}`, className)}>
      {label != null && (
        <div className="progress-label">
          <span>{label}</span>
          <span className="progress-value">{clamped}%</span>
        </div>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="progress-fill"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

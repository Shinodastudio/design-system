import { cn } from '@/lib/cn';

interface SkeletonProps {
  readonly width?: string | number;
  readonly height?: string | number;
  readonly className?: string;
}

export function Skeleton({
  width,
  height,
  className,
}: SkeletonProps): React.ReactElement {
  const style: React.CSSProperties = {};
  if (width != null) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height != null) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn('skeleton', className)}
      style={style}
      aria-hidden="true"
    />
  );
}

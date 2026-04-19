import { cn } from '@/lib/cn';
import type { TypeVariant, OpacityLevel } from '@/lib/tokens';

type TextTag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'time' | 'cite' | 'div';

interface TextProps {
  readonly variant?: TypeVariant;
  readonly opacity?: OpacityLevel;
  readonly as?: TextTag;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}

const OPACITY_CLASS: Record<OpacityLevel, string> = {
  80: 'op-80',
  60: 'op-60',
  40: 'op-40',
  20: 'op-20',
};

function defaultTag(variant: TypeVariant): TextTag {
  if (variant === 'heading-xl') return 'h1';
  if (variant === 'heading-lg') return 'h2';
  if (variant === 'heading-md') return 'h3';
  if (variant === 'heading-sm') return 'h4';
  if (variant === 'heading-xs') return 'h5';
  if (variant === 'heading-2xs') return 'h6';
  if (variant.startsWith('subheading')) return 'p';
  return 'p';
}

export function Text({
  variant = 'heading-md',
  opacity,
  as,
  className,
  style,
  children,
}: TextProps): React.ReactElement {
  const Tag = as ?? defaultTag(variant);
  return (
    <Tag className={cn(variant, opacity != null ? OPACITY_CLASS[opacity] : undefined, className)} style={style}>
      {children}
    </Tag>
  );
}

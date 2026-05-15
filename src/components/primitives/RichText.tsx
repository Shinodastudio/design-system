import { cn } from '@/lib/cn';

export const RICH_TEXT_SIZES = ['sm', 'md', 'lg'] as const;
export type RichTextSize = typeof RICH_TEXT_SIZES[number];

interface RichTextProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  /**
   * Size variant — sm | md (default) | lg.
   * Scales the entire flow proportionally; child elements inherit via em.
   */
  readonly size?: RichTextSize;
}

const SIZE_CLASS: Record<RichTextSize, string> = {
  sm: 'rich-text-sm',
  md: 'rich-text-md',
  lg: 'rich-text-lg',
};

export function RichText({ children, className, size = 'md' }: RichTextProps): React.ReactElement {
  return <div className={cn('rich-text', SIZE_CLASS[size], className)}>{children}</div>;
}

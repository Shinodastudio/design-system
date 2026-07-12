import { cn } from '@/lib/cn';
import { ICONS_BY_ID, type IconRecord } from './data/icons.generated';

export type IconSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'em';

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'dangerouslySetInnerHTML'> {
  readonly name: string;
  readonly size?: IconSize;
  readonly className?: string;
  readonly title?: string;
}

const SIZE_CLASS: Record<IconSize, string> = {
  '2xs': 'icon-2xs',
  xs:    'icon-xs',
  sm:    'icon-sm',
  md:    'icon-md',
  lg:    'icon-lg',
  xl:    'icon-xl',
  em:    'icon-em',
};

/**
 * Inline SVG icon from the Shinoda icon set.
 * `name` matches the source filename minus `.svg` (e.g. "arrow-right").
 */
export function Icon({
  name,
  size = 'md',
  className,
  title,
  ...props
}: IconProps): React.ReactElement | null {
  const record = ICONS_BY_ID.get(name);
  if (record === undefined) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`<Icon name="${name}"> — no icon with that id`);
    }
    return null;
  }
  return (
    <svg
      viewBox={record.viewBox}
      fill="currentColor"
      aria-hidden={title === undefined ? true : undefined}
      role={title === undefined ? undefined : 'img'}
      focusable="false"
      className={cn('icon', SIZE_CLASS[size], className)}
      dangerouslySetInnerHTML={{
        __html: title === undefined ? record.body : `<title>${title}</title>${record.body}`,
      }}
      {...props}
    />
  );
}

export type { IconRecord };

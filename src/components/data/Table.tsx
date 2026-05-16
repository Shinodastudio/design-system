import { cn } from '@/lib/cn';

interface TableProps {
  readonly children: React.ReactNode;
  readonly stickyHeader?: boolean;
  readonly className?: string;
}

export function Table({ children, stickyHeader = false, className }: TableProps): React.ReactElement {
  return (
    <div className={cn('table-wrapper', className)}>
      <table className={cn('table', stickyHeader && 'table-sticky-header')}>
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function TableHeader({ children, className }: TableHeaderProps): React.ReactElement {
  return <thead className={cn('table-header', className)}>{children}</thead>;
}

interface TableBodyProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function TableBody({ children, className }: TableBodyProps): React.ReactElement {
  return <tbody className={cn('table-body', className)}>{children}</tbody>;
}

interface TableFooterProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function TableFooter({ children, className }: TableFooterProps): React.ReactElement {
  return <tfoot className={cn('table-footer', className)}>{children}</tfoot>;
}

interface TableRowProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function TableRow({ children, className }: TableRowProps): React.ReactElement {
  return <tr className={cn('table-row', className)}>{children}</tr>;
}

interface TableHeadProps {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly colSpan?: number;
  readonly scope?: string;
}

export function TableHead({ children, className, colSpan, scope = 'col' }: TableHeadProps): React.ReactElement {
  return (
    <th
      className={cn('table-head', className)}
      colSpan={colSpan}
      scope={scope}
    >
      {children}
    </th>
  );
}

interface TableCellProps {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly colSpan?: number;
  readonly onClick?: () => void;
}

export function TableCell({ children, className, colSpan, onClick }: TableCellProps): React.ReactElement {
  return (
    <td className={cn('table-cell', className)} colSpan={colSpan} onClick={onClick}>
      {children}
    </td>
  );
}

interface TableCaptionProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function TableCaption({ children, className }: TableCaptionProps): React.ReactElement {
  return <caption className={cn('table-caption', className)}>{children}</caption>;
}

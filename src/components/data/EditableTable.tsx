'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';

export interface EditableColumn {
  readonly key: string;
  readonly header: string;
  readonly editable?: boolean;
  readonly type?: 'text' | 'number' | 'select';
  readonly options?: readonly string[];
}

interface EditableTableProps {
  readonly columns: readonly EditableColumn[];
  readonly data: readonly Record<string, unknown>[];
  readonly onCellChange?: (rowIndex: number, key: string, value: string) => void;
  readonly stickyHeader?: boolean;
  readonly className?: string;
}

interface ActiveCell {
  readonly row: number;
  readonly col: string;
}

function getCellStringValue(val: unknown): string {
  if (val == null) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  return String(val);
}

export function EditableTable({
  columns,
  data,
  onCellChange,
  stickyHeader,
  className,
}: EditableTableProps): React.ReactElement {
  const [activeCell, setActiveCell] = useState<ActiveCell | null>(null);

  const handleCellActivate = (row: number, col: string) => {
    setActiveCell({ row, col });
  };

  const handleCellBlur = () => {
    setActiveCell(null);
  };

  const handleChange = (rowIndex: number, key: string, value: string) => {
    onCellChange?.(rowIndex, key, value);
  };

  return (
    <Table stickyHeader={stickyHeader} className={cn('editable-table', className)}>
      <TableHeader>
        <TableRow>
          {columns.map(col => (
            <TableHead key={col.key}>{col.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map(col => {
              const isActive =
                activeCell?.row === rowIndex && activeCell?.col === col.key;
              const rawValue = row[col.key];
              const strValue = getCellStringValue(rawValue);

              if (col.editable === true && isActive) {
                if (col.type === 'select' && col.options != null) {
                  return (
                    <TableCell key={col.key} className="editable-cell editable-cell-active">
                      <div className="select">
                        <select
                          className="select-native editable-cell-input"
                          autoFocus
                          value={strValue}
                          onChange={e => handleChange(rowIndex, col.key, e.target.value)}
                          onBlur={handleCellBlur}
                        >
                          {col.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={col.key} className="editable-cell editable-cell-active">
                    <input
                      className="editable-cell-input"
                      type={col.type ?? 'text'}
                      autoFocus
                      defaultValue={strValue}
                      onChange={e => handleChange(rowIndex, col.key, e.target.value)}
                      onBlur={handleCellBlur}
                    />
                  </TableCell>
                );
              }

              return (
                <TableCell
                  key={col.key}
                  className={cn('editable-cell', col.editable === true && 'editable-cell-clickable')}
                  onClick={col.editable === true ? () => handleCellActivate(rowIndex, col.key) : undefined}
                >
                  {strValue}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

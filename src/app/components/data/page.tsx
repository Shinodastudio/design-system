'use client';

import { useState } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/data/Table';
import { EditableTable } from '@/components/data/EditableTable';
import type { EditableColumn } from '@/components/data/EditableTable';

const SIZES = ['default'] as const;

const STATIC_ROWS = [
  { token: '--space-1', value: '4px', usage: 'Icon gap, tight inline spacing' },
  { token: '--space-4', value: '16px', usage: 'Standard block padding' },
  { token: '--space-8', value: '32px', usage: 'Section spacing' },
  { token: '--space-12', value: '48px', usage: 'Large layout gaps' },
] as const;

const EDITABLE_COLUMNS: readonly EditableColumn[] = [
  { key: 'name', header: 'Name', editable: true, type: 'text' },
  { key: 'role', header: 'Role', editable: true, type: 'select', options: ['Designer', 'Engineer', 'PM'] },
  { key: 'status', header: 'Status', editable: false },
] as const;

type TableRow = {
  name: string;
  role: string;
  status: string;
};

const INITIAL_DATA: readonly TableRow[] = [
  { name: 'Leon Brown', role: 'Designer', status: 'Active' },
  { name: 'Mei Nakamura', role: 'Engineer', status: 'Active' },
  { name: 'Aditi Rao', role: 'PM', status: 'Away' },
];

export default function DataPage(): React.ReactElement {
  const [tableData, setTableData] = useState<readonly TableRow[]>(INITIAL_DATA);

  const handleCellChange = (rowIndex: number, key: string, value: string): void => {
    setTableData(prev =>
      prev.map((row, i) => (i === rowIndex ? { ...row, [key]: value } : row)),
    );
  };

  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Data"
            description="Structured data tables — read-only and inline-editable variants."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="Table"
            description="Read-only data table with semantic markup. Caption optional."
            code={`<Table>\n  <TableCaption>Design tokens</TableCaption>\n  <TableHeader>…</TableHeader>\n  <TableBody>…</TableBody>\n</Table>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <Table>
                <TableCaption>Spacing token reference</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {STATIC_ROWS.map(row => (
                    <TableRow key={row.token}>
                      <TableCell>
                        <code>{row.token}</code>
                      </TableCell>
                      <TableCell>{row.value}</TableCell>
                      <TableCell className="op-60">{row.usage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          />

          <ComponentSection
            name="EditableTable"
            description="Click any editable cell to activate an input or select inline. Changes surface via onCellChange."
            code={`<EditableTable\n  columns={columns}\n  data={data}\n  onCellChange={(row, key, val) => update(row, key, val)}\n/>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <EditableTable
                columns={EDITABLE_COLUMNS}
                data={tableData as readonly Record<string, unknown>[]}
                onCellChange={handleCellChange}
              />
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}

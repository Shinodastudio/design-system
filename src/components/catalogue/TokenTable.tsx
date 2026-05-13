interface TokenRow {
  readonly name: string;
  readonly value: string;
  readonly preview?: React.ReactNode;
}

interface TokenTableProps {
  readonly rows: readonly TokenRow[];
}

export function TokenTable({ rows }: TokenTableProps): React.ReactElement {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.name}
            style={{
              borderBottom: '1px solid var(--color-transparent-weak)',
            }}
          >
            <td
              className="body-sm"
              style={{ padding: 'var(--space-3) 0', width: '40%' }}
            >
              {row.name}
            </td>
            <td
              className="body-sm op-60"
              style={{ padding: 'var(--space-3) 0', width: '40%' }}
            >
              {row.value}
            </td>
            {row.preview != null && (
              <td
                style={{ padding: 'var(--space-3) 0', width: '20%' }}
              >
                {row.preview}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

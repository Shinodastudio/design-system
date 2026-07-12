interface CodeBlockProps {
  readonly code: string;
}

export function CodeBlock({ code }: CodeBlockProps): React.ReactElement {
  return (
    <pre
      className="body-xs op-60"
      style={{
        marginTop: 'var(--space-4)',
        padding: 'var(--space-4)',
        backgroundColor: 'var(--color-fill-secondary)',
        border: 'none',
        borderRadius: 0,
        overflowX: 'auto',
        whiteSpace: 'pre',
      }}
    >
      <code>{code}</code>
    </pre>
  );
}

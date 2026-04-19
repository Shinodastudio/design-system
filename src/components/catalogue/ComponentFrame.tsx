import { Divider } from '@/components/primitives/Divider';
import { CodeBlock } from './CodeBlock';

interface ComponentFrameProps {
  readonly title: string;
  readonly description?: string;
  readonly children: React.ReactNode;
  readonly code?: string;
}

export function ComponentFrame({ title, description, children, code }: ComponentFrameProps): React.ReactElement {
  return (
    <section>
      <Divider />
      <div style={{ paddingBlock: 'var(--space-8)' }}>
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <p className="heading-xs">{title}</p>
          {description && (
            <p className="body-md op-60" style={{ marginTop: 'var(--space-2)' }}>
              {description}
            </p>
          )}
        </div>
        <div
          style={{
            padding: 'var(--space-12)',
            backgroundColor: 'var(--color-fill-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '120px',
          }}
        >
          {children}
        </div>
        {code && <CodeBlock code={code} />}
      </div>
    </section>
  );
}

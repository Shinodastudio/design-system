import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { CollapsibleCode } from '@/components/content/CollapsibleCode';

/**
 * Implementation — prompt and skill files used to operate the Shinoda system
 * inside agentic coding environments. Each document is copied verbatim from
 * the canonical source on disk into `src/content/implementation/` and is
 * intended to be copy-pasted into a new project's `.claude/` directory.
 *
 * Source of truth lives outside the repo at
 *   /Users/leon/Documents/Studio Guidelines/Design System/Claude/
 * and is mirrored here manually when the design system updates. No
 * automation — disk is canonical.
 */

interface ImplementationDoc {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly filename: string;
  readonly language: string;
}

const DOCS: readonly ImplementationDoc[] = [
  {
    slug: 'shinoda-skill',
    title: 'Design system reference',
    description: 'The full v3 spec — opacity scale, type scale, layout, cursor, buttons, links, refusal list. Drop into a project as the single design source of truth.',
    filename: 'shinoda-skill.md',
    language: 'markdown',
  },
  {
    slug: 'shinoda-design-system-skill',
    title: 'Claude Code skill',
    description: 'The same spec wrapped as a Claude Code skill — front-matter, voice guidance, component checklist. Loads before any UI work in agent-driven sessions.',
    filename: 'shinoda-design-system-skill.md',
    language: 'markdown',
  },
];

function readDoc(filename: string): string {
  const path = join(process.cwd(), 'src', 'content', 'implementation', filename);
  return readFileSync(path, 'utf8');
}

export default function ImplementationPage(): React.ReactElement {
  const docs = DOCS.map((doc) => ({ ...doc, body: readDoc(doc.filename) }));

  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Implementation"
            description="Prompts and skill files for operating the system inside agentic coding environments."
          />
        </StickyCol>
        <div>
          <Text variant="body-sm" opacity={40} as="p" style={{ paddingBottom: 'var(--space-6)' }}>
            Each block is a verbatim copy of the canonical document on disk. The system itself lives outside this site; this page is a mirror for reading and copying. Update by replacing the source files in <code>src/content/implementation/</code>.
          </Text>

          {docs.map((doc, index) => (
            <section key={doc.slug}>
              {index > 0 && <Divider />}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  paddingBlock: 'var(--space-12)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <Text variant="heading-md" as="h2">{doc.title}</Text>
                  <Text variant="heading-md" opacity={40} as="p">{doc.description}</Text>
                  <Text variant="body-xs" opacity={40} as="p" style={{ fontFamily: 'var(--font-mono)' }}>
                    {doc.filename}
                  </Text>
                </div>
                <CollapsibleCode code={doc.body} language={doc.language} />
              </div>
            </section>
          ))}
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

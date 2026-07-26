#!/usr/bin/env bun
/**
 * generate-search-index.ts
 *
 * Scans every `/components/[slug]/page.tsx` catalogue route for
 * `<ComponentSection name="...">` usages and emits a flat generated index
 * of { section name -> anchor href } so the Command palette can surface
 * content nested *inside* a page (e.g. searching "blur" finds the
 * "Progressive Blur" section on the Overlay page), not just top-level
 * pages.
 *
 * The anchor id must match ComponentSection's own `id={slugify(name)}`
 * exactly (see src/lib/slugify.ts's doc comment) — this script imports the
 * same slugify() so the two can never drift apart.
 *
 * Run via `bun run search-index:generate`.
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { slugify } from '../src/lib/slugify';
import { componentLabel } from '../src/components/nav/navItems';

const ROOT = join(import.meta.dir, '..');
const COMPONENTS_DIR = join(ROOT, 'src', 'app', 'components');
const OUTPUT_FILE = join(ROOT, 'src', 'components', 'nav', 'data', 'searchIndex.generated.ts');

// Matches the opening tag of a <ComponentSection ... name="..."> usage.
// `name` is always the first prop by convention across the catalogue pages
// (see ComponentSection.tsx's own doc comment for the anatomy) — anchored
// directly after the tag so an unrelated `name="..."` on some other nested
// element can never be picked up instead.
const SECTION_NAME_PATTERN = /<ComponentSection\s+name="([^"]+)"/g;

export interface SearchIndexEntry {
  readonly label: string;
  readonly pageLabel: string;
  readonly pageHref: string;
  readonly anchorId: string;
  readonly href: string;
}

function findSectionNames(source: string): readonly string[] {
  return [...source.matchAll(SECTION_NAME_PATTERN)].map((m) => m[1]);
}

function main(): void {
  const slugs = readdirSync(COMPONENTS_DIR).filter((name) =>
    statSync(join(COMPONENTS_DIR, name)).isDirectory(),
  );

  const entries: SearchIndexEntry[] = [];
  for (const slug of slugs.sort()) {
    const pagePath = join(COMPONENTS_DIR, slug, 'page.tsx');
    let source: string;
    try {
      source = readFileSync(pagePath, 'utf8');
    } catch {
      continue; // no page.tsx at this level — skip
    }

    const pageHref = `/components/${slug}`;
    const pageLabel = componentLabel(slug);

    for (const name of findSectionNames(source)) {
      const anchorId = slugify(name);
      entries.push({
        label: name,
        pageLabel,
        pageHref,
        anchorId,
        href: `${pageHref}#${anchorId}`,
      });
    }
  }

  const header = `/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: /src/app/components/<slug>/page.tsx (<ComponentSection name="..."> usages)
 * Run \`bun run search-index:generate\` to refresh.
 * ${entries.length} sections across ${new Set(entries.map((e) => e.pageHref)).size} pages.
 */

export interface SearchIndexEntry {
  readonly label: string;
  readonly pageLabel: string;
  readonly pageHref: string;
  readonly anchorId: string;
  readonly href: string;
}

export const SEARCH_INDEX: readonly SearchIndexEntry[] = [
`;

  const body = entries
    .map(
      (e) =>
        `  { label: ${JSON.stringify(e.label)}, pageLabel: ${JSON.stringify(e.pageLabel)}, pageHref: ${JSON.stringify(e.pageHref)}, anchorId: ${JSON.stringify(e.anchorId)}, href: ${JSON.stringify(e.href)} },`,
    )
    .join('\n');

  const footer = '\n];\n';

  writeFileSync(OUTPUT_FILE, header + body + footer, 'utf8');
  console.log(`Wrote ${entries.length} search-index entries (${slugs.length} component pages scanned) to ${OUTPUT_FILE}`);
}

main();

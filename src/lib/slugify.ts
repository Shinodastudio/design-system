/**
 * Turns a human-readable label into a URL/DOM-id-safe slug.
 * "Dialog — bottom drawer" -> "dialog-bottom-drawer"
 *
 * Shared between runtime (ComponentSection's anchor id) and the build-time
 * search-index generator (scripts/generate-search-index.ts) — both must
 * agree on the same slug for a given name, or deep-search links would point
 * at an id that doesn't exist on the page.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

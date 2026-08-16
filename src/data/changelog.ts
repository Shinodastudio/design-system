export type ChangelogType =
  | 'Feature'
  | 'Improvement'
  | 'Fix'
  | 'Docs'
  | 'Sync'
  | 'Infrastructure';

export interface ChangelogEntry {
  readonly title: string;
  readonly type: ChangelogType;
  /** ISO date (YYYY-MM-DD). */
  readonly date: string;
  readonly version?: string;
  readonly changes: readonly string[];
}

/**
 * Static snapshot of the Shinoda design system Changelog, sourced from the
 * live Notion database (collection 05b8938e-42b7-456f-ac67-7b46d87276d4).
 *
 * This is a point-in-time copy, not a live integration — the app has no
 * Notion dependency, API key, or env var, consistent with "don't add
 * dependencies without flagging first". Update by re-fetching the database
 * and pasting new/changed entries in, newest first.
 */
export const CHANGELOG: readonly ChangelogEntry[] = [
  {
    title: 'Calendar rebuilt: range picking, media grid, cursor image preview',
    type: 'Feature',
    date: '2026-08-17',
    changes: [
      'CalendarPicker replaced by Calendar, built on a new headless useCalendar hook: view state with day \u2192 month \u2192 year drill-down, a fixed six-row grid, single and range selection, min/max bounds, and full keyboard navigation. The old name stays exported as a deprecated alias, so nothing consuming it breaks',
      'Range mode: the first click sets the start, hovering previews the band, the second completes it and corrects the order if you picked backwards. The fields render DATE > DATE side by side as an unconditional flex row \u2014 the layout used to be a grid whose column track the range modifier had to rewrite, which meant a single missing rule stacked the fields vertically. A layout that only works when every rule lands isn\u2019t a layout',
      'New MediaCalendar \u2014 a photo-journal grid built on Calendar\u2019s renderDay slot, so keyboard navigation and selection semantics are identical to the picker. Days with an entry are circular thumbnails, empty days a dashed ring; the number is revealed as the thumbnail fades on hover. Days from the adjacent months render at 20% like every other calendar, with the ring taken to full opacity inside the dimmed cell so the compound lands on exactly 20% rather than 8% \u2014 nested opacity multiplies, and 40% inside 20% would have disappeared',
      'Cursor gains an image-preview state: data-cursor-preview="/path.jpg" on any element swells the dot into a 7.5rem circular preview of that image, sized by --cursor-preview-size. The difference blend comes off in this state so the photograph reads true rather than inverted',
      'DateInput rebuilt to compose Input\u2019s behaviour rather than restate it \u2014 same underline treatment at rest, hover, focus and disabled, plus float label, borderless variant and forwardRef. Gravity is anchored to the wrapper rather than the field so the trigger and the field stay aligned under the pull. The trailing button or Down arrow opens the popover, Escape closes it and returns focus, blur parses and validates',
      'Date parsing (src/lib/date.ts) accepts DD MMM YYYY, DD/MM/YYYY and DD-M-YYYY, and rejects overflow \u2014 31 Feb fails rather than silently rolling into March. The helpers, MONTH_LABELS_SHORT and useCalendar are all exported from the package for consumers building their own calendar surfaces',
      'Accessibility pass: real role="row" wrappers with columnheader weekday labels, roving tabindex so exactly one cell is tabbable per calendar, Arrow/Home/End/PageUp/PageDown navigation with Shift for years, live-region announcements on month change, day names carrying the full date plus a photo indicator, and errors with role="alert". Abbreviations are visual only \u2014 "Monday, 27 July 2026" is what gets announced',
      'Added useGravityWithin(containerRef, selector): one delegated listener drives whichever cell the cursor is over, instead of 42 cells each registering their own document listener. Tuned tighter than standalone gravity (0.14 strength, 3px cap) because cells sit shoulder to shoulder and only the one under the cursor should move',
      'Grid structure corrected so rows are real boxes: .calendar-grid is a flex column and each .calendar-row its own seven-column grid. It was previously one 42-cell grid with display: contents on the ARIA row wrappers, which hung the entire layout on a single declaration \u2014 when the CSS chunk lagged the markup over HMR, the row wrappers became grid items and the weekday header collapsed into column one',
      'Today is now a solid --accent-red fill rather than a dot in the picker. In the media grid the mark moves to the ring instead \u2014 a red disc on empty days, a red outline around the photograph on filled ones, since a cell fill would sit buried under the thumbnail',
      'The month label defaults to the short form ("Aug") so the header stops breathing as you page through months; monthLabelFormat="long" restores the full name for editorial contexts. The aria-label and the announcements use the full month either way',
      'Catalogue: the form-field size chips moved to a shared inputSizes.ts used by both the Input and Calendar pages, and the Cursor page now documents the preview state',
    ],
  },
  {
    title: 'Crawler exclusion, favicon set, footer/nav rebuild, responsive fixes',
    type: 'Improvement',
    date: '2026-08-02',
    changes: [
      'Search engines and AI scrapers now excluded at three layers: a blanket Disallow in src/app/robots.ts, `robots`/`referrer` metadata in the root layout, and an X-Robots-Tag HTTP header applied to every route in next.config.ts \u2014 the header matters because \u003cmeta name="robots"\u003e only reaches crawlers that parse HTML, while the header reaches anything that issues a request, assets included. Referrer-Policy: no-referrer and X-Content-Type-Options: nosniff ride along',
      'Added a favicon set \u2014 multi-resolution favicon.ico plus icon.png and apple-icon.png in src/app/',
      'Footer rebuilt to shinoda.studio parity: divider above, --padding-section-sm clearance top and bottom, everything at heading-md, 40% opacity lifting to 100% on hover. Opacity is applied per leaf rather than on containers \u2014 nested opacity compounds silently (40% on 40% is 16%), which would land off the system scale',
      'Breadcrumb is now a clickable trail rather than static text: getBreadcrumbSegments() returns { label, href } pairs, always opening with "Design System" \u2192 /, with aria-current="page" on the final crumb',
      'Nav stripped back to a single search icon at heading-md \u2014 wordmark and theme toggle removed (the breadcrumb is the home route now, the toggle lives in the footer). The nav is no longer hidden below 767px: a nine-item link strip needed collapsing, one icon does not, so search now sits in the same top-right slot at every width',
      'One footer at every breakpoint instead of a separate mobile list. The vertical NAV_ITEMS list is gone \u2014 the command palette does that job. Stack-to-row switches at 992px rather than 768: the row technically fits at tablet, but the attribution wrapped mid-phrase. Above that the breadcrumb is the half that gives, pinned by flex-shrink: 0 on the meta cluster, because a breadcrumb breaking at a slash is a legible seam and a sentence breaking at a middot is not',
      'Fixed the changelog drawer occasionally opening offset upward by exactly the scroll distance: position: fixed was only reaching the \u003cdialog\u003e through the UA stylesheet\u2019s dialog:modal rule, which depends on top-layer promotion having landed in style resolution \u2014 the same frame showModal() is called in the mount effect. .dialog now states position/inset/height itself. The drawer\u2019s 100vw/100vh also became 100%: vw includes the scrollbar gutter, and vh resolves to the large viewport',
      'Mobile two-column pages: .grid-2col gains a --padding-section-lg row gap when stacked (the horizontal gutter was doing that work implicitly, so stacked columns ran straight into each other), and .col-sticky\u2019s 8em right padding now zeroes out \u2014 it was eating 192px of a 342px line',
    ],
  },
  {
    title: 'Content peel effect, homepage gallery cleanup, dialog dark-mode contrast fixes',
    type: 'Fix',
    date: '2026-07-26',
    version: 'v0.2.1',
    changes: [
      'Reworked the scroll-velocity peel effect: it was bending the nav\u2019s .progressive-blur strip itself, which read as broken/invisible in normal use. New ContentPeel component + useContentPeel hook instead pinch the top-left/top-right corners of the page content underneath as the page scrolls fast, easing back to flat at rest; the nav and its blur strip are no longer touched at all',
      'Homepage gallery finalised: replaced the interactive colour-chip and icon-grid panels with static, theme-mapped design comp images (HomeGalleryPanel, CSS-only light/dark swap, no JS, no links); removed the third panel (its source image was an unrelated screenshot) and deleted its now-unused assets',
      'Fixed dialog text silently rendering black in dark mode: native <dialog> elements don\u2019t inherit `color` from the page (Chromium\u2019s UA stylesheet sets CanvasText, not `inherit`), so any text inside a dialog without its own explicit colour \u2014 e.g. the changelog entry date \u2014 ignored the site theme entirely. .dialog now asserts `color: var(--color-text-primary)`',
      'Fixed --color-text-tertiary in dark mode: was #494951 (grey-40), only ~2:1 contrast against --color-fill-base and effectively unreadable; corrected to #7A7A82 (grey-50), ~4:1, matching the legibility light mode\u2019s tertiary already had',
    ],
  },
  {
    title: 'Icon system overhaul, command palette rebuild, changelog + dialog polish',
    type: 'Feature',
    date: '2026-07-12',
    version: 'v0.2.0',
    changes: [
      'Replaced 1512 Phosphor icons with 2018 Micro Solid glyphs across the app; per-icon viewBox capture in codegen, proportional 15% padding compensation on buttons/links/alerts/tooltips/chips',
      'Added an 8-step shadow scale (--shadow-none → --shadow-2xl) with .shadow-* utilities, sourced directly from Figma',
      'Global bare-tag typography defaults added for h1–h6/p/strong/em/blockquote/code/pre; .rich-text now layers a colour hierarchy on top — titles stay full-strength, body copy drops to --color-text-secondary, and prose links match the PlainLink component (border-bottom underline, 20% → 100% opacity on hover)',
      'Command palette (⌘K) rebuilt: persistent back-button header replaces breadcrumbs, groups separated by spacing only (no dividers), deep-search flattened across all component slugs, smoother scrim + card open animation, gravity removed from individual menu item rows',
      'Command primitive (/components/controls) brought in line with the palette: dropped CommandSeparator, added CommandHeader, groups now spacing-only',
      'New ChangelogDialog drawer backed by a static Notion snapshot (src/data/changelog.ts), with an 8-unit gap between entries and a 4-unit gap between title and body',
      'Footer bar rebuilt: left-aligned breadcrumb, "Made by Shinoda" / year / changelog trigger on the right, transparent background, width now matches nav and main exactly',
      'Collapsible code blocks now do a true max-height collapse/expand with icon-only controls and a hover-only background tint',
      'Dialog fixes: cursor now portals into the open <dialog> via a new dialogStack.ts (was rendering underneath the scrim); removed fill-mode: both from the slide/card/drawer keyframes, fixing a fixed-positioning bug after the animation completed',
      'Button spec corrected back to 10% hover fill / 0.80 active opacity (had drifted to 20%/0.40) and 0.1875em inset padding; both shinoda-SKILL.md copies updated to match',
      'Gravity system reduced 30% (radius 80 → 56, strength 0.25 → 0.175) across the React hook and the vanilla shinoda-interactions.js mirror, which had drifted out of sync',
      'Select and all multi-size components (Select, Text Link, External Link) now default to heading-md, matching catalogue convention',
    ],
  },
  {
    title: 'Package rename to @shinodastudio/ds, CI publish workflow',
    type: 'Infrastructure',
    date: '2026-07-10',
    version: 'v0.1.2',
    changes: [
      'Corrected package scope from @shinoda to @shinodastudio to match the GitHub org — any consuming project must update its .npmrc scope and install reference accordingly',
      'Publishing is now fully automated: pushing a v* git tag triggers a GitHub Actions workflow that builds the library and publishes to GitHub Packages',
      'Replaces the manual npm publish step',
    ],
  },
  {
    title: 'Webflow review: PlainLink, BackToTop, nav group-fade, radius/opacity rules',
    type: 'Feature',
    date: '2026-06-03',
    version: 'v0.1.1',
    changes: [
      'Introduced PlainLink component',
      'Introduced BackToTop component',
      'Added nav group-fade behaviour',
      'Audited and corrected radius and opacity values to system spec throughout',
    ],
  },
  {
    title: 'Focus states, nav, progressive blur, card radii, icon page UX',
    type: 'Improvement',
    date: '2026-05-21',
    changes: [
      'Standardised focus states to a 2px --color-text-primary outline at 2px offset across buttons and links (links previously had no focus ring at all)',
      'Button ::before spring-bg now activates on focus to match hover',
      'System OS dark/light preference now respected on first load via a rewritten ThemeScript that always sets data-theme, with a matchMedia listener added to useTheme for mid-session OS changes',
      'Nav hover chip corrected to inset: -3px / --alpha-10 fill (was far too wide at -0.8em); rest opacity lowered to --opacity-40 per system spec',
      'Replaced the 8-layer JS-computed progressive blur below the nav with a 3-layer CSS pseudo-element approach using overlapping gradient masks — no seams, fully reusable as .progressive-blur',
      'Moved nav backdrop-filter off .nav-inner entirely into the progressive blur element (starting at top: 0) to eliminate the hard rectangular clipping edge',
      'Component page code blocks now use CollapsibleCode instead of the ad-hoc inline <code> + copy button',
      'Icon page: removed the "Search" label, replaced the size picker with Tabs, moved it above the icon grid',
      'Back arrow on catalogue pages now hangs outside the text column via negative margin so titles align with body content',
      'Card radii updated to --radius-md (12px) across 17 surface/panel elements; buttons, tooltips, chips, and focus rings remain at --radius-sm (8px)',
    ],
  },
  {
    title: 'Git staging rules, cursor consistency, sync-design-system skill',
    type: 'Docs',
    date: '2026-05-10',
    changes: [
      'Replaced the sweep-all-into-commit PR rule with deliberate staging behaviour: changes are staged per logical unit, and push requires explicit instruction',
      'Corrected cursor spec in shinoda-README.md to match shinoda-SKILL.md (single .cursor element, not the old two-element dot/ring system)',
      'Removed stray "commit and push next-env.d.ts" line from Engineering Conventions',
      'Wrote the sync-design-system skill from scratch — the file had been overwritten with a duplicate of init-labs-project and the actual sync logic was absent',
    ],
  },
  {
    title: 'Added init-labs-project skill + CLAUDE.md corrections',
    type: 'Docs',
    date: '2026-04-28',
    changes: [
      'Wrote the project initialisation skill — the single entry point for every new Shinoda Labs project',
      'Covers: three-question brief, stack audit (greenfield vs existing), /system/ scaffold from canonical disk source, .claude/ setup with settings.json and project-level CLAUDE.md, Next.js App Router wiring (layout, providers, tsconfig), design system skill load, session brief output',
      'Corrected CLAUDE.md on disk: removed stale "New Genre Labs" reference (it\u2019s just Labs)',
      'Confirmed British spellings already in place',
    ],
  },
  {
    title: 'Added sync-design-system skill',
    type: 'Docs',
    date: '2026-04-28',
    changes: [
      'Drafted the maintenance skill that closes the loop on the disk → Notion mirror',
      'Manual invocation only — no hooks, no schedules',
      'Diffs each canonical file against its Notion page, asks for a one-paragraph rationale, and writes a new entry here',
      'Intentionally one-way (disk is source of truth) and intentionally manual — the act of writing the rationale is itself the point',
      'The mapping table inside the skill is where to add new files when the system grows',
    ],
  },
  {
    title: 'Full v3 sync: disk → Notion for CSS/JS, merge for SKILL.md',
    type: 'Sync',
    date: '2026-04-28',
    changes: [
      'Notion was two major versions behind on all three CSS/JS files (v2 → v3)',
      'Tokens lost the old tracking/leading naming convention in favour of explicit numeric tokens (--tracking-n040 etc.)',
      'Opacity scale formalised and canonicalised (20/40/60/80/5% only)',
      'Base lost scroll-behavior: smooth and the two-element cursor (dot + ring) in favour of the single inverted .cursor element',
      'Interactions updated to left/top positioning from transform: translate(calc()), lerp tightened from 0.12 to 0.22, chip cursor state added',
      'SKILL.md merged: kept Notion\u2019s cleaner philosophical structure and file-import section, reinstated disk\u2019s full type scale table, cursor context table, and component checklist',
      'Canonical disk backup location noted: /Users/leon/Documents/Studio Guidelines/Design System/Claude/',
    ],
  },
  {
    title: 'Restructure of source files',
    type: 'Docs',
    date: '2026-04-28',
    changes: [
      'Collapsed duplicate design-system specification out of CLAUDE.md — shinoda-SKILL.md is now the single living source for opacity scale, typography, cursor, layout, and refused patterns',
      'CLAUDE.md keeps identity, voice, and code standards, and points to SKILL for anything visual',
      'Lifted the PR format and review preferences onto a dedicated Engineering Conventions page so the parent index stays clean',
      'Removed the claude.json backup — that file is Claude Code\u2019s runtime state, not configuration, and shouldn\u2019t have been mirrored',
      'Moved the legacy Development Project Framework and website checklist pages into Archive — neither matches the current stack or philosophy',
    ],
  },
] as const;

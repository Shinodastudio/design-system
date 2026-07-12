import { MainWrapper } from '@/components/layout/MainWrapper';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CopyValue } from '@/components/catalogue/CopyValue';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

/**
 * Utility classes catalogue — May 2026 spec section 20.
 *
 * Every entry now ships with a live demo node that shows the class in action,
 * not just its name and definition. The class inventory mirrors the Webflow
 * Guidelines page from the published Webflow site.
 */

interface UtilityItem {
  readonly name: string;
  readonly value: string;
  readonly demo: React.ReactNode;
}

interface UtilityGroup {
  readonly title: string;
  readonly note: string;
  readonly items: readonly UtilityItem[];
}

/** Elevated swatch for the Shadow group — a light surface on a filled
    backdrop so the shadow reads regardless of theme. */
function ShadowSwatch({ shadowVar }: { readonly shadowVar: string }): React.ReactElement {
  return (
    <div
      style={{
        padding: 'var(--space-8)',
        backgroundColor: 'var(--color-fill-primary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-core-contrast)',
          boxShadow: `var(${shadowVar})`,
        }}
      />
    </div>
  );
}

const SHADOW_ITEMS: readonly UtilityItem[] = [
  { name: '.shadow-none', value: 'none', demo: <ShadowSwatch shadowVar="--shadow-none" /> },
  { name: '.shadow-2xs',  value: '0px 1px 0px rgba(0,0,0,0.05)', demo: <ShadowSwatch shadowVar="--shadow-2xs" /> },
  { name: '.shadow-xs',   value: '0px 1px 2px rgba(0,0,0,0.05)', demo: <ShadowSwatch shadowVar="--shadow-xs" /> },
  { name: '.shadow-sm',   value: '0px 1px 3px rgba(0,0,0,0.10), 0px 1px 2px rgba(0,0,0,0.06)', demo: <ShadowSwatch shadowVar="--shadow-sm" /> },
  { name: '.shadow-md',   value: '0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px -1px rgba(0,0,0,0.10)', demo: <ShadowSwatch shadowVar="--shadow-md" /> },
  { name: '.shadow-lg',   value: '0px 4px 6px -2px rgba(0,0,0,0.05), 0px 10px 15px -3px rgba(0,0,0,0.10)', demo: <ShadowSwatch shadowVar="--shadow-lg" /> },
  { name: '.shadow-xl',   value: '0px 10px 10px -5px rgba(0,0,0,0.04), 0px 20px 25px -5px rgba(0,0,0,0.10)', demo: <ShadowSwatch shadowVar="--shadow-xl" /> },
  { name: '.shadow-2xl',  value: '0px 25px 50px -12px rgba(0,0,0,0.25)', demo: <ShadowSwatch shadowVar="--shadow-2xl" /> },
];

const UTILITY_GROUPS: readonly UtilityGroup[] = [
  {
    title: 'Shadow',
    note: 'Elevation scale — none through 2xl. Fixed black-based values, not theme-dependent.',
    items: SHADOW_ITEMS,
  },
  {
    title: 'Opacity (content)',
    note: 'Hierarchy tool — only these four values for content. Never 30/50/70/90/10/15.',
    items: [
      { name: '.op-80', value: 'opacity: 0.80', demo: <span className="op-80 body-md">Text at 80%</span> },
      { name: '.op-60', value: 'opacity: 0.60', demo: <span className="op-60 body-md">Text at 60%</span> },
      { name: '.op-40', value: 'opacity: 0.40', demo: <span className="op-40 body-md">Text at 40%</span> },
      { name: '.op-20', value: 'opacity: 0.20', demo: <span className="op-20 body-md">Text at 20%</span> },
      // Webflow canonical alias — same opacity, different class shape.
      { name: '.opacity._40', value: 'opacity: 0.40 (Webflow alias)', demo: <span className="op-40 body-md">Webflow form</span> },
    ],
  },
  {
    title: 'Layout',
    note: 'Flex utilities, page shells, and the canonical 2-column grid.',
    items: [
      { name: '.grid-2col',       value: 'grid-template-columns: 1fr 1fr', demo: (
        <div className="grid-2col" style={{ width: '100%', maxWidth: '20em', gap: '1px', backgroundColor: 'var(--color-transparent-weak)' }}>
          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-fill-primary)' }}><span className="body-xs op-40">1fr</span></div>
          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-fill-primary)' }}><span className="body-xs op-40">1fr</span></div>
        </div>
      ) },
      { name: '.flex',            value: 'display: flex',     demo: (
        <div className="flex gap-2" style={{ padding: 'var(--space-2)', backgroundColor: 'var(--color-fill-primary)', maxWidth: '14em' }}>
          <div style={{ flex: 1, padding: 'var(--space-2)', backgroundColor: 'var(--color-fill-secondary)' }}><span className="body-xs op-40">A</span></div>
          <div style={{ flex: 1, padding: 'var(--space-2)', backgroundColor: 'var(--color-fill-secondary)' }}><span className="body-xs op-40">B</span></div>
        </div>
      ) },
      { name: '.flex-col',        value: 'flex-direction: column', demo: (
        <div className="flex flex-col gap-2" style={{ padding: 'var(--space-2)', backgroundColor: 'var(--color-fill-primary)', maxWidth: '8em' }}>
          <div style={{ padding: 'var(--space-1)', backgroundColor: 'var(--color-fill-secondary)' }}><span className="body-xs op-40">A</span></div>
          <div style={{ padding: 'var(--space-1)', backgroundColor: 'var(--color-fill-secondary)' }}><span className="body-xs op-40">B</span></div>
        </div>
      ) },
      { name: '.items-center',    value: 'align-items: center',    demo: (
        <div className="flex items-center gap-3" style={{ padding: 'var(--space-2)', backgroundColor: 'var(--color-fill-primary)' }}>
          <div style={{ height: '32px', width: '8px', backgroundColor: 'var(--color-text-primary)' }} />
          <div style={{ height: '16px', width: '8px', backgroundColor: 'var(--color-text-primary)' }} />
          <span className="body-xs op-40">centred</span>
        </div>
      ) },
      { name: '.justify-between', value: 'justify-content: space-between', demo: (
        <div className="flex justify-between" style={{ padding: 'var(--space-2)', backgroundColor: 'var(--color-fill-primary)', width: '14em' }}>
          <span className="body-xs op-40">left</span>
          <span className="body-xs op-40">right</span>
        </div>
      ) },
      { name: '.gap-4',           value: 'gap: 16px', demo: (
        <div className="flex gap-4">
          <div style={{ height: '12px', width: '12px', backgroundColor: 'var(--color-text-primary)' }} />
          <div style={{ height: '12px', width: '12px', backgroundColor: 'var(--color-text-primary)' }} />
          <div style={{ height: '12px', width: '12px', backgroundColor: 'var(--color-text-primary)' }} />
        </div>
      ) },
    ],
  },
  {
    title: 'Dividers',
    note: 'Horizontal only. 5% opacity. Never vertical.',
    items: [
      { name: '.divider', value: '1px @ 5% opacity', demo: <div style={{ width: '14em' }}><hr className="divider" /></div> },
    ],
  },
  {
    title: 'Accessibility',
    note: 'Screen-reader-only helpers.',
    items: [
      { name: '.sr-only', value: 'Visually hidden — readable by AT', demo: (
        <span className="body-xs op-40">
          (invisible content present — inspect markup)
          <span className="sr-only">Visually hidden but announced</span>
        </span>
      ) },
    ],
  },
];

export default function UtilityPage(): React.ReactElement {
  return (
    <MainWrapper>
      <div className="page-wide-intro">
        <CatalogueIntro
          title="Utility"
          description="Single-purpose classes — each shown with a live example."
        />
      </div>
      {UTILITY_GROUPS.map((group, idx) => (
        <section key={group.title} className="page-wide-section" style={idx === 0 ? { paddingBlockStart: 0 } : undefined}>
          <Text variant="heading-md" as="h2" style={{ paddingBottom: 'var(--space-2)' }}>{group.title}</Text>
          <Text variant="body-sm" opacity={40} as="p" style={{ paddingBottom: 'var(--space-6)' }}>{group.note}</Text>
          {group.items.map(({ name, value, demo }) => (
            <div key={name}>
              <Divider />
              <div className="utility-row">
                <div className="utility-row-meta">
                  <CopyValue value={name}>
                    <Text variant="body-sm" as="span">{name}</Text>
                  </CopyValue>
                  <Text variant="body-xs" opacity={40} as="span">{value}</Text>
                </div>
                <div className="utility-row-demo">{demo}</div>
              </div>
            </div>
          ))}
          <Divider />
        </section>
      ))}
    </MainWrapper>
  );
}

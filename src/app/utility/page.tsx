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

const UTILITY_GROUPS: readonly UtilityGroup[] = [
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
    title: 'Text style',
    note: 'Single-class modifiers applied to runs of type. Webflow names with `text-style-` prefix.',
    items: [
      { name: '.text-style-italic',        value: 'font-style: italic',                  demo: <span className="text-style-italic body-md">Italic emphasis</span> },
      { name: '.text-style-strikethrough', value: 'text-decoration: line-through',       demo: <span className="text-style-strikethrough body-md">Struck through</span> },
      { name: '.text-style-allcaps',       value: 'uppercase + wide tracking',           demo: <span className="text-style-allcaps body-md">All caps run</span> },
      { name: '.text-style-nowrap',        value: 'white-space: nowrap',                 demo: <span className="text-style-nowrap body-md">No wrap inside this run</span> },
      { name: '.text-style-link',          value: 'underline + offset',                  demo: <span className="text-style-link body-md">Link styled run</span> },
      { name: '.text-style-muted',         value: 'opacity: 0.40',                       demo: <span className="text-style-muted body-md">Muted secondary copy</span> },
      { name: '.text-style-2lines',        value: '-webkit-line-clamp: 2',               demo: <span className="text-style-2lines body-md" style={{ maxWidth: '20em' }}>Two-line clamp shown over a slightly longer string so the truncation becomes visible at this width.</span> },
      { name: '.text-style-3lines',        value: '-webkit-line-clamp: 3',               demo: <span className="text-style-3lines body-md" style={{ maxWidth: '20em' }}>Three-line clamp shown over a longer string that wraps to three full visual lines before truncation cuts the rest of the run.</span> },
    ],
  },
  {
    title: 'Text colour',
    note: 'Direct colour overrides — prefer opacity for hierarchy where possible.',
    items: [
      { name: '.text-color-primary',   value: 'color: text-primary',   demo: <span className="body-md" style={{ color: 'var(--color-text-primary)' }}>Primary</span> },
      { name: '.text-color-secondary', value: 'color: text-secondary', demo: <span className="body-md" style={{ color: 'var(--color-text-secondary)' }}>Secondary</span> },
      { name: '.text-color-tertiary',  value: 'color: text-tertiary',  demo: <span className="body-md" style={{ color: 'var(--color-text-tertiary)' }}>Tertiary</span> },
      { name: '.text-color-contrast',  value: 'color: text-contrast',  demo: <span className="body-md" style={{ color: 'var(--color-text-contrast)', backgroundColor: 'var(--color-grey-strong)', padding: '0.1em 0.4em', borderRadius: 'var(--radius-xs)' }}>Contrast (on dark)</span> },
      { name: '.text-color-white',     value: 'color: white',          demo: <span className="body-md" style={{ color: 'var(--color-text-contrast)', backgroundColor: 'var(--color-grey-strong)', padding: '0.1em 0.4em', borderRadius: 'var(--radius-xs)' }}>White (on dark)</span> },
    ],
  },
  {
    title: 'Text align',
    note: 'Standard alignment — left is default.',
    items: [
      { name: '.text-align-left',   value: 'text-align: left',   demo: <span className="text-align-left body-md" style={{ display: 'block', width: '12em' }}>Left aligned</span> },
      { name: '.text-align-center', value: 'text-align: center', demo: <span className="text-align-center body-md" style={{ display: 'block', width: '12em' }}>Centre aligned</span> },
      { name: '.text-align-right',  value: 'text-align: right',  demo: <span className="text-align-right body-md" style={{ display: 'block', width: '12em' }}>Right aligned</span> },
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
    title: 'Containers',
    note: 'Constrained inner widths. Use sparingly — most content sits in 1312px page container.',
    items: [
      { name: '.container-sm',  value: 'max-width: 320px',  demo: <div className="container-sm"  style={{ height: '4px', backgroundColor: 'var(--color-text-primary)', opacity: 'var(--opacity-40)' }} /> },
      { name: '.container-md',  value: 'max-width: 384px',  demo: <div className="container-md"  style={{ height: '4px', backgroundColor: 'var(--color-text-primary)', opacity: 'var(--opacity-40)' }} /> },
      { name: '.container-lg',  value: 'max-width: 512px',  demo: <div className="container-lg"  style={{ height: '4px', backgroundColor: 'var(--color-text-primary)', opacity: 'var(--opacity-40)' }} /> },
      { name: '.container-xl',  value: 'max-width: 640px',  demo: <div className="container-xl"  style={{ height: '4px', backgroundColor: 'var(--color-text-primary)', opacity: 'var(--opacity-40)' }} /> },
      { name: '.container-5xl', value: 'max-width: 1312px', demo: <div className="container-5xl" style={{ height: '4px', backgroundColor: 'var(--color-text-primary)', opacity: 'var(--opacity-40)' }} /> },
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

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { RichText, RICH_TEXT_SIZES } from '@/components/primitives/RichText';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';

const SIZE_META: Record<typeof RICH_TEXT_SIZES[number], string> = {
  sm: '1rem · 16px',
  md: '1.25rem · 20px · default',
  lg: '1.5rem · 24px',
};

export default function RichTextPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Rich Text</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Long-form text flow.<br />
            All HTML primitives styled to system.<br /><br />
            Headings cascade in size, body holds the baseline.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          <ComponentFrame
            title="Headings + paragraph flow"
            description="h1 through h6 with body copy between."
            code={`<RichText>
  <h1>Heading 1</h1>
  <p>Paragraph copy.</p>
  <h2>Heading 2</h2>
  <p>...</p>
</RichText>`}
          >
            <RichText>
              <h1>Heading 1</h1>
              <p>The grain of a system is felt in the longest paragraph, not the loudest button.</p>
              <h2>Heading 2</h2>
              <p>Tracking eases at smaller sizes. Opacity carries hierarchy where size cannot.</p>
              <h3>Heading 3</h3>
              <p>A heading is a promise made to the reader about the next thirty seconds.</p>
              <h4>Heading 4</h4>
              <h5>Heading 5</h5>
              <h6>Heading 6</h6>
            </RichText>
          </ComponentFrame>

          <ComponentFrame
            title="Lists"
            description="Unordered and ordered, with markers at tertiary opacity."
            code={`<RichText>
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
</RichText>`}
          >
            <RichText>
              <ul>
                <li>Tokens before components.</li>
                <li>Opacity before colour.</li>
                <li>Hierarchy before decoration.</li>
              </ul>
              <ol>
                <li>Define the scale.</li>
                <li>Apply it consistently.</li>
                <li>Refuse exceptions until the rule itself breaks.</li>
              </ol>
            </RichText>
          </ComponentFrame>

          <ComponentFrame
            title="Inline emphasis + links"
            description="Strong, em, links inherit colour. Underline at 20% opacity, full on hover."
            code={`<RichText>
  <p>This is <strong>strong</strong>, <em>emphasised</em>, and <a href="/">a link</a>.</p>
</RichText>`}
          >
            <RichText>
              <p>This is <strong>strong</strong>, <em>emphasised</em>, and <a href="#">a link</a> — the system holds at the smallest scale of decision.</p>
            </RichText>
          </ComponentFrame>

          <ComponentFrame
            title="Blockquote"
            description="Left rule, italic."
            code={`<RichText>
  <blockquote>To dwell is to garden.</blockquote>
</RichText>`}
          >
            <RichText>
              <blockquote>To dwell is to garden. Every line is a row that needs weeding.</blockquote>
            </RichText>
          </ComponentFrame>

          <ComponentFrame
            title="Inline code + preformatted block"
            description="Monospace, faint overlay background."
            code={`<RichText>
  <p>Inline <code>--space-4</code>.</p>
  <pre><code>const x = 1;</code></pre>
</RichText>`}
          >
            <RichText>
              <p>Use <code>--space-4</code> for default rhythm.</p>
              <pre><code>{`function rhythm(scale) {
  return scale * 4;
}`}</code></pre>
            </RichText>
          </ComponentFrame>

          <ComponentFrame
            title="Horizontal rule"
            description="5% opacity, container width."
            code={`<RichText>
  <p>Above</p>
  <hr />
  <p>Below</p>
</RichText>`}
          >
            <RichText>
              <p>One thought.</p>
              <hr />
              <p>The next thought, after a breath.</p>
            </RichText>
          </ComponentFrame>

          {/* Size variants — Webflow parity. Whole flow scales via em. */}
          <Text variant="body-md" opacity={40} as="h2" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-2)' }}>Sizes</Text>
          {RICH_TEXT_SIZES.map((size) => (
            <ComponentFrame
              key={size}
              title={`size="${size}"`}
              description={SIZE_META[size]}
              code={`<RichText size="${size}">
  <h2>Heading</h2>
  <p>Paragraph copy at this scale.</p>
</RichText>`}
            >
              <RichText size={size}>
                <h2>Heading at {size}</h2>
                <p>Paragraph copy at this scale. Lists, emphasis, links all inherit proportionally.</p>
              </RichText>
            </ComponentFrame>
          ))}
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

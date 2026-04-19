import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { ShinodaLink } from '@/components/primitives/ShinodaLink';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';

export default function LinkPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol style={{ paddingTop: 'var(--space-16)' }}>
          <Text variant="heading-xl" as="h1">Link</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Underline always present.<br />
            20% opacity at rest.<br />
            100% on hover.<br /><br />
            Gravity-pulled on proximity.<br />
            Never <code>cursor: pointer</code>.
          </Text>
        </StickyCol>
        <div style={{ paddingTop: 'var(--space-16)', paddingInline: 'var(--space-6)' }}>
          <ComponentFrame
            title="Internal link"
            description="Routes via Next.js Link. Underline at 20% opacity at rest."
            code={`<ShinodaLink href="/somewhere">Visit page</ShinodaLink>`}
          >
            <ShinodaLink href="#">Visit page</ShinodaLink>
          </ComponentFrame>

          <ComponentFrame
            title="External link"
            description="Opens in a new tab with rel='noopener noreferrer'."
            code={`<ShinodaLink href="https://example.com" external>\n  External site\n</ShinodaLink>`}
          >
            <ShinodaLink href="https://shinoda.studio" external>External site</ShinodaLink>
          </ComponentFrame>

          <ComponentFrame
            title="In running text"
            description="Links sit inline with body copy without disrupting rhythm."
            code={`<p className="body-md">Read more about the <ShinodaLink href="#">design system</ShinodaLink> principles.</p>`}
          >
            <p className="body-md">
              Read more about the <ShinodaLink href="#">design system</ShinodaLink> principles.
            </p>
          </ComponentFrame>
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

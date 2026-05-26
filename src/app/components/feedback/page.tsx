'use client';

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { Badge, type BadgeVariant } from '@/components/feedback/Badge';
import { Alert, type AlertVariant } from '@/components/feedback/Alert';
import { Progress } from '@/components/feedback/Progress';
import { Skeleton } from '@/components/feedback/Skeleton';

const BADGE_VARIANTS = ['neutral', 'red', 'orange', 'yellow', 'green', 'blue'] as const;
const ALERT_VARIANTS = ['default', 'red', 'orange', 'yellow', 'green', 'blue'] as const;
const SIZES = ['default'] as const;

export default function FeedbackPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Feedback"
            description="Status signals: badges, alerts, progress bars, and loading skeletons."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="Badge"
            description="Single canonical size — body-2xs, 10% accent tint. Six colour variants. Hover drops to 40% opacity. Focus outlines in the variant's accent colour; disabled drops the chip to 40% and removes interactivity."
            code={`<Badge variant="green">Published</Badge>\n<Badge variant="red" disabled>Archived</Badge>\n<Badge variant="blue" onClick={fn}>Clickable</Badge>`}
            sizes={BADGE_VARIANTS}
            sizeLabel={(v): string => v}
            states={['default', 'hover', 'focus', 'disabled']}
            defaultSize="neutral"
            render={({ size, state }): React.ReactNode => (
              <Badge
                variant={size as BadgeVariant}
                disabled={state === 'disabled'}
                onClick={state === 'disabled' ? undefined : (): void => {}}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Badge>
            )}
          />

          <ComponentSection
            name="Alert"
            description="Pill banner with accent fill, leading icon, title, and optional text dismiss link. Six colour variants — semantic aliases (success/warning/error/info) resolve to the matching colour."
            code={`<Alert variant="red" title="Submission failed" />\n<Alert variant="orange" title="Unsaved changes" onDismiss={fn} />\n<Alert variant="error" title="Same as 'red'" />`}
            sizes={ALERT_VARIANTS}
            sizeLabel={(v): string => v}
            states={['default']}
            defaultSize="default"
            render={({ size }): React.ReactNode => (
              <Alert
                variant={size as AlertVariant}
                title="Alert Title"
                onDismiss={(): void => {}}
              />
            )}
          />

          <ComponentSection
            name="Alert with description"
            description="Pass children to render a secondary description line beneath the title at 80% opacity."
            code={`<Alert variant="blue" title="Heads up">\n  Your session expires in 30 minutes.\n</Alert>`}
            sizes={ALERT_VARIANTS}
            sizeLabel={(v): string => v}
            states={['default']}
            defaultSize="blue"
            render={({ size }): React.ReactNode => (
              <Alert variant={size as AlertVariant} title="Heads up">
                Your session expires in 30 minutes.
              </Alert>
            )}
          />


          <ComponentSection
            name="Progress"
            description="Horizontal bar with optional label and percentage readout."
            code={`<Progress value={65} label="Uploading" />`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%' }}>
                <Progress value={25} label="Quarter" />
                <Progress value={65} label="Uploading" />
                <Progress value={100} label="Complete" />
              </div>
            )}
          />

          <ComponentSection
            name="Progress sizes"
            description="sm track is 2px; md track is 4px. Both use the same token scale."
            code={`<Progress value={50} size="sm" />\n<Progress value={50} size="md" />`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%' }}>
                <Progress value={50} size="sm" label="sm" />
                <Progress value={50} size="md" label="md" />
              </div>
            )}
          />

          <ComponentSection
            name="Skeleton"
            description="Shape-matching placeholder. No shimmer — opacity pulse only. aria-hidden."
            code={`<Skeleton width="100%" height={20} />`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%' }}>
                <Skeleton width="60%" height={20} />
                <Skeleton width="100%" height={16} />
                <Skeleton width="80%" height={16} />
                <Skeleton width="40%" height={16} />
              </div>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}

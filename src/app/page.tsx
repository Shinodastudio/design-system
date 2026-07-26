import { MainWrapper } from '@/components/layout/MainWrapper';
import { Divider } from '@/components/primitives/Divider';
import { HomeGalleryPanel } from '@/components/home/HomeGalleryPanel';

/**
 * Homepage — May 2026 spec (Figma 3907-10763).
 *
 * Layout:
 * - 2-column grid: title + date (left, sticky) / description (right, 40% opacity)
 * - --padding-section-lg below the header text, then a divider
 * - 3 full-width 16:9 gallery panels with --padding-section-sm above + below,
 *   each a static, theme-mapped image with no link and no motion.
 */

const DESCRIPTION = 'A lightweight, Interaction-first design system built around utility, accessibility, and efficiency in designed space.';
const UPDATED_LABEL = 'Updated July 2026';

export default function HomePage(): React.ReactElement {
  return (
    <MainWrapper>
      {/* Header — 2-col: title/date left (sticky), description right */}
      <div style={{ paddingBottom: 'var(--padding-section-lg)' }}>
        <div className="grid-2col">
          <div className="col-sticky">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <h1 className="heading-md">Shinoda Design System</h1>
              <p className="heading-md op-40">{UPDATED_LABEL}</p>
            </div>
          </div>
          <div>
            <p className="heading-md op-40">{DESCRIPTION}</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* Gallery panels — full-width 16:9, gap 16px */}
      <div style={{
        paddingBlock: 'var(--padding-section-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}>
        <HomeGalleryPanel lightSrc="/home/gallery-colour-light.jpg" darkSrc="/home/gallery-colour-dark.jpg" />
        <HomeGalleryPanel lightSrc="/home/gallery-icons-light.jpg" darkSrc="/home/gallery-icons-dark.jpg" />
      </div>
    </MainWrapper>
  );
}

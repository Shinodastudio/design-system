import { MainWrapper } from '@/components/layout/MainWrapper';
import { Divider } from '@/components/primitives/Divider';

/**
 * Homepage — May 2026 spec (Figma 3907-10763).
 *
 * Layout:
 * - 2-column grid: title + date (left, sticky) / description (right, 40% opacity)
 * - --padding-section-lg below the header text, then a divider
 * - 3 full-width 16:9 image placeholders with --padding-section-sm above + below
 *
 * Typography: heading-md throughout (not heading-xl — matches Figma spec).
 */

const DESCRIPTION = 'Description of the Shinoda Design System for React';
const UPDATED_LABEL = 'Updated May 2026';

const IMAGE_COUNT = 3;

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

      {/* Image placeholders — 3× full-width 16:9, gap 16px */}
      <div style={{
        paddingBlock: 'var(--padding-section-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}>
        {Array.from({ length: IMAGE_COUNT }, (_, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-fill-secondary)',
            }}
          />
        ))}
      </div>
    </MainWrapper>
  );
}

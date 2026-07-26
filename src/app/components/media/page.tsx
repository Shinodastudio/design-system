import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ScrollBendMedia } from '@/components/media/ScrollBendMedia';

/**
 * Flat, gradient-free placeholder — abstract ink/secondary composition at
 * 16:9, encoded inline so the catalogue demo needs no external asset.
 */
const PLACEHOLDER_SRC =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
      <rect width="1600" height="900" fill="#18181B"/>
      <circle cx="1120" cy="450" r="360" fill="#333338"/>
      <rect x="0" y="0" width="1600" height="180" fill="#212123"/>
      <rect x="0" y="720" width="1600" height="180" fill="#212123"/>
    </svg>`,
  );

export default function MediaPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Media"
            description="Full-bleed image/video whose edges bend away from the frame under scroll velocity — WebGL, not CSS."
          />
        </StickyCol>
        <div>
          <Divider />
          <div style={{ paddingBlock: 'var(--space-8)' }}>
            <Text variant="body-md" opacity={40} as="h2">ScrollBendMedia</Text>
            <Text variant="body-md" opacity={60} as="p" style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
              Scroll the page — the top and bottom edges pull inward with scroll speed, then ease back flat at rest. The gaps reveal this page&rsquo;s own background, so the effect only reads correctly against a solid, non-transparent section.
            </Text>
            <ScrollBendMedia
              src={PLACEHOLDER_SRC}
              alt="Abstract flat placeholder — demo texture for the peel effect"
              ratio={16 / 9}
            />
            <Text variant="body-sm" opacity={40} as="p" style={{ marginTop: 'var(--space-4)' }}>
              <code>{'<ScrollBendMedia src="/hero.jpg" alt="…" ratio={16 / 9} />'}</code>
            </Text>
          </div>
          <Divider />
          <div style={{ paddingBlock: 'var(--space-8)' }}>
            <Text variant="body-md" opacity={40} as="h2">Behaviour</Text>
            <Text variant="body-md" opacity={60} as="p" style={{ marginTop: 'var(--space-4)' }}>
              <code>ratio</code> is required — the container reserves its final box before the media or the WebGL context is ready, so nothing shifts on load (CLS-safe). <code>bendStrength</code> (default 1) scales how far the edges pull for a given scroll speed. <code>waveFrequency</code> (default 2) sets how many horizontal humps the peel edge has — 2 gives the symmetric double-bulge; 1 gives a single centred tuck.
            </Text>
            <Text variant="body-md" opacity={60} as="p" style={{ marginTop: 'var(--space-4)' }}>
              Pass <code>type=&quot;video&quot;</code> for a <code>&lt;video&gt;</code> source (autoplays muted/looped). Rendering pauses entirely off screen and is skipped altogether under <code>prefers-reduced-motion: reduce</code> or <code>disabled</code> — both fall back to the plain, static media element.
            </Text>
          </div>
          <Divider />
          <div style={{ paddingBlock: 'var(--space-8)' }}>
            <Text variant="body-md" opacity={40} as="h2">Implementation</Text>
            <Text variant="body-md" opacity={60} as="p" style={{ marginTop: 'var(--space-4)' }}>
              A subdivided plane (<code>ogl</code>) with the media bound as its texture. <code>useScrollBend</code> eases a single <code>uBend</code> uniform every frame toward a target derived from scroll velocity (fast scroll → spikes; released scroll → decays). The canvas clears to transparent, so wherever the plane&rsquo;s edge pulls away from the container it lets whatever sits behind it show through — no mask, no clip-path.
            </Text>
            <Text variant="body-md" opacity={60} as="p" style={{ marginTop: 'var(--space-4)' }}>
              This is the one component in the system that reaches for a canvas rather than CSS — flagged as such because it&rsquo;s a real dependency (<code>ogl</code>, ~15kb) and a different tier of engineering than the rest of the flat, shadow-free visual language. Reach for it deliberately, on hero media only.
            </Text>
          </div>
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}

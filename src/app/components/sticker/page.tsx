'use client';

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { PeelableImage } from '@/components/sticker/PeelableImage';

const SIZES = ['default'] as const;

/* Inline SVG sources so the catalogue stays self-contained without shipping
   binary fixtures. The OPAQUE source paints a full-bleed red square — the
   peel reveals the paper-back tint cleanly. The CUTOUT source paints a
   centred circle on transparent canvas so the flap-IS-the-image masking
   behaviour is visible: the corner flap only renders where the image has
   pixels, not over the empty alpha region. */
const OPAQUE_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#E14A3A"/>
  <text x="100" y="118" font-family="Georgia, serif" font-size="64" fill="#fff8f3" text-anchor="middle" font-style="italic">a</text>
</svg>
`)}`;

const CUTOUT_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#3A7DE1"/>
  <circle cx="100" cy="100" r="42" fill="#f4f1ec"/>
</svg>
`)}`;

export default function StickerPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Sticker"
            description="Image surfaces with the canonical sticker-peel hover effect. The chosen corner appears to lift off the canvas, revealing a paper-back flap that respects the source image's alpha."
          />
        </StickyCol>
        <div>
          <ComponentSection
            name="PeelableImage"
            description="Hover lifts the chosen corner. The flap is rendered from the source image itself via background-image, then tinted with grayscale + brightness — so cutout (alpha) sources don't render a grey triangle in empty space. Pass corner='auto' to randomise per mount."
            code={`<PeelableImage src="/sticker.png" alt="Apricot" corner="auto" />`}
            sizes={SIZES}
            states={['default', 'hover']}
            render={(): React.ReactNode => (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 'var(--space-6)',
                  width: '100%',
                }}
              >
                <PeelableImage
                  src={OPAQUE_SRC}
                  alt="Opaque red square, top-left peel"
                  corner="tl"
                  style={{ width: '100%' }}
                />
                <PeelableImage
                  src={OPAQUE_SRC}
                  alt="Opaque red square, top-right peel"
                  corner="tr"
                  style={{ width: '100%' }}
                />
                <PeelableImage
                  src={OPAQUE_SRC}
                  alt="Opaque red square, bottom-left peel"
                  corner="bl"
                  style={{ width: '100%' }}
                />
                <PeelableImage
                  src={OPAQUE_SRC}
                  alt="Opaque red square, bottom-right peel"
                  corner="br"
                  style={{ width: '100%' }}
                />
              </div>
            )}
          />

          <ComponentSection
            name="Cutout (alpha) source"
            description="When the source carries transparent pixels, the flap inherits the same alpha — so it only paints where the image has content. No stray grey triangles on the empty canvas."
            code={`<PeelableImage src="/circle.svg" alt="Cutout" corner="auto" />`}
            sizes={SIZES}
            states={['default', 'hover']}
            render={(): React.ReactNode => (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 'var(--space-6)',
                  width: '100%',
                }}
              >
                <PeelableImage src={CUTOUT_SRC} alt="Cutout circle, top-left peel"     corner="tl" style={{ width: '100%' }} />
                <PeelableImage src={CUTOUT_SRC} alt="Cutout circle, top-right peel"    corner="tr" style={{ width: '100%' }} />
                <PeelableImage src={CUTOUT_SRC} alt="Cutout circle, bottom-left peel"  corner="bl" style={{ width: '100%' }} />
                <PeelableImage src={CUTOUT_SRC} alt="Cutout circle, bottom-right peel" corner="br" style={{ width: '100%' }} />
              </div>
            )}
          />
        </div>
      </Grid>
    </MainWrapper>
  );
}

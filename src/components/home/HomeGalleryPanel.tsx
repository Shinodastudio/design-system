/**
 * Homepage gallery panel — static image, theme-mapped, no link, no motion.
 * Both light/dark variants render (toggled via CSS) so there's no
 * hydration flash on load; only one is ever visible per theme.
 */

type HomeGalleryPanelProps = {
  readonly lightSrc: string;
  readonly darkSrc: string;
};

export function HomeGalleryPanel({ lightSrc, darkSrc }: HomeGalleryPanelProps): React.ReactElement {
  return (
    <div className="home-gallery-panel">
      <img
        src={lightSrc}
        alt=""
        loading="lazy"
        data-cursor="none"
        className="home-gallery-static-img home-gallery-static-img-light"
      />
      <img
        src={darkSrc}
        alt=""
        loading="lazy"
        data-cursor="none"
        className="home-gallery-static-img home-gallery-static-img-dark"
      />
    </div>
  );
}

// Matches Webflow pattern: --blur: 3rem; --ratio: 1.9
// Each layer i: blur = 3rem / 1.9^i, stacked below nav content

const BLUR_BASE = 3;   // rem
const RATIO     = 1.9;
const LAYERS    = 8;
const LAYER_H   = 14;  // px per layer

const BLUR_LAYERS = Array.from({ length: LAYERS }, (_, i) => ({
  blur: (BLUR_BASE / Math.pow(RATIO, i + 1)).toFixed(3),
  top:  i * LAYER_H,
}));

export function NavProgressiveBlur(): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      style={{
        position:       'absolute',
        top:            '100%',
        left:           0,
        right:          0,
        height:         `${LAYERS * LAYER_H}px`,
        pointerEvents:  'none',
        zIndex:         0,
      }}
    >
      {BLUR_LAYERS.map((layer, i) => (
        <div
          key={i}
          style={{
            position:             'absolute',
            top:                  `${layer.top}px`,
            left:                 0,
            right:                0,
            height:               `${LAYER_H}px`,
            backdropFilter:       `blur(${layer.blur}rem)`,
            WebkitBackdropFilter: `blur(${layer.blur}rem)`,
          }}
        />
      ))}
    </div>
  );
}

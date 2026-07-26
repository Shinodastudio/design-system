/**
 * Vertex/fragment pair for ScrollBendMedia.
 *
 * Technique: the plane is subdivided vertically (heightSegments) so its top
 * and bottom edges can be displaced independently of the middle. Vertices
 * near the bottom edge pull inward toward the plane's centre; vertices near
 * the top push out very slightly the other way. The amount of pull is driven
 * by `uBend`, a single 0..1 scalar the host component eases every frame from
 * scroll velocity (see useScrollBend.ts) — fast scrolling stretches the
 * corners in, releasing the scroll lets them ease back flat.
 *
 * The canvas clears to transparent (Renderer alpha: true), so wherever the
 * plane pulls away from its original rect, the page background shows
 * through underneath — that gap reads as the media "peeling" away from its
 * frame, matching the raggededge.com reference.
 *
 * `uWaveFreq` controls how many horizontal humps the peel edge has (2 gives
 * the symmetric double-bulge look from the reference; 1 gives a single
 * centred tuck).
 */

export const SCROLL_BEND_VERTEX = /* glsl */ `
  attribute vec3 position;
  attribute vec2 uv;

  uniform float uBend;
  uniform float uWaveFreq;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // 0 at the very top/bottom edge, 1 through the untouched middle.
    float bottomFalloff = smoothstep(0.0, 0.4, uv.y);
    float topFalloff = smoothstep(1.0, 0.6, uv.y);
    float edge = 1.0 - min(bottomFalloff, topFalloff);

    // Symmetric horizontal hump shape across the width.
    float wave = 0.5 + 0.5 * sin(uv.x * 3.14159265 * uWaveFreq - 1.5707963);

    // Bottom edge pulls up (into the plane) more than the top pushes down —
    // reads as the sheet lifting off its lower-left/right corners.
    float direction = mix(-0.35, 1.0, step(0.5, 1.0 - uv.y));

    pos.y += edge * wave * uBend * direction;

    gl_Position = vec4(pos, 1.0);
  }
`;

export const SCROLL_BEND_FRAGMENT = /* glsl */ `
  precision highp float;

  uniform sampler2D tMap;
  uniform vec2 uCoverScale;
  uniform vec2 uCoverOffset;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv * uCoverScale + uCoverOffset;
    gl_FragColor = texture2D(tMap, uv);
  }
`;

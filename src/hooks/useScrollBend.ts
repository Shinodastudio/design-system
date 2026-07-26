'use client';

import { useEffect } from 'react';
import { Renderer, Program, Mesh, Plane, Texture } from 'ogl';
import { SCROLL_BEND_VERTEX, SCROLL_BEND_FRAGMENT } from '@/components/media/scrollBendShader';

/** px/frame of scroll movement that reaches full bend impulse. Lower = twitchier. */
const VELOCITY_DIVISOR = 60;
/** Per-frame multiplier the velocity impulse decays by once scrolling stops. */
const VELOCITY_DECAY = 0.92;
/** Eases the rendered bend toward the current velocity target each frame. */
const BEND_LERP = 0.09;
/** Clip-space units of vertical pull at full velocity (before bendStrength). */
const MAX_BEND = 0.22;
/** Vertical plane subdivisions — higher = smoother curve, more vertices. */
const HEIGHT_SEGMENTS = 48;

export interface UseScrollBendOptions {
  /** Multiplier on the scroll-velocity-driven bend amount. Default 1. */
  readonly bendStrength?: number;
  /** Number of horizontal humps in the peel edge. 2 = symmetric double-bulge. Default 2. */
  readonly waveFrequency?: number;
  /** Skip WebGL entirely and leave the plain media element visible. */
  readonly disabled?: boolean;
}

function isVideoElement(el: HTMLImageElement | HTMLVideoElement): el is HTMLVideoElement {
  return el.tagName === 'VIDEO';
}

function naturalSize(media: HTMLImageElement | HTMLVideoElement): readonly [number, number] {
  if (isVideoElement(media)) return [media.videoWidth || 1, media.videoHeight || 1];
  return [media.naturalWidth || 1, media.naturalHeight || 1];
}

function isMediaReady(media: HTMLImageElement | HTMLVideoElement): boolean {
  if (isVideoElement(media)) return media.readyState >= 2; // HAVE_CURRENT_DATA
  return media.complete && media.naturalWidth > 0;
}

/**
 * Drives the ScrollBendMedia WebGL plane: eases the mesh's `uBend` uniform
 * toward a scroll-velocity target every frame, keeps the cover-fit uniforms
 * in sync with container/media size, and pauses rendering entirely off
 * screen or under prefers-reduced-motion.
 *
 * Renders directly to `canvasRef` — pass refs to a positioned container, the
 * canvas overlay, and the source <img>/<video> whose pixels become the
 * texture. On success, hides the source element and reveals the canvas; on
 * reduced motion (or if refs aren't ready) it does nothing, leaving the
 * plain media element visible as the static fallback.
 */
export function useScrollBend(
  containerRef: React.RefObject<HTMLDivElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  mediaRef: React.RefObject<HTMLImageElement | HTMLVideoElement | null>,
  options: UseScrollBendOptions = {},
): void {
  const { bendStrength = 1, waveFrequency = 2, disabled = false } = options;

  useEffect(() => {
    if (disabled) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const media = mediaRef.current;
    if (container == null || canvas == null || media == null) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let destroyed = false;
    let visible = false;
    let started = false;
    let raf = 0;
    let lastScrollY = window.scrollY;
    let velocity = 0;
    let bend = 0;

    const renderer = new Renderer({
      canvas,
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    const gl = renderer.gl;

    const geometry = new Plane(gl, {
      width: 2,
      height: 2,
      widthSegments: 1,
      heightSegments: HEIGHT_SEGMENTS,
    });

    const texture = new Texture(gl, { image: media, generateMipmaps: false });

    const program = new Program(gl, {
      vertex: SCROLL_BEND_VERTEX,
      fragment: SCROLL_BEND_FRAGMENT,
      transparent: true,
      uniforms: {
        tMap: { value: texture },
        uBend: { value: 0 },
        uWaveFreq: { value: waveFrequency },
        uCoverScale: { value: [1, 1] },
        uCoverOffset: { value: [0, 0] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = (): void => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      renderer.setSize(width, height);

      const [mediaWidth, mediaHeight] = naturalSize(media);
      const containerAspect = width / height;
      const mediaAspect = mediaWidth / mediaHeight;

      const scaleX = containerAspect > mediaAspect ? 1 : containerAspect / mediaAspect;
      const scaleY = containerAspect > mediaAspect ? mediaAspect / containerAspect : 1;

      program.uniforms.uCoverScale.value = [scaleX, scaleY];
      program.uniforms.uCoverOffset.value = [(1 - scaleX) / 2, (1 - scaleY) / 2];
    };

    const loop = (): void => {
      raf = visible ? requestAnimationFrame(loop) : 0;
      if (destroyed) return;

      if (!started) {
        if (!isMediaReady(media)) return;
        resize();
        canvas.style.setProperty('display', 'block');
        media.classList.add('scroll-bend-media-source-hidden');
        started = true;
      }

      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      const impulse = Math.min(Math.abs(delta) / VELOCITY_DIVISOR, 1);
      velocity = Math.max(velocity * VELOCITY_DECAY, impulse);
      bend += (velocity * bendStrength - bend) * BEND_LERP;
      program.uniforms.uBend.value = bend * MAX_BEND;

      if (isVideoElement(media)) texture.needsUpdate = true;

      renderer.render({ scene: mesh });
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible && raf === 0 && !destroyed) raf = requestAnimationFrame(loop);
      },
      { rootMargin: '200px' },
    );
    intersectionObserver.observe(container);

    raf = requestAnimationFrame(loop);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      media.classList.remove('scroll-bend-media-source-hidden');
      canvas.style.removeProperty('display');
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [containerRef, canvasRef, mediaRef, bendStrength, waveFrequency, disabled]);
}

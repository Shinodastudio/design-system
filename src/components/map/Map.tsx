// Requires: bun add react-leaflet leaflet @types/leaflet
'use client';

import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

export interface MapMarker {
  readonly position: readonly [number, number];
  readonly label?: string;
}

interface MapProps {
  readonly center?: readonly [number, number];
  readonly zoom?: number;
  readonly markers?: readonly MapMarker[];
  readonly className?: string;
  readonly onMapClick?: (position: readonly [number, number]) => void;
}

const DEFAULT_CENTER: readonly [number, number] = [51.505, -0.09];
const DEFAULT_ZOOM = 13;

interface LeafletLike {
  map: (container: HTMLElement) => {
    setView: (center: [number, number], zoom: number) => LeafletMapInstance;
    remove: () => void;
    on: (event: string, handler: (e: { latlng: { lat: number; lng: number } }) => void) => void;
  };
  tileLayer: (url: string, options: { attribution: string }) => { addTo: (map: LeafletMapInstance) => void };
  marker: (position: [number, number]) => { addTo: (map: LeafletMapInstance) => void; bindPopup: (text: string) => void };
  Icon: {
    Default: {
      prototype: Record<string, unknown>;
      mergeOptions: (opts: Record<string, string>) => void;
    };
  };
}

interface LeafletMapInstance {
  setView: (center: [number, number], zoom: number) => LeafletMapInstance;
  remove: () => void;
  on: (event: string, handler: (e: { latlng: { lat: number; lng: number } }) => void) => void;
}

function LeafletMapInner({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = [],
  className,
  onMapClick,
}: MapProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMapInstance | null>(null);
  const [leafletError, setLeafletError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container == null) return;

    let mounted = true;

    const init = async () => {
      try {
        // Dynamic specifier prevents TypeScript from resolving the missing module type.
        const leafletId = 'leaflet';
        const L = await import(/* webpackIgnore: true */ /* @vite-ignore */ leafletId) as unknown as LeafletLike;

        if (!mounted) return;

        delete L.Icon.Default.prototype['_getIconUrl'];
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        const mapInstance = L.map(container).setView([center[0], center[1]], zoom);
        mapInstanceRef.current = mapInstance;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(mapInstance);

        for (const marker of markers) {
          const m = L.marker([marker.position[0], marker.position[1]]);
          m.addTo(mapInstance);
          if (marker.label != null) m.bindPopup(marker.label);
        }

        if (onMapClick != null) {
          mapInstance.on('click', (e: { latlng: { lat: number; lng: number } }) => {
            onMapClick([e.latlng.lat, e.latlng.lng]);
          });
        }
      } catch {
        if (mounted) setLeafletError(true);
      }
    };

    void init();

    return () => {
      mounted = false;
      if (mapInstanceRef.current != null) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // Intentional: only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (leafletError) {
    return (
      <div className={cn('map-placeholder', className)}>
        <p>Map unavailable. Install required dependencies:</p>
        <code>bun add react-leaflet leaflet @types/leaflet</code>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('map-container', className)}
      style={{ height: '400px', width: '100%' }}
      role="application"
      aria-label="Interactive map"
    />
  );
}

export function Map(props: MapProps): React.ReactElement {
  const [leafletAvailable, setLeafletAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const leafletId = 'leaflet';
    import(/* webpackIgnore: true */ /* @vite-ignore */ leafletId)
      .then(() => setLeafletAvailable(true))
      .catch(() => setLeafletAvailable(false));
  }, []);

  if (leafletAvailable === false) {
    return (
      <div className={cn('map-placeholder', props.className)}>
        <p>Map unavailable — install leaflet:</p>
        <code>bun add react-leaflet leaflet @types/leaflet</code>
      </div>
    );
  }

  if (leafletAvailable === null) {
    return (
      <div
        className={cn('map-placeholder', props.className)}
        style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Loading map…
      </div>
    );
  }

  return <LeafletMapInner {...props} />;
}

/**
 * MapNoSSR — wraps Map in React.lazy + Suspense for dynamic imports without SSR.
 */
const LazyMap = lazy(async () => {
  const mod = await import('./Map');
  return { default: mod.Map };
});

export function MapNoSSR(props: MapProps): React.ReactElement {
  return (
    <Suspense
      fallback={
        <div
          className={cn('map-placeholder', props.className)}
          style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Loading map…
        </div>
      }
    >
      <LazyMap {...props} />
    </Suspense>
  );
}

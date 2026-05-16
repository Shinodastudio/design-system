import { lazy, useState, useEffect, Suspense, useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsxs, jsx } from 'react/jsx-runtime';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var DEFAULT_CENTER = [51.505, -0.09];
var DEFAULT_ZOOM = 13;
function LeafletMapInner({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = [],
  className,
  onMapClick
}) {
  const containerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [leafletError, setLeafletError] = useState(false);
  useEffect(() => {
    const container = containerRef.current;
    if (container == null) return;
    let mounted = true;
    const init = async () => {
      try {
        const leafletId = "leaflet";
        const L = await import(
          /* webpackIgnore: true */
          /* @vite-ignore */
          leafletId
        );
        if (!mounted) return;
        delete L.Icon.Default.prototype["_getIconUrl"];
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
        });
        const mapInstance = L.map(container).setView([center[0], center[1]], zoom);
        mapInstanceRef.current = mapInstance;
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "\xA9 OpenStreetMap contributors"
        }).addTo(mapInstance);
        for (const marker of markers) {
          const m = L.marker([marker.position[0], marker.position[1]]);
          m.addTo(mapInstance);
          if (marker.label != null) m.bindPopup(marker.label);
        }
        if (onMapClick != null) {
          mapInstance.on("click", (e) => {
            onMapClick([e.latlng.lat, e.latlng.lng]);
          });
        }
      } catch (e) {
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
  }, []);
  if (leafletError) {
    return /* @__PURE__ */ jsxs("div", { className: cn("map-placeholder", className), children: [
      /* @__PURE__ */ jsx("p", { children: "Map unavailable. Install required dependencies:" }),
      /* @__PURE__ */ jsx("code", { children: "bun add react-leaflet leaflet @types/leaflet" })
    ] });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: cn("map-container", className),
      style: { height: "400px", width: "100%" },
      role: "application",
      "aria-label": "Interactive map"
    }
  );
}
function Map(props) {
  const [leafletAvailable, setLeafletAvailable] = useState(null);
  useEffect(() => {
    const leafletId = "leaflet";
    import(
      /* webpackIgnore: true */
      /* @vite-ignore */
      leafletId
    ).then(() => setLeafletAvailable(true)).catch(() => setLeafletAvailable(false));
  }, []);
  if (leafletAvailable === false) {
    return /* @__PURE__ */ jsxs("div", { className: cn("map-placeholder", props.className), children: [
      /* @__PURE__ */ jsx("p", { children: "Map unavailable \u2014 install leaflet:" }),
      /* @__PURE__ */ jsx("code", { children: "bun add react-leaflet leaflet @types/leaflet" })
    ] });
  }
  if (leafletAvailable === null) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn("map-placeholder", props.className),
        style: { height: "400px", display: "flex", alignItems: "center", justifyContent: "center" },
        children: "Loading map\u2026"
      }
    );
  }
  return /* @__PURE__ */ jsx(LeafletMapInner, __spreadValues({}, props));
}
var LazyMap = lazy(async () => {
  const mod = await Promise.resolve().then(() => require_Map());
  return { default: mod.Map };
});
function MapNoSSR(props) {
  return /* @__PURE__ */ jsx(
    Suspense,
    {
      fallback: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn("map-placeholder", props.className),
          style: { height: "400px", display: "flex", alignItems: "center", justifyContent: "center" },
          children: "Loading map\u2026"
        }
      ),
      children: /* @__PURE__ */ jsx(LazyMap, __spreadValues({}, props))
    }
  );
}

export { Map, MapNoSSR, __objRest, __spreadProps, __spreadValues, cn };
//# sourceMappingURL=chunk-AZLNSPTC.mjs.map
//# sourceMappingURL=chunk-AZLNSPTC.mjs.map
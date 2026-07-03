'use client';
import { useEffect, useRef } from 'react';

const PLACES = [
  { lat: 27.4728, lng: 94.9120, category: 'current' },
];

export default function InteractiveMap() {
  const mapRef  = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current || !mapRef.current) return;
    initRef.current = true;

    const isDark = document.documentElement.classList.contains('dark');

    import('leaflet').then(L => {
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id   = 'leaflet-css';
        link.rel  = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      const map = L.map(mapRef.current!, {
        center:             [27.4728, 94.9120],
        zoom:               6,
        scrollWheelZoom:    true,
        zoomControl:        false,
        attributionControl: false,
        dragging:           true,
        touchZoom:          true,
      });

      const tileUrl = isDark
        ? 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl, { subdomains: 'abcd', maxZoom: 19 }).addTo(map);

      if (!document.getElementById('map-pulse-kf')) {
        const s = document.createElement('style');
        s.id = 'map-pulse-kf';
        s.textContent = `
          @keyframes mapPulse {
            0%,100% { transform: scale(1); opacity: 0.5; }
            50%      { transform: scale(2.4); opacity: 0; }
          }
        `;
        document.head.appendChild(s);
      }

      const c   = '#3b82f6';
      const html = `
        <div style="position:relative;width:14px;height:14px;">
          <div style="position:absolute;inset:-12px;border-radius:50%;background:${c};opacity:0.35;animation:mapPulse 2.2s ease-in-out infinite;"></div>
          <div style="position:absolute;inset:-5px;border-radius:50%;background:${c};opacity:0.2;animation:mapPulse 2.2s ease-in-out 0.7s infinite;"></div>
          <div style="width:14px;height:14px;border-radius:50%;background:${c};border:2px solid rgba(255,255,255,0.9);box-shadow:0 0 12px ${c}cc;"></div>
        </div>`;
      const icon = L.divIcon({ html, className: '', iconSize: [14, 14], iconAnchor: [7, 7] });
      L.marker([27.4728, 94.9120], { icon }).addTo(map);

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({ iconUrl: '', shadowUrl: '' });
    });
  }, []);

  return (
    <section id="map" className="w-full xl:px-20 px-6 py-20 pb-28 lg:pb-20 xl:mx-auto xl:container flex flex-col relative max-w-7xl mx-auto">

      <h1 className="group xl:text-5xl md:text-4xl text-2xl font-semibold leading-tight text-center sm:mb-0 mb-12 max-w-2xl min-[850px]:max-w-3xl lg:max-w-4xl xl:max-w-5xl self-center text-gray-900 dark:text-white">
        <span className="relative inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hidden md:block w-9 h-9 text-gray-900 dark:text-gray-100 absolute -top-6 left-0 -rotate-12 group-hover:-top-3 group-hover:-left-4 group-hover:-rotate-[35deg] ease-in-out transition-all duration-500"
          >
            <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
          </svg>
          Currently
        </span>{" "}based here, crafting digital experiences for the world.
      </h1>

      <div className="md:mt-14 mt-4 relative sm:flex items-center justify-center">
        <div
          ref={mapRef}
          className="w-full xl:max-w-4xl xl:h-[400px] h-64 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm z-0 relative"
          style={{ backgroundColor: 'var(--color-brand-1)' }}
          aria-label="Interactive location map"
        />
      </div>
    </section>
  );
}

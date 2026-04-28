'use client';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ── Fix the missing-icon bug common in Leaflet + Next.js/Webpack ──
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom TripNest-blue marker
const BluePin = L.divIcon({
  className: '',
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="44" viewBox="0 0 32 44" fill="none">
    <path d="M16 0C7.164 0 0 7.164 0 16c0 12 16 28 16 28s16-16 16-28C32 7.164 24.836 0 16 0z" fill="#1976d2"/>
    <circle cx="16" cy="15" r="7" fill="#fff"/>
  </svg>`,
  iconSize: [32, 44],
  iconAnchor: [16, 44],
  popupAnchor: [0, -40],
});

// ── Sub-component to fly the map to new coordinates ──
function FlyToCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5 });
  }, [center[0], center[1]]);
  return null;
}

interface Props {
  tripId: string;
  tripName: string;
  latitude?: number | null;
  longitude?: number | null;
}

// Default fallback (world center)
const DEFAULT_CENTER: [number, number] = [20, 0];
const DEFAULT_ZOOM = 2;

export function MapPreview({ tripId, tripName, latitude, longitude }: Props) {
  const [center, setCenter] = useState<[number, number]>(
    latitude && longitude ? [latitude, longitude] : DEFAULT_CENTER
  );
  const [zoom, setZoom] = useState(latitude && longitude ? 13 : DEFAULT_ZOOM);
  const [resolved, setResolved] = useState(!!(latitude && longitude));

  // If no stored coordinates, geocode the trip name on mount
  useEffect(() => {
    if (latitude && longitude) return; // already have coordinates

    const controller = new AbortController();
    const url =
      `https://nominatim.openstreetmap.org/search?` +
      new URLSearchParams({ q: tripName, format: 'json', limit: '1' });

    fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'TripNest/1.0' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          setCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          setZoom(13);
          setResolved(true);
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, [tripName, latitude, longitude]);

  // Extract a short label from the trip name for the badge
  const label = tripName.length > 30 ? tripName.slice(0, 28) + '…' : tripName;

  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(25,118,210,0.08)] border border-white/60">
      {/* Floating label */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm text-sm font-semibold text-gray-800 border border-white/60">
        <span className="material-symbols-outlined text-blue-600 text-base">map</span>
        {label}
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
        style={{ height: '100%', width: '100%' }}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Fly to the resolved center once coordinates are available */}
        {resolved && <FlyToCenter center={center} />}

        {/* Drop a pin at the trip location */}
        {resolved && (
          <Marker position={center} icon={BluePin}>
            <Popup>
              <div className="text-sm">
                <p className="font-bold text-gray-900">{tripName}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {center[0].toFixed(4)}, {center[1].toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default MapPreview;

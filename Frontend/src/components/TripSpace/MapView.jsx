import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapView = ({ logs, trip }) => {
  const mapRef = useRef(null);

  // Custom marker icon
  const createCustomIcon = (color = '#0d9488') => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
              <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  // Calculate bounds from logs
  const getBounds = () => {
    if (!logs || logs.length === 0) {
      return [[46.5, 7.5], [47.5, 8.5]]; // Default to Switzerland
    }

    const coords = logs
      .filter(log => log.coordinates)
      .map(log => [log.coordinates.lat, log.coordinates.lng]);

    if (coords.length === 0) {
      return [[46.5, 7.5], [47.5, 8.5]];
    }

    const lats = coords.map(c => c[0]);
    const lngs = coords.map(c => c[1]);

    return [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)]
    ];
  };

  // Create polyline from logs
  const getPolylinePath = () => {
    if (!logs || logs.length === 0) return [];
    
    return logs
      .filter(log => log.coordinates)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(log => [log.coordinates.lat, log.coordinates.lng]);
  };

  const MapController = () => {
    const map = useMap();
    
    useEffect(() => {
      const bounds = getBounds();
      map.fitBounds(bounds, { padding: [50, 50] });
    }, [logs]);

    return null;
  };

  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        ref={mapRef}
        center={[47.0, 8.0]}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        className="bg-gray-100"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Polyline connecting all logs */}
        {getPolylinePath().length > 1 && (
          <Polyline
            positions={getPolylinePath()}
            color="#0d9488"
            weight={3}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}

        {/* Markers for each log */}
        {logs && logs.filter(log => log.coordinates).map((log, index) => (
          <Marker
            key={log.id}
            position={[log.coordinates.lat, log.coordinates.lng]}
            icon={createCustomIcon()}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-gray-900">{log.location || 'Location'}</h3>
                <p className="text-sm text-gray-600">{new Date(log.date).toLocaleDateString()}</p>
                {log.notes && (
                  <p className="text-sm text-gray-700 mt-2">{log.notes.substring(0, 100)}...</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        <MapController />
      </MapContainer>
    </div>
  );
};

export default MapView;
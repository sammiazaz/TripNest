/**
 * TripNest — Active Trip JavaScript
 * Initializes the Leaflet map with custom markers for each log location
 */

// ── Log location data ───────────────────────────────────────
// Each entry corresponds to a log card in the feed
var LOGS = [
    { lat: 35.6938, lng: 139.7034, label: 'Shinjuku', desc: 'Arrival Night' },
    { lat: 35.7148, lng: 139.7967, label: 'Asakusa', desc: 'Senso-ji Temple' },
    { lat: 35.6595, lng: 139.7005, label: 'Shibuya', desc: 'Famous Crossing' },
    { lat: 35.2323, lng: 139.1025, label: 'Hakone', desc: 'Mt. Fuji Viewpoint' },
    { lat: 35.6700, lng: 139.7028, label: 'Harajuku', desc: 'Takeshita Street' },
];

// ── Initialize Map ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

    // Update log count badge
    var feed = document.getElementById('log-feed');
    var cards = feed.querySelectorAll('.log-card');
    document.getElementById('log-count').textContent = cards.length;

    // Create Leaflet map centered on Tokyo
    var map = L.map('map', { zoomControl: true }).setView([35.6762, 139.6503], 11);

    // OpenStreetMap tile layer (free, no API key needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a numbered, brand-colored marker for each log
    LOGS.forEach(function (log, index) {
        var markerNumber = index + 1;

        var icon = L.divIcon({
            html: '<div class="custom-marker"><span>' + markerNumber + '</span></div>',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -34],
            className: ''          // clear default leaflet class
        });

        L.marker([log.lat, log.lng], { icon: icon })
            .addTo(map)
            .bindPopup(
                '<strong style="color:#0d2223">' + log.label + '</strong>' +
                '<br><span style="font-size:.75rem;color:#4a6567">' + log.desc + '</span>'
            );
    });

});

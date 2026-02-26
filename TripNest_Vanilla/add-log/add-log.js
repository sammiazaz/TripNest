/**
 * TripNest — Add Log Page JavaScript
 * Handles tag selection, image preview, char count, location suggestions, and save
 */

// ── Set today as default date ────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('log-date').value = today;
});

// ── Tag Selection ────────────────────────────────────────────
function selectTag(chip) {
    // Remove 'selected' from all chips
    document.querySelectorAll('.tag-chip').forEach(function (c) {
        c.classList.remove('selected');
    });
    // Mark the clicked chip as selected
    chip.classList.add('selected');
}

// ── Image Upload Preview ─────────────────────────────────────
function previewImage(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function (e) {
        var preview = document.getElementById('img-preview');
        preview.src = e.target.result;
        preview.style.display = 'block';

        // Hide the upload area after image is chosen
        document.getElementById('upload-area').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// ── Character Counter ─────────────────────────────────────────
document.getElementById('log-notes').addEventListener('input', function () {
    var len = this.value.length;
    var counter = document.getElementById('char-count');
    counter.textContent = len + ' / 500 characters';
    counter.style.color = len > 450 ? '#e07b39' : 'var(--text-light)';
    if (len > 500) this.value = this.value.substring(0, 500);
});

// ── Demo Location Suggestions ─────────────────────────────────
var demoPlaces = [
    'Shinjuku, Tokyo, Japan',
    'Senso-ji Temple, Asakusa, Tokyo',
    'Shibuya Crossing, Tokyo',
    'Hakone, Kanagawa, Japan',
    'Harajuku, Tokyo, Japan',
    'Kyoto Old Town, Japan',
    'Osaka Castle, Japan',
];

function searchLocation() {
    var query = document.getElementById('location-input').value.trim().toLowerCase();
    var sugBox = document.getElementById('suggestions');
    sugBox.innerHTML = '';

    if (!query) return;

    var matches = demoPlaces.filter(function (p) {
        return p.toLowerCase().includes(query);
    });

    if (matches.length === 0) {
        matches = [query + ', Japan']; // fallback suggestion
    }

    matches.forEach(function (place) {
        var item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = '📍 ' + place;
        item.onclick = function () {
            document.getElementById('location-input').value = place;
            sugBox.innerHTML = '';
        };
        sugBox.appendChild(item);
    });
}

// Allow pressing Enter in location input to search
document.getElementById('location-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') searchLocation();
});

// ── Save Log ──────────────────────────────────────────────────
function saveLog() {
    var location = document.getElementById('location-input').value.trim();
    var date = document.getElementById('log-date').value;
    var notes = document.getElementById('log-notes').value.trim();

    if (!location) {
        alert('Please enter a location for this log.');
        document.getElementById('location-input').focus();
        return;
    }
    if (!notes) {
        alert('Please add some travel notes before saving.');
        document.getElementById('log-notes').focus();
        return;
    }

    // Success — navigate back to active trip with a message
    alert('✅ Log saved!\n\nLocation: ' + location + '\nDate: ' + (date || 'Not specified'));
    window.location.href = '../active-trip/active-trip.html';
}

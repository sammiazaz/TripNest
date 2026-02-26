/**
 * TripNest — Dashboard JavaScript
 * Handles trip card interactions and dynamic badge count
 */

// Update the trip count badge in the topbar
document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('trips-grid');
    // Count only .trip-card elements (not the add-trip-card)
    const count = grid.querySelectorAll('.trip-card').length;
    document.getElementById('trip-count').textContent = count;

    // Add hover tooltip to each card showing destination
    grid.querySelectorAll('.trip-card').forEach(function (card) {
        const dest = card.querySelector('.trip-dest');
        if (dest) {
            card.setAttribute('title', 'Open ' + dest.textContent + ' trip');
        }
    });
});

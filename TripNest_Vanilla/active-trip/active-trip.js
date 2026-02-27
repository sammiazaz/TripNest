/**
 * TripNest — Active Trip JavaScript
 * Updates the log count badge in the feed header
 */

document.addEventListener('DOMContentLoaded', function () {
    // Update log count badge to match actual cards
    var feed = document.getElementById('log-feed');
    var cards = feed.querySelectorAll('.log-card');
    document.getElementById('log-count').textContent = cards.length;
});

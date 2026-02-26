/**
 * TripNest — Invite Page JavaScript
 * Handles link generation, copy, permission hints, and email invite
 */

// ── Generate a random invite link ───────────────────────────
function generateLink() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var code = '';
    for (var i = 0; i < 10; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    document.getElementById('invite-url').value = 'https://tripnest.app/join/' + code;

    // Visual feedback on the generate button
    var btn = document.getElementById('gen-btn');
    btn.textContent = '✓ New link generated!';
    setTimeout(function () {
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> Generate Random Link';
    }, 2000);
}

// ── Copy invite link to clipboard ───────────────────────────
function copyLink() {
    var urlInput = document.getElementById('invite-url');
    navigator.clipboard.writeText(urlInput.value).catch(function () {
        // Fallback for older browsers
        urlInput.select();
        document.execCommand('copy');
    });

    var copyBtn = document.getElementById('copy-btn');
    copyBtn.textContent = '✓ Copied!';
    copyBtn.style.background = 'var(--primary)';
    copyBtn.style.color = '#fff';
    setTimeout(function () {
        copyBtn.textContent = 'Copy';
        copyBtn.style.background = '';
        copyBtn.style.color = '';
    }, 2000);
}

// ── Permission level description hints ──────────────────────
var permissionHints = {
    viewer: 'Viewers can browse the full trip but cannot make any changes.',
    editor: 'Editors can add new logs, upload photos, and edit descriptions.'
};

document.getElementById('permission').addEventListener('change', function () {
    document.getElementById('permission-hint').textContent = permissionHints[this.value];
});

// ── Send email invite (demo) ─────────────────────────────────
function sendInvite() {
    var emailInput = document.getElementById('email-input');
    var email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    // Add a new member chip to the list (demo)
    var initial = email[0].toUpperCase();
    var colors = ['#2ebd85', '#e07b39', '#4a90a4', '#7c4daf', '#c0392b'];
    var color = colors[Math.floor(Math.random() * colors.length)];
    var permission = document.getElementById('permission').options[document.getElementById('permission').selectedIndex].text.split(' ')[1];

    var chip = document.createElement('div');
    chip.className = 'member-chip';
    chip.innerHTML =
        '<div class="avatar sm" style="background:' + color + '">' + initial + '</div>' +
        '<span>' + email + ' <em>(' + permission + ')</em></span>';

    document.getElementById('member-list').appendChild(chip);
    emailInput.value = '';
    alert('Invite sent to ' + email + '!');
}

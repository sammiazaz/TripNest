/* ═══════════════════════════════════════════════
   TripNest — Auth Page JS
═══════════════════════════════════════════════ */

/* ── Tab switching ───────────────────────────── */
function switchTab(tab) {
    const loginForm = document.getElementById('form-login');
    const signupForm = document.getElementById('form-signup');
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
    } else {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        tabSignup.classList.add('active');
        tabLogin.classList.remove('active');
    }
}

/* ── Password visibility toggle ─────────────── */
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    btn.innerHTML = isHidden
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
             <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
             <line x1="1" y1="1" x2="23" y2="23"/>
           </svg>`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
             <circle cx="12" cy="12" r="3"/>
           </svg>`;
}

/* ── Password strength meter ─────────────────── */
document.getElementById('signup-password').addEventListener('input', function () {
    const val = this.value;
    const bar = document.getElementById('pwd-strength');
    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    const levels = [
        { width: '0%', color: '#d8e8e9' },
        { width: '25%', color: '#e07b39' },
        { width: '50%', color: '#f5c518' },
        { width: '75%', color: '#4a90a4' },
        { width: '100%', color: '#2ebd85' },
    ];
    bar.style.setProperty('--strength', levels[strength].width);
    bar.style.setProperty('--strength-color', levels[strength].color);
});

/* ── Toast helper ────────────────────────────── */
function showToast(msg, type = '') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = 'toast show ' + type;
    setTimeout(() => { toast.className = 'toast'; }, 3200);
}

/* ── Login handler ───────────────────────────── */
function handleLogin(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-login');
    const email = document.getElementById('login-email').value.trim();

    btn.classList.add('loading');
    btn.querySelector('span').textContent = 'Signing in…';

    // Simulate auth — redirect to dashboard after short delay
    setTimeout(() => {
        btn.classList.remove('loading');
        btn.querySelector('span').textContent = 'Log In';
        showToast('Welcome back! Redirecting…', 'success');
        setTimeout(() => {
            window.location.href = '../dashboard/dashboard.html';
        }, 1000);
    }, 1400);
}

/* ── Signup handler ──────────────────────────── */
function handleSignup(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-signup');
    const fname = document.getElementById('signup-fname').value.trim();

    btn.classList.add('loading');
    btn.querySelector('span').textContent = 'Creating account…';

    setTimeout(() => {
        btn.classList.remove('loading');
        btn.querySelector('span').textContent = 'Create Account';
        showToast(`Welcome to TripNest, ${fname}! 🎉`, 'success');
        setTimeout(() => {
            window.location.href = '../dashboard/dashboard.html';
        }, 1200);
    }, 1600);
}

/* ── Social login stub ───────────────────────── */
function socialLogin(provider) {
    showToast(`${provider} login coming soon!`);
}

/* ── Read tab param from URL (?tab=signup) ───── */
const params = new URLSearchParams(window.location.search);
if (params.get('tab') === 'signup') switchTab('signup');

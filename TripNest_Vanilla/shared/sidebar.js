/**
 * TripNest — Shared Sidebar Injector
 * ----------------------------------------------------
 * Include this script in every page.
 * Set `window.ACTIVE_PAGE` before including this script
 * to mark the correct nav item as active.
 * Possible values: 'dashboard', 'active-trip', 'invite', 'add-log'
 */
(function () {
    // ── Navigation links (paths are relative to each page's folder) ──
    // Because each page is in its own subfolder, we go up one level with ../
    const PAGES = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            href: '../dashboard/dashboard.html',
            icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <rect x="3" y="3" width="7" height="7" rx="1"/>
               <rect x="14" y="3" width="7" height="7" rx="1"/>
               <rect x="3" y="14" width="7" height="7" rx="1"/>
               <rect x="14" y="14" width="7" height="7" rx="1"/>
             </svg>`,
        },
        {
            id: 'active-trip',
            label: 'Active Trip',
            href: '../active-trip/active-trip.html',
            icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <circle cx="12" cy="10" r="4"/>
               <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8z"/>
             </svg>`,
        },
        {
            id: 'invite',
            label: 'Invite',
            href: '../invite/invite.html',
            icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
               <circle cx="9" cy="7" r="4"/>
               <line x1="19" y1="8" x2="19" y2="14"/>
               <line x1="22" y1="11" x2="16" y2="11"/>
             </svg>`,
        },
        {
            id: 'add-log',
            label: 'Add Log',
            href: '../add-log/add-log.html',
            icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M12 20h9"/>
               <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
             </svg>`,
        },
        {
            id: 'messages',
            label: 'Messages',
            href: '#',
            icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
             </svg>`,
        },
    ];

    const currentPage = window.ACTIVE_PAGE || '';

    // Build nav items HTML
    const navHTML = PAGES.map(p => `
    <a class="nav-item ${p.id === currentPage ? 'active' : ''}" href="${p.href}">
      ${p.icon}
      ${p.label}
    </a>
  `).join('');

    // Full sidebar HTML
    const sidebarHTML = `
    <aside class="sidebar">
      <a class="sidebar-logo" href="../dashboard/dashboard.html">
        <div class="logo-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
        </div>
        <span class="logo-text">Trip<span>Nest</span></span>
      </a>

      <nav class="sidebar-nav">
        ${navHTML}
      </nav>

      <div class="sidebar-bottom">
        <div class="user-chip">
          <div class="avatar">SA</div>
          <div class="user-info">
            <div class="name">Sammi A.</div>
            <div class="role">Explorer</div>
          </div>
        </div>
      </div>
    </aside>
  `;

    // Inject sidebar as first child of #app
    const app = document.getElementById('app');
    app.insertAdjacentHTML('afterbegin', sidebarHTML);
})();

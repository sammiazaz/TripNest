import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Trip Spaces', href: '/trips' },
      { label: 'Shared Gallery', href: '/memory-vault' },
      { label: 'Expense Tracker', href: '/finances' },
      { label: 'Live Itinerary', href: '/itinerary' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/support' },
      { label: 'Community Guidelines', href: '/support' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
  {
    title: 'Developers',
    links: [
      // { label: 'Project Wiki', href: '#' },
      // { label: 'System Status', href: '#' },
      // { label: 'Tech Stack', href: '#' },
      { label: 'GitHub Repo', href: 'https://github.com/raushgit' },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative mt-0 overflow-hidden border-t border-slate-200/60"
      style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}
    >
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3498db]/30 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-8">
        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-3">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3498db] text-white shadow-md shadow-[#3498db]/20 transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-[#191c1d] transition-colors group-hover:text-[#3498db]">
                TripNest
              </span>
            </Link>
            <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-slate-500">
              Collaborative trip planning, shared memories, and effortless expense splitting — all in one place.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {[
                { label: 'Twitter', path: 'M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z', vb: '0 0 24 24' },
                { label: 'GitHub', path: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z', vb: '0 0 24 24' },
                { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z', vb: '0 0 24 24' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  title={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition-all duration-300 hover:bg-[#3498db]/10 hover:text-[#3498db] hover:scale-110"
                >
                  <svg viewBox={s.vb} className="h-4 w-4 fill-current">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#3498db]">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group/link inline-flex items-center text-sm text-slate-500 transition-all duration-300 hover:translate-x-0.5 hover:text-[#3498db]"
                    >
                      <span className="mr-0 w-0 overflow-hidden text-[#3498db] opacity-0 transition-all duration-300 group-hover/link:mr-1.5 group-hover/link:w-3 group-hover/link:opacity-100">
                        →
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200/60 py-8 md:flex-row">
          <p className="text-sm text-slate-400">
            © 2026 TripNest. Created by <span className="font-semibold text-slate-500">Sammi Azaz</span>.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-slate-400 transition-colors duration-300 hover:text-[#3498db]">
              Privacy
            </Link>
            <span className="h-3 w-px bg-slate-200" />
            <Link href="/terms" className="text-xs text-slate-400 transition-colors duration-300 hover:text-[#3498db]">
              Terms
            </Link>
            <span className="h-3 w-px bg-slate-200" />
            <Link href="/support" className="text-xs text-slate-400 transition-colors duration-300 hover:text-[#3498db]">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

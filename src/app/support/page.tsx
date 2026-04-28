import Link from 'next/link';

export const metadata = {
  title: 'Support Center — TripNest',
  description: 'Get help with TripNest — FAQs, guides, and contact information.',
};

const FAQ = [
  {
    q: 'How do I create a new trip?',
    a: 'Navigate to the "My Trips" page from the sidebar and click the "Create Trip" button. Enter a trip name, select your dates, and invite your travel companions using the generated invite link.',
  },
  {
    q: 'How do I invite friends to my trip?',
    a: 'Each trip has a unique invite code and link. Share the link directly with friends, or give them the code to enter on the Join page. Anyone with the link can join your trip instantly.',
  },
  {
    q: 'How does expense splitting work?',
    a: 'When you add an expense, specify who paid and how to split it among members. TripNest automatically calculates who owes whom, showing net balances on the Dashboard and Finances page. Actual payments are settled outside the app.',
  },
  {
    q: 'Can I upload photos to a trip?',
    a: 'Yes! Use the Memory Vault feature available from the Shared Space section. Upload photos from your trip, add captions, and all trip members can view, like, and comment on them.',
  },
  {
    q: 'How do I change my password?',
    a: 'Go to Settings → Account Security → Update Password. You\'ll need to enter your current password and then set a new one.',
  },
  {
    q: 'Can I delete my account?',
    a: 'Yes. Go to Settings, scroll to the Danger Zone at the bottom, and click "Delete My Account." This permanently removes all your data, trip memberships, and uploaded content.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. Passwords are hashed with bcrypt, all traffic is encrypted via HTTPS, and our database runs on SOC 2 compliant infrastructure. Read our full Privacy Policy for details.',
  },
  {
    q: 'Why does the map show a different location?',
    a: 'The map automatically geocodes your trip name to find the destination. If your trip name doesn\'t contain a recognizable place, the map may default to a world view. Try including a city or region name in your trip title.',
  },
];

export default function SupportCenterPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#191c1d]">
      {/* Navbar */}
      <nav
        className="fixed top-0 w-full z-50 border-b border-black/5 shadow-sm"
        style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-[900px] mx-auto px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tighter text-[#191c1d] hover:text-blue-700 transition-colors">
            TripNest
          </Link>
          <Link href="/" className="text-sm text-[#444748] hover:text-[#191c1d] transition-colors font-medium">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <main className="max-w-[900px] mx-auto px-8 pt-28 pb-20">
        <h1 className="text-4xl font-bold tracking-tight text-[#191c1d] mb-2">Support Center</h1>
        <p className="text-sm text-[#526069] mb-12">Find answers, guides, and ways to reach our team.</p>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 text-2xl">
              ✉️
            </div>
            <h3 className="font-bold text-lg mb-1">Email Support</h3>
            <p className="text-sm text-[#526069] mb-3">We typically respond within 24 hours on business days.</p>
            <a href="mailto:support@tripnest.io" className="text-blue-600 text-sm font-semibold hover:underline">
              support@tripnest.io
            </a>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 text-2xl">
              💬
            </div>
            <h3 className="font-bold text-lg mb-1">Community</h3>
            <p className="text-sm text-[#526069] mb-3">Connect with other travelers, share tips, and get help from the community.</p>
            <span className="text-blue-600 text-sm font-semibold">Coming Soon</span>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 text-2xl">
              📖
            </div>
            <h3 className="font-bold text-lg mb-1">Documentation</h3>
            <p className="text-sm text-[#526069] mb-3">Guides, tutorials, and API docs for developers.</p>
            <span className="text-blue-600 text-sm font-semibold">Coming Soon</span>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-bold text-[#191c1d] mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ.map((item, idx) => (
            <details
              key={idx}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-semibold text-[#191c1d] hover:bg-slate-50/50 transition-colors list-none">
                <span>{item.q}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform duration-200 text-xl">
                  ▾
                </span>
              </summary>
              <div className="px-6 pb-5 text-[#444748] leading-relaxed border-t border-slate-50">
                <p className="pt-4">{item.a}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Still need help */}
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-[#191c1d] mb-2">Still need help?</h3>
          <p className="text-[#526069] mb-4">Our support team is here for you.</p>
          <a
            href="mailto:support@tripnest.io"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8 px-8">
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#526069]">
          <span className="font-bold">TripNest Inc.</span>
          <div className="flex gap-6 font-semibold uppercase tracking-wider">
            <Link href="/privacy" className="hover:text-[#191c1d] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#191c1d] transition-colors">Terms of Service</Link>
            <span className="text-blue-600">Support Center</span>
          </div>
          <span>© 2026 TripNest Inc.</span>
        </div>
      </footer>
    </div>
  );
}

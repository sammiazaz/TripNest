import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — TripNest',
  description: 'Learn how TripNest collects, uses, and protects your personal data.',
};

export default function PrivacyPolicyPage() {
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
        <h1 className="text-4xl font-bold tracking-tight text-[#191c1d] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#526069] mb-12">Last updated: January 15, 2026</p>

        <div className="space-y-10 text-[#444748] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              TripNest collects information you provide directly when you create an account, plan trips, and interact with our platform. This includes:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Account Information:</strong> Your name, email address, profile photo, and password (stored securely as a hashed value).</li>
              <li><strong>Trip Data:</strong> Trip names, descriptions, dates, destinations, itineraries, and shared photos uploaded to the Memory Vault.</li>
              <li><strong>Financial Data:</strong> Expense descriptions, amounts, and split calculations. We do not store credit card or banking details.</li>
              <li><strong>Usage Data:</strong> Device type, browser, IP address, and interaction patterns to improve the experience.</li>
              <li><strong>Location Data:</strong> Only when you explicitly enable real-time location sharing during active trips.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>To create and manage your TripNest account and authenticate your identity.</li>
              <li>To enable collaborative trip planning features including shared itineraries, polls, packing lists, and expense splitting.</li>
              <li>To deliver notifications about trip updates, new photos, poll results, and expense changes.</li>
              <li>To provide geocoded map views of your trip destinations.</li>
              <li>To improve and personalize the TripNest platform through anonymous analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">3. Information Sharing</h2>
            <p className="mb-3">
              TripNest is built around collaboration. The following data is shared within your trip groups:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Your name, avatar, and profile are visible to members of trips you belong to.</li>
              <li>Trip content (photos, expenses, polls, itinerary) is shared with all trip members.</li>
              <li>We never sell your personal data to third parties.</li>
              <li>We may share anonymized, aggregated data for analytics purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">4. Data Security</h2>
            <p>
              We take data security seriously. All passwords are hashed using industry-standard bcrypt encryption. Data in transit is protected via HTTPS/TLS. Our database is hosted on secure, SOC 2 compliant infrastructure. Access to production systems is limited to authorized personnel only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">5. Data Retention</h2>
            <p>
              Your data is retained as long as your account is active. If you delete your account, all personal data, trip memberships, and uploaded content are permanently removed within 30 days. Anonymized analytics data may be retained indefinitely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">6. Cookies</h2>
            <p>
              TripNest uses essential session cookies to keep you logged in and maintain your preferences. We do not use third-party advertising cookies. Analytics cookies are anonymized and used solely to improve the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">7. Your Rights</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Access:</strong> You can view all your personal data from the Account Center.</li>
              <li><strong>Correction:</strong> Update your profile information at any time via Settings.</li>
              <li><strong>Deletion:</strong> Request complete account deletion from the Danger Zone in Settings.</li>
              <li><strong>Export:</strong> Request an export of all your data by contacting support.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">8. Third-Party Services</h2>
            <p>TripNest integrates with the following services:</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li><strong>OpenStreetMap / Nominatim:</strong> For geocoding trip destinations and rendering maps.</li>
              <li><strong>Stadia Maps:</strong> For map tile rendering on the dashboard.</li>
              <li><strong>Cloudinary:</strong> For image storage and delivery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@tripnest.io" className="text-blue-600 font-semibold hover:underline">privacy@tripnest.io</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8 px-8">
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#526069]">
          <span className="font-bold">TripNest Inc.</span>
          <div className="flex gap-6 font-semibold uppercase tracking-wider">
            <span className="text-blue-600">Privacy Policy</span>
            <Link href="/terms" className="hover:text-[#191c1d] transition-colors">Terms of Service</Link>
            <Link href="/support" className="hover:text-[#191c1d] transition-colors">Support Center</Link>
          </div>
          <span>© 2026 TripNest Inc.</span>
        </div>
      </footer>
    </div>
  );
}

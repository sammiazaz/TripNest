import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — TripNest',
  description: 'Review the Terms of Service governing your use of TripNest.',
};

export default function TermsOfServicePage() {
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
        <h1 className="text-4xl font-bold tracking-tight text-[#191c1d] mb-2">Terms of Service</h1>
        <p className="text-sm text-[#526069] mb-12">Effective: January 15, 2026</p>

        <div className="space-y-10 text-[#444748] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using TripNest ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Service. TripNest reserves the right to update these terms at any time, and continued use constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">2. Account Registration</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for maintaining the security of your account credentials.</li>
              <li>You must be at least 13 years old to use TripNest.</li>
              <li>One person may not maintain more than one account.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">3. Collaborative Trip Planning</h2>
            <p className="mb-3">TripNest enables collaborative trip planning. By using these features, you agree that:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Content you add to a trip (itineraries, photos, polls, expenses) is visible to all members of that trip.</li>
              <li>Trip administrators may remove members or modify trip content.</li>
              <li>Invite links grant access to anyone who uses them; share them responsibly.</li>
              <li>You will not upload harmful, offensive, or illegal content to any trip.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">4. Expense Splitting</h2>
            <p className="mb-3">
              TripNest provides expense tracking and splitting tools for convenience. You acknowledge that:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>TripNest does not process payments. All settlements between users occur outside the platform.</li>
              <li>Expense calculations are provided as-is. You are responsible for verifying amounts.</li>
              <li>TripNest is not liable for any financial disputes between trip members.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">5. User Content</h2>
            <p className="mb-3">You retain ownership of all content you upload to TripNest. By uploading content, you grant TripNest a non-exclusive, worldwide license to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Store, display, and distribute your content to trip members as part of the Service.</li>
              <li>Create thumbnails and optimized versions for performance.</li>
            </ul>
            <p className="mt-3">
              This license terminates when you delete your content or account. You may not upload content that infringes on intellectual property rights of others.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">6. Prohibited Conduct</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Use the Service for any unlawful purpose.</li>
              <li>Harass, threaten, or abuse other users.</li>
              <li>Attempt to gain unauthorized access to other accounts or systems.</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service.</li>
              <li>Use automated tools to scrape or extract data from the Service.</li>
              <li>Upload malware, viruses, or any malicious code.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">7. Service Availability</h2>
            <p>
              TripNest strives for high availability but does not guarantee uninterrupted service. We may temporarily suspend the Service for maintenance, updates, or unforeseen circumstances. We are not liable for any loss resulting from service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">8. Termination</h2>
            <p>
              You may delete your account at any time from the Settings page. TripNest reserves the right to suspend or terminate accounts that violate these terms. Upon termination, your data will be deleted in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">9. Limitation of Liability</h2>
            <p>
              TripNest is provided "as is" without warranties of any kind. To the maximum extent permitted by law, TripNest Inc. shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191c1d] mb-3">10. Contact</h2>
            <p>
              Questions about these Terms should be sent to{' '}
              <a href="mailto:legal@tripnest.io" className="text-blue-600 font-semibold hover:underline">legal@tripnest.io</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8 px-8">
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#526069]">
          <span className="font-bold">TripNest Inc.</span>
          <div className="flex gap-6 font-semibold uppercase tracking-wider">
            <Link href="/privacy" className="hover:text-[#191c1d] transition-colors">Privacy Policy</Link>
            <span className="text-blue-600 hover:text-[#191c1d] transition-colors">Terms of Service</span>
            <Link href="/support" className="hover:text-[#191c1d] transition-colors">Support Center</Link>
          </div>
          <span>© 2026 TripNest Inc.</span>
        </div>
      </footer>
    </div>
  );
}

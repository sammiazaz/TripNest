'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, Users, CircleUserRound } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setError('Please accept the Terms of Service and Privacy Policy.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const signInResult = await signIn('credentials', { email, password, redirect: false });
      if (signInResult?.ok) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    } else {
      setError('Signup failed. This email may already be in use.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] text-[#181c20]">
      <nav className="border-b border-[#7ea5c5] bg-[#9ac1df]">
        <div className="mx-auto flex h-20 w-full max-w-[1300px] items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-4xl font-extrabold tracking-tight text-[#2c5f8f]">TripNest</Link>
            <div className="hidden items-center gap-7 md:flex">
              <a href="#" className="border-b-2 border-[#4c78a7] pb-1 text-lg font-medium text-[#4c78a7]">
                Explore
              </a>
              <a href="#" className="text-lg font-medium text-[#4f6478] hover:text-[#3f5974]">
                Trips
              </a>
              <a href="#" className="text-lg font-medium text-[#4f6478] hover:text-[#3f5974]">
                Community
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-5">
            <button type="button" className="hidden text-[#4f6478] md:inline-flex" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button type="button" className="hidden text-[#4f6478] md:inline-flex" aria-label="Members">
              <Users size={18} />
            </button>
            <button
              type="button"
              className="rounded-full bg-[#137dd4] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              Start Planning
            </button>
            <button type="button" className="text-[#2f7f89]" aria-label="Profile">
              <CircleUserRound size={30} />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex min-h-[calc(100vh-80px)] flex-col md:flex-row">
        <section className="flex w-full flex-col justify-between bg-[#F8F9FA] px-8 py-12 md:w-1/2 md:px-14 md:py-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold tracking-tight text-[#181c20]">TripNest</Link>
          </div>

          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-[#181c20] md:text-5xl">Create Your Account</h1>
              <p className="text-base text-[#3f4850]">Start your next collaborative adventure with ease.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-[#707881]">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-transparent bg-[#F1F3F5] px-4 py-3 outline-none transition-all focus:border-[#3498db] focus:bg-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#707881]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-transparent bg-[#F1F3F5] px-4 py-3 outline-none transition-all focus:border-[#3498db] focus:bg-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#707881]">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-transparent bg-[#F1F3F5] px-4 py-3 pr-12 outline-none transition-all focus:border-[#3498db] focus:bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#707881]"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-[#bfc7d2] text-[#3498db] focus:ring-[#3498db]/20"
                />
                <span className="text-sm text-[#3f4850]">
                  I agree to the{' '}
                  <Link className="text-[#3498db] hover:underline" href="/terms">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link className="text-[#3498db] hover:underline" href="/privacy">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#3498db] py-3 font-semibold text-white shadow-lg shadow-[#3498db]/20 transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>

            <div className="flex items-center py-2">
              <div className="h-px flex-grow bg-[#bfc7d2]" />
              <span className="mx-4 text-sm text-[#707881]">Or sign up with</span>
              <div className="h-px flex-grow bg-[#bfc7d2]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="rounded-lg border border-[#bfc7d2] py-3 text-sm font-semibold transition-colors hover:bg-[#f1f4fa]"
              >
                Google
              </button>
              <button
                type="button"
                className="rounded-lg border border-[#bfc7d2] py-3 text-sm font-semibold transition-colors hover:bg-[#f1f4fa]"
              >
                Apple
              </button>
            </div>
          </div>

          <div className="pt-6 text-center">
            <p className="text-base text-[#3f4850]">
              Already have an account?
              <Link href="/login" className="ml-1 font-semibold text-[#006397] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </section>

        <section className="relative hidden overflow-hidden md:block md:w-1/2">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApzf8Ot_11Rd26AZp8NUDw9Omv884yZ6QdHVjtOPl8o-kZFvy5jRBUG_xX9kMBJb0vJqufmrrEWMHVzQ0IFs_v_05zxVUW8_yZzlKSz5DxxDC0ecjdqny1dhbwYplOCm7euxbpW_-oOgC3aOsw-3KDhKAKs74GU55lm3l-vRkjOsyz9NVY499nw2ILwMuklyP_NHBbjoYu5OGD8YyJNGG2hHJAti8EicM1Yw_gGfQZDckply8CuOrb69NOK473SZhuOkX-daZUayKs')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-lg space-y-5 rounded-2xl border border-white/30 bg-white/70 p-10 shadow-2xl backdrop-blur-xl">
              <p className="text-2xl tracking-wide text-[#3498db]">★★★★★</p>
              <p className="text-2xl italic leading-snug text-[#181c20]">
                TripNest changed how our team travels. Effortless planning, gorgeous interface, and zero stress.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/50">
                  <img
                    className="h-full w-full object-cover"
                    alt="Marcello Rossi portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRbtq9MSWJBtFw8D6b8x08e5MItdgm1JT_gZdTdWaRwkNMxkonw_lKr1FPefMUXzm01_SGbHyGj-DmCfaCH4pcRTWgRK3SnRf8xPXO-t_xe-u1SpxZWhksa93xlc275V9HsmN5e7x4FadMKMqAuaghu110mPqe3_rZzOfhdwnW4pJj_Yoqb9djjSZuLQT_B5-aTFh5mwUvC_ul7L0nNF5_1p8z4xqfT8QXhsejtdo3cexPJG3WDcXvagKxUtFtwH_ZebPS6XsYqqGB"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#181c20]">Marcello Rossi</p>
                  <p className="text-sm text-[#3f4850]">Creative Director, Roma Design</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 right-10">
            <div className="rounded-full border border-white/30 bg-white/70 px-4 py-2 text-sm font-medium text-[#181c20] backdrop-blur-xl">
              Positano, Italy
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-slate-200 bg-slate-50 px-8 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <span className="text-sm text-slate-500">© 2026 TripNest. Effortless Discovery.</span>
          <div className="flex gap-6">
            <Link className="text-sm text-slate-500 transition-colors hover:text-blue-500" href="/terms">
              Terms of Service
            </Link>
            <Link className="text-sm text-slate-500 transition-colors hover:text-blue-500" href="/privacy">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
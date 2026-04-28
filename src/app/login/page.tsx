'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, Users, CircleUserRound } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.ok) {
      router.push('/dashboard');
    } else {
      setError('Login failed. Please check your email and password.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#181c20]">
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
        <section className="flex min-h-screen w-full flex-col justify-between px-8 py-10 md:w-1/2 md:px-12 md:py-14 lg:w-5/12">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight text-sky-600">TripNest</Link>
          </div>

          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-[#181c20] md:text-5xl">Welcome Back</h1>
              <p className="text-base text-[#3f4850]">Please enter your details to access your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#3f4850]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-transparent bg-[#F1F3F5] px-4 py-3 text-[#181c20] outline-none transition-all duration-200 placeholder:text-[#707881] focus:border-[#006397] focus:bg-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-[#3f4850]">
                    Password
                  </label>
                  <a href="#" className="text-sm text-[#006397] transition-all hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-transparent bg-[#F1F3F5] px-4 py-3 text-[#181c20] outline-none transition-all duration-200 placeholder:text-[#707881] focus:border-[#006397] focus:bg-white"
                  required
                />
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#3498db] py-3 font-semibold text-white shadow-lg transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#bfc7d2]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#F8F9FA] px-4 text-[#3f4850]">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-[#bfc7d2] px-4 py-3 transition-colors hover:bg-[#f1f4fa]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm font-semibold text-[#181c20]">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-[#bfc7d2] px-4 py-3 transition-colors hover:bg-[#f1f4fa]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.05 20.28c-.96.95-2.04 1.44-3.23 1.44-1.25 0-2.43-.53-3.56-.53s-2.47.53-3.6.53c-1.15 0-2.23-.49-3.23-1.44-1.95-1.95-2.92-4.5-2.92-7.64 0-3.14.97-5.69 2.92-7.64 1-.95 2.08-1.44 3.23-1.44 1.25 0 2.43.53 3.56.53s2.47-.53 3.6-.53c1.15 0 2.23.49 3.23 1.44 1.95 1.95 2.92 4.5 2.92 7.64 0 3.14-.97 5.69-2.92 7.64z" fill="currentColor" />
                </svg>
                <span className="text-sm font-semibold text-[#181c20]">Apple</span>
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-base text-[#3f4850]">
              Don&apos;t have an account?
              <Link href="/signup" className="ml-1 font-semibold text-[#006397] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-[#ebeef4] md:block md:w-1/2 lg:w-7/12">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            alt="Mediterranean coastline"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSOVjGo2l1HEuCXUrfuEFko7x9Kg6682vr1mfFH0XldlFJYKTTk_FLuOkJTk1xMo-e26xkaPoKkuY09xSQEr5LKmIpCNaURw6bhDOpMrCkLwytcSpEUkqjgqV8hXV3HwPsOlLdOaxim6oOPfnhrPLoHzuxnoJT9YmDY4gVRtysImNsYyBuBxZZmYK8yIVIaqayzOnEberJkbfel_FhQKi3WL2n8JOTq1si7Xa528O3U_uYDmGzfJLDl3DlPVEaAYl-wATYQ9iM7SMj"
          />
          <div className="absolute bottom-10 left-10 right-10 lg:right-auto lg:max-w-md">
            <div className="space-y-4 rounded-xl border border-white/30 bg-white/85 p-8 shadow-[0_10px_30px_rgba(52,152,219,0.08)] backdrop-blur-xl">
              <p className="text-4xl leading-none text-[#006397]">"</p>
              <p className="text-lg italic leading-relaxed text-[#181c20]">
                The world is a book and those who do not travel read only one page. TripNest helped me discover
                chapters I never knew existed.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-[#cce5ff]">
                  <img
                    className="h-full w-full object-cover"
                    alt="Sarah Mitchell portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAaqmuPZEO21wxkmAKXh4msNKFkMHoUFWP_76o0cwWfnjTA28RGLtufUnXsfR8xyXtkXMRGrdHxpqQsLb08L4q7y1WrXfrf2FCg01IBotk9UDwe3-CEGxMni9oE7wXT_efeR3uHpJ-W-m0cMN7u71AzM4h3-vTu_qN2H7I6UyNetieexZLQF3sGj3nhaIcvUqtlST96SUVSCYG9VNcFJLkrYyNlyyHo0JqPUBfvrybgi4MBWe_oOIMOJCa-ra38yz6clg_19xkrRc3"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#181c20]">Sarah Mitchell</p>
                  <p className="text-xs text-[#3f4850]">Frequent Traveler, Digital Nomad</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex w-full flex-col items-center justify-between gap-4 border-t border-slate-200 bg-slate-50/50 px-8 py-6 backdrop-blur-sm md:flex-row md:px-12">
        <p className="text-sm font-light text-slate-500">© 2026 TripNest. Effortless Discovery.</p>
        <div className="flex gap-6">
          <Link className="text-sm font-light text-slate-500 transition-opacity hover:opacity-80 hover:underline" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="text-sm font-light text-slate-500 transition-opacity hover:opacity-80 hover:underline" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-sm font-light text-slate-500 transition-opacity hover:opacity-80 hover:underline" href="/support">
            Help Center
          </Link>
        </div>
      </footer>
    </div>
  );
}
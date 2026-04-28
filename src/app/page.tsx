import Link from 'next/link';
import { Footer } from '@/components/Footer';
import {
  ArrowRight,
  Compass,
  Users,
  CalendarDays,
  Wallet,
  Sparkles,
  CloudOff,
  MapPin,
  Star,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#191c1d] font-sans overflow-x-hidden">
      {/* Blurred hero background */}
      <div
        className="fixed inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJyMjy_PVttFGS5yqT-WyUxHGg-xvAAyfcfcvEMk-115EwWxYivfrx9V6DkVhV-1SFM8Z0bu0W9XBj4zVvzxcWVtCrHjq9-OKNJkNvuA9IxTIOCBZICc48Bh6iBf7H1xxBQLHzBcupGJTVIEnwDfzssIsnXHDpyR-A2DLcuV4cks66kZQSGO-n5-rHJD2-cs2naw-g6bhXy5NpYm37yoyhE8nqNLfqiiEdri72WclvmH4kxuWlp-9o4HmuSCJxPJlGPMy0pSMKTlPf')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(40px) brightness(1.05)',
        }}
      />

      {/* Mesh gradient overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(71,234,237,0.1) 0%, transparent 40%),
                       radial-gradient(circle at 80% 70%, rgba(253,139,0,0.05) 0%, transparent 40%)`,
        }}
      />

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 w-full z-50 border-b border-black/5 shadow-sm"
        style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-[1280px] mx-auto px-8 h-20 flex items-center justify-end relative">
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-2xl font-black tracking-tighter text-[#191c1d] hover:text-blue-700 transition-colors">TripNest</Link>
          <div className="flex items-center gap-2">
            <Link href="/login" className="px-5 py-2.5 text-[#444748] hover:text-[#191c1d] transition-all text-sm font-medium">
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 bg-[#3498db] text-white font-bold rounded-lg text-sm hover:scale-105 active:scale-95 transition-transform"
              style={{ boxShadow: '0 4px 20px rgba(52,152,219,0.3)' }}
            >
              Start Your Trip Space
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-20">
        {/* ─── HERO ─── */}
        <section className="max-w-[1280px] mx-auto px-8 pt-20 pb-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left copy */}
            <div className="lg:w-1/2 z-10">
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#954a00] mb-3 block">
                Next-Gen Travel Planning
              </span>
              <h1 className="text-[clamp(48px,6vw,84px)] font-[900] leading-[0.95] tracking-[-0.06em] text-[#191c1d] mb-8">
                Your next adventure, <span className="text-blue-600">perfectly nested.</span>
              </h1>
              <p className="text-[20px] leading-relaxed text-slate-500 max-w-xl mb-12 font-medium">
                The all-in-one collaborative space to plan itineraries, split expenses, and store memories with your squad.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#3498db] text-white font-bold text-lg rounded-xl hover:scale-105 active:scale-95 transition-transform"
                style={{ boxShadow: '0 10px 40px rgba(52,152,219,0.3)' }}
              >
                Start Your Trip Space
                <ArrowRight size={22} />
              </Link>
            </div>

            {/* Right hero card */}
            <div
              className="lg:w-1/2 w-full h-[560px] rounded-3xl overflow-hidden relative shadow-2xl border border-white/50"
              style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)' }}
            >
              {/* Map background */}
              <div className="absolute inset-0 opacity-40 blur-[1px]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpLQgvxQjkKV_b6J8zJyEQ5YJ6v1Ssj4YyY24-h5OnoYZ-nRpHbewUxvhx62Ew0VMD0t6phxilWosdS5XO_fdzzhUW3re96KGptQ6k3niSwVrw8iCEtZcYp7IXANTwGuQQ_ToJqij5EEUL8CwsC_y_2YrLONArW5SZnS0oaq3YKY2RivHIVNSbFjNaMfM6t_YF4uYGqnMz3-IxfrKer95MCsdREWOBWm1gF5PdQ98KIDNX3e6HCbc3yBKQ3pI6VXjSd5y510jsYfUj"
                  alt="Map of Europe"
                  className="w-full h-full object-cover grayscale"
                />
              </div>

              {/* SVG threads */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 560">
                <path d="M300,280 L200,140" fill="none" stroke="#00ced1" strokeWidth="2.5" strokeDasharray="10" style={{ filter: 'drop-shadow(0 0 4px rgba(0,105,107,0.3))' }} />
                <path d="M300,280 L450,200" fill="none" stroke="#fd8b00" strokeWidth="2.5" strokeDasharray="10" style={{ filter: 'drop-shadow(0 0 4px rgba(253,139,0,0.3))' }} />
                <path d="M300,280 L380,460" fill="none" stroke="#00ced1" strokeWidth="2.5" strokeDasharray="10" style={{ filter: 'drop-shadow(0 0 4px rgba(0,105,107,0.3))' }} />
              </svg>

              {/* Avatar */}
              <div className="absolute top-[260px] left-[272px] z-10">
                <div
                  className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                  style={{ boxShadow: '0 0 0 4px rgba(71,234,237,0.4), 0 0 20px rgba(71,234,237,0.6)' }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJPdkIGrpHGVUiO6fpmK2pxzf7Yejx4RexOdC9-uJAS8ooCt6tnrjKK_9SWAO2vhkhGZVwS6ZhDieVomviyzxgimt371PO1kD7bR7GTt45p52o0OJ8TdWxLLWL1tWwwS1ciMnJwj1cr9NCrBqEItKiTq9bvdQ5cgWSQHSq9E8ENB1z4_KGPKHp5_3VXulU-mf-MkhByY-6ndvFgzdKZa6KTM9CpyyjHajArPmyQfRBVdHlzWoJvgu-dgdrh3c--8gysrDPVKkW_3lD"
                    alt="Sarah"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-[#00696b] px-2 py-0.5 rounded text-white shadow-md whitespace-nowrap">
                  Sarah
                </span>
              </div>

              {/* Gallery float card */}
              <div
                className="absolute top-[70px] left-[32px] p-3 rounded-xl w-48 shadow-xl border border-white/50 animate-pulse z-10"
                style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', borderTop: '0.5px solid rgba(255,255,255,0.8)' }}
              >
                <div className="h-24 w-full rounded-lg overflow-hidden mb-3 shadow-inner">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJyMjy_PVttFGS5yqT-WyUxHGg-xvAAyfcfcvEMk-115EwWxYivfrx9V6DkVhV-1SFM8Z0bu0W9XBj4zVvzxcWVtCrHjq9-OKNJkNvuA9IxTIOCBZICc48Bh6iBf7H1xxBQLHzBcupGJTVIEnwDfzssIsnXHDpyR-A2DLcuV4cks66kZQSGO-n5-rHJD2-cs2naw-g6bhXy5NpYm37yoyhE8nqNLfqiiEdri72WclvmH4kxuWlp-9o4HmuSCJxPJlGPMy0pSMKTlPf"
                    alt="Amalfi Coast"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#444748]">Amalfi, Italy</span>
                  <span className="text-[10px] font-bold text-[#00696b]">2s ago</span>
                </div>
              </div>

              {/* Poll float card */}
              <div
                className="absolute top-[150px] right-[32px] p-4 rounded-xl w-56 shadow-xl border border-white/50 z-10"
                style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', borderTop: '0.5px solid rgba(255,255,255,0.8)' }}
              >
                <h4 className="font-bold text-sm text-[#191c1d] mb-3">Should we hike tomorrow?</h4>
                <div className="space-y-2">
                  <div className="h-8 rounded-lg flex items-center px-3 justify-between border border-[#00696b]/20 bg-[#00696b]/10">
                    <span className="text-xs text-[#00696b] font-semibold">Yes, sunrise hike</span>
                    <span className="text-xs font-bold text-[#00696b]">65%</span>
                  </div>
                  <div className="h-8 rounded-lg flex items-center px-3 justify-between border border-black/5 bg-black/5">
                    <span className="text-xs text-[#444748]">Sleep in</span>
                    <span className="text-xs font-bold text-[#444748]">35%</span>
                  </div>
                </div>
              </div>

              {/* Expense float card */}
              <div
                className="absolute bottom-[70px] right-[64px] p-3 rounded-xl flex items-center gap-3 shadow-xl border border-white/50 z-10"
                style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', borderTop: '0.5px solid rgba(255,255,255,0.8)' }}
              >
                <div className="w-8 h-8 rounded-full bg-[#954a00]/10 flex items-center justify-center text-[#954a00]">
                  <Wallet size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#444748]">Liam paid for</p>
                  <p className="text-sm font-bold text-[#191c1d]">€12.50 for Gelato</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FEATURE BENTO GRID ─── */}
        <section id="features" className="max-w-[1280px] mx-auto px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:h-[600px]">
            {/* Big collaborative card */}
            <div
              className="md:col-span-8 rounded-[2rem] p-10 flex flex-col justify-end relative overflow-hidden group shadow-lg border border-white/50"
              style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)' }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNbAmQE9K6tlW9cwFHC1Pnej3TXCKt3RQg0fNVDej134bX6kDcTAHBF_hG05SmiQDYLURYgM0KTkUPP4qlCSIosqttP04H0sy_qe3mXnhuaP6pi9lIf31N2NJmpdkFxZkTpg2lYJihnGhKPeUa6CwZjrtSkKRu4rK1C_d3itSiQkdbE630NDybVyzMenDyjcXsKZitW5oaPVMltD7YNmlbn0lCCNMCfm0XEGFTe2LjPz50UewO1fB2stHAciWz4WEwS4v6YMf5lXVp"
                alt="Collaborative Itineraries"
                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
              />
              <div className="z-10">
                <h3 className="text-[32px] font-bold leading-[1.3] tracking-[-0.01em] text-[#191c1d] mb-3">Collaborative Itineraries</h3>
                <p className="text-[#444748] max-w-lg mb-5">Edit plans simultaneously with your travel partners. Drag, drop, and decide together in one seamless canvas.</p>
                <Link href="/signup" className="text-[#00696b] flex items-center gap-1 font-bold hover:gap-3 transition-all">
                  Explore tools <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Smart suggestions card */}
            <div
              className="md:col-span-4 rounded-[2rem] p-10 bg-[#00696b]/5 border border-[#00696b]/20 flex flex-col justify-between shadow-lg"
              style={{ backdropFilter: 'blur(20px)' }}
            >
              <Sparkles size={40} className="text-[#00696b]" />
              <div>
                <h3 className="text-[32px] font-bold leading-[1.3] tracking-[-0.01em] text-[#191c1d] mb-3">Smart Suggestions</h3>
                <p className="text-[#444748]">AI-powered recommendations based on your group&apos;s unique travel style and previous favorites.</p>
              </div>
            </div>

            {/* Unlimited sync card */}
            <div
              className="md:col-span-4 rounded-[2rem] p-10 flex flex-col justify-between shadow-lg border border-white/50"
              style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)' }}
            >
              <div className="flex -space-x-3">
                {[
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDc2OnBTl_KFBSAuaTRncwuTQgwt83sEU-gIZHOGydsWDMyuu52Y6IJinn5gHZT3ggpnGmdSoQFCSz8f4AenUr8Z8ak2oTe27-IwD6CdKgTcn2DZiYAbAbTpMaeMypb5m8TpUfEeho9PXIEISNWZRvKK8hqsX2yCAFm4BcUOyZybFuzTq6gKcvEHT4h4NBC6290O4wdV1PVau-CJNzIsLDNvfFFpTFVFeypCR-f9E5usYAVXW_YvhUvFr3rwdhc9HAAVCx1i_DBgICz',
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAVWw6BgWVASzyBJ7xaQ4j2e5YemCwbLO1a68vn1fR0GmQ3DXTDBIxnrz9tp7_dH0OQrEkaWypP9MNpV0iuPj14jxi-ckF6aKbdXgc-5yWXbY_vEooku6MSXsZkgOAdbVeBACQ5dWF7VBl6kZd93eAeQi6JVmStJbMKa4FRoxH__ykIfgteb5zgJfC1i7GMGZqH3GqY_zddj4EJoEgFipxaBtqx24H-MoemRCCPsq5QnIR8UAPHzKPTdz0lYgAXmV46zIcC4adom6nZ',
                ].map((src, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm bg-gray-200">
                    <img src={src} alt="traveler" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#00696b]/20 flex items-center justify-center text-[10px] text-[#00696b] font-bold shadow-sm">+12</div>
              </div>
              <div>
                <h3 className="text-[32px] font-bold leading-[1.3] tracking-[-0.01em] text-[#191c1d] mb-3">Unlimited Sync</h3>
                <p className="text-[#444748]">Invite the whole family or the entire marketing team.</p>
              </div>
            </div>

            {/* Offline card */}
            <div
              className="md:col-span-8 rounded-[2rem] p-10 flex items-center gap-10 shadow-lg border border-white/50"
              style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)' }}
            >
              <div className="w-1/4 aspect-square rounded-2xl bg-[#954a00]/5 flex items-center justify-center border border-[#954a00]/10 shrink-0">
                <CloudOff size={56} className="text-[#954a00]" />
              </div>
              <div>
                <h3 className="text-[32px] font-bold leading-[1.3] tracking-[-0.01em] text-[#191c1d] mb-3">Offline Access</h3>
                <p className="text-[#444748] max-w-md">No signal in the mountains? No problem. TripNest works offline and syncs as soon as you&apos;re back on the grid.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FEATURED DESTINATIONS ─── */}
        <section className="max-w-[1280px] mx-auto px-8 pb-32">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#00696b] mb-3 block">
                Get Inspired
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#191c1d]">
                Trending Nesting Spots
              </h2>
            </div>
            <Link href="/signup" className="group flex items-center gap-2 font-bold text-[#191c1d]">
              Explore all destinations
              <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-[#3498db] group-hover:text-white transition-all">
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Kyoto, Japan', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800', tags: ['Culture', 'Serene'] },
              { name: 'Santorini, Greece', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800', tags: ['Romantic', 'Views'] },
              { name: 'Reykjavik, Iceland', img: 'https://images.unsplash.com/photo-1520637102912-2df6bb2aec6d?auto=format&fit=crop&q=80&w=800', tags: ['Adventure', 'Nature'] },
              { name: 'Bali, Indonesia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800', tags: ['Tropical', 'Relax'] },
            ].map((item, idx) => (
              <div key={idx} className="group relative h-[420px] rounded-[2rem] overflow-hidden shadow-xl cursor-pointer">
                <img
                  src={item.img}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex gap-2 mb-3">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-2xl font-bold">{item.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section id="how-it-works" className="max-w-[1280px] mx-auto px-8 pb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#191c1d] mb-4">
              Your Journey, Simplified
            </h2>
            <p className="text-lg text-[#444748] max-w-2xl mx-auto">
              Three simple steps to your most organized adventure yet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Create Your Nest',
                desc: 'Set up your trip space in seconds. Give it a name, dates, and a destination.',
                icon: MapPin,
              },
              {
                step: '02',
                title: 'Invite Your Squad',
                desc: 'Share a magic link with your travel partners. No sign-up friction, just pure collab.',
                icon: Users,
              },
              {
                step: '03',
                title: 'Plan & Explore',
                desc: 'Add stops, split bills, and build a gallery of memories together.',
                icon: Sparkles,
              },
            ].map((item, i) => (
              <div key={i} className="relative p-10 rounded-3xl border border-black/5 bg-white shadow-sm hover:shadow-xl transition-all group">
                <div className="absolute top-0 right-10 -translate-y-1/2 text-7xl font-black text-black/5 group-hover:text-[#3498db]/10 transition-colors">
                  {item.step}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#3498db]/10 flex items-center justify-center text-[#3498db] mb-6">
                  <item.icon size={28} />
                </div>
                <h4 className="text-2xl font-bold text-[#191c1d] mb-3">{item.title}</h4>
                <p className="text-[#444748] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="max-w-[1280px] mx-auto px-8 pb-32">
          <div className="bg-[#191c1d] rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3498db] opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                  Loved by modern travelers.
                </h2>
                <div className="flex items-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#f1c40f" color="#f1c40f" />)}
                  <span className="text-white/60 ml-2 font-medium">4.9/5 from 10k+ users</span>
                </div>
                <div className="space-y-8">
                  {[
                    {
                      text: "TripNest changed how we travel. No more messy group chats or forgotten expenses.",
                      author: "Alex Rivera",
                      role: "Digital Nomad",
                      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                    },
                    {
                      text: "The real-time sync is flawless. We planned our entire Euro-trip in one evening.",
                      author: "Sarah Chen",
                      role: "Travel Blogger",
                      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
                    }
                  ].map((t, i) => (
                    <div key={i} className="border-l-2 border-[#3498db] pl-8">
                      <p className="text-xl text-white/80 italic mb-4">"{t.text}"</p>
                      <div className="flex items-center gap-4">
                        <img src={t.img} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="text-white font-bold">{t.author}</p>
                          <p className="text-white/40 text-sm">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block relative">
                <img 
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000" 
                  alt="Travel" 
                  className="rounded-[2rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <Footer />

      {/* Mobile FAB */}
      <Link
        href="/signup"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#00696b] text-white rounded-full shadow-2xl flex items-center justify-center z-50 md:hidden hover:scale-110 active:scale-95 transition-transform"
        style={{ boxShadow: '0 4px 20px rgba(0,105,107,0.2)' }}
      >
        <MapPin size={28} />
      </Link>
    </div>
  );
}
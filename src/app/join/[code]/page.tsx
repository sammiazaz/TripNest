'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinPage({ params }: { params: { code: string } }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleJoin = async () => {
    setLoading(true);
    setError('');
    const res = await fetch('/api/invites/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inviteCode: params.code }),
    });
    if (res.ok) {
      router.push('/dashboard');
    } else {
      const msg = await res.text();
      setError(msg || 'Failed to join trip');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-bold text-emerald-700">You&apos;re Invited!</h1>
        <p className="text-gray-500 text-sm">Click below to join this trip on TripNest.</p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleJoin}
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 transition"
        >
          {loading ? 'Joining…' : 'Join Trip'}
        </button>
        <a href="/login" className="block text-sm text-gray-400 hover:underline">
          Need to sign in first?
        </a>
      </div>
    </div>
  );
}

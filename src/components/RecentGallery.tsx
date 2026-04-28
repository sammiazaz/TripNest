'use client';
import Image from 'next/image';
import { Upload, Edit2 } from 'lucide-react';
import Link from 'next/link';

interface Memory {
  id: string;
  title: string | null;
  imageUrl: string;
  likes: number;
  user: { name: string };
}

const KERALA_FALLBACK_PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kerala backwaters with palm trees',
  },
  {
    src: 'https://images.unsplash.com/photo-1614696434739-600e5df4b7f4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Houseboat in Kerala',
  },
  {
    src: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80',
    alt: 'Munnar hills in Kerala',
  },
];

export function RecentGallery({ memories }: { memories: Memory[] }) {
  const galleryImages = memories.length
    ? [
        { src: memories[0].imageUrl, alt: memories[0].title || 'Memory' },
        { src: memories[1]?.imageUrl || KERALA_FALLBACK_PHOTOS[1].src, alt: memories[1]?.title || KERALA_FALLBACK_PHOTOS[1].alt },
        { src: memories[2]?.imageUrl || KERALA_FALLBACK_PHOTOS[2].src, alt: memories[2]?.title || KERALA_FALLBACK_PHOTOS[2].alt },
      ]
    : KERALA_FALLBACK_PHOTOS;

  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-[0_8px_32px_rgba(25,118,210,0.08)] border border-white/70 h-full flex flex-col relative">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">Shared Gallery</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#1976d2] text-sm font-medium rounded-xl hover:bg-blue-100 transition">
          <Upload size={14} />
          Add Photos
        </button>
      </div>

      <div className="flex-1 flex gap-3 min-h-[300px]">
        <>
          {/* Large image */}
          <div className="flex-1 relative rounded-2xl overflow-hidden shadow-sm">
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              fill
              className="object-cover"
            />
          </div>

          {/* Small images stack */}
          <div className="w-[180px] flex flex-col gap-3">
            <div className="flex-1 relative rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 relative rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </>
      </div>

      {/* Floating Action Button (Edit / Add) */}
      <button className="absolute bottom-6 right-6 w-14 h-14 bg-[#1976d2] text-white rounded-full shadow-[0_8px_20px_rgba(25,118,210,0.25)] flex items-center justify-center hover:brightness-110 transition hover:scale-105 active:scale-95">
        <Edit2 size={22} fill="currentColor" className="opacity-90" />
      </button>
    </div>
  );
}

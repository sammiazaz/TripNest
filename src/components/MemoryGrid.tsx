'use client';
import Image from 'next/image';
import { Heart, MessageCircle } from 'lucide-react';

interface Memory {
  id: string;
  title: string | null;
  imageUrl: string;
  likes: number;
  user: { name: string };
}

export function MemoryGrid({ memories }: { memories: Memory[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {memories.map((memory) => (
        <div key={memory.id} className="group relative overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="aspect-square relative">
            <Image src={memory.imageUrl} alt={memory.title || 'Memory'} fill className="object-cover" />
          </div>
          <div className="p-3">
            <p className="text-sm font-medium truncate">{memory.title || 'Untitled'}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Heart size={14} /> {memory.likes}</span>
              <span className="flex items-center gap-1"><MessageCircle size={14} /> 0</span>
              <span>by {memory.user.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
'use client';
import { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { MapPin, CheckCircle, Image as ImageIcon, Map } from 'lucide-react';
import Image from 'next/image';

interface Activity {
  id: string;
  type: string;
  payload: any;
  createdAt: Date | string;
  actor: { name: string; avatarUrl?: string | null };
}

export function ActivityFeed({ initialActivities, tripId }: { initialActivities: Activity[], tripId: string }) {
  const [activities, setActivities] = useState(initialActivities);
  const socket = useSocket(tripId);

  useEffect(() => {
    if (!socket) return;
    const handleActivity = (activity: Activity) => {
      setActivities((prev) => [activity, ...prev].slice(0, 20));
    };
    socket.on('activity', handleActivity);
    return () => {
      socket.off('activity', handleActivity);
    };
  }, [socket]);

  const getTimeAgo = (dateInput: Date | string) => {
    const now = new Date();
    const date = new Date(dateInput);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 172800) return 'Yesterday';
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const renderActivityContent = (act: Activity) => {
    switch (act.type) {
      case 'EXPENSE_ADDED':
        return (
          <>
            <p className="text-sm text-gray-700 leading-tight">
              <span className="font-bold text-gray-900">{act.actor.name}</span> added an expense
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {getTimeAgo(act.createdAt)} • {act.payload.description || 'General expense'}
            </p>
          </>
        );
      case 'PAYMENT_SETTLED':
        return (
          <>
            <p className="text-sm text-gray-700 leading-tight">
              <span className="font-bold text-gray-900">{act.actor.name}</span> settled a payment
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {getTimeAgo(act.createdAt)} • {act.payload.amount ? `€${act.payload.amount} to ${act.payload.toName || 'someone'}` : 'Payment'}
            </p>
          </>
        );
      case 'PHOTO_UPLOADED':
        return (
          <>
            <p className="text-sm text-gray-700 leading-tight">
              <span className="font-bold text-gray-900">New Photo</span> shared in the group album
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {getTimeAgo(act.createdAt)} • By {act.actor.name}
            </p>
          </>
        );
      case 'PIN_ADDED':
        return (
          <>
            <p className="text-sm text-gray-700 leading-tight">
              <span className="font-bold text-gray-900">{act.actor.name}</span> added a new pin to the map
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {getTimeAgo(act.createdAt)} • {act.payload.title || 'Unknown location'}
            </p>
          </>
        );
      default:
        return (
          <>
            <p className="text-sm text-gray-700 leading-tight">
              <span className="font-bold text-gray-900">{act.actor.name}</span> did something
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{getTimeAgo(act.createdAt)}</p>
          </>
        );
    }
  };

  const getIconAndBadge = (act: Activity) => {
    // Returns [mainAvatar/Icon, badgeIcon]
    switch (act.type) {
      case 'PAYMENT_SETTLED':
        return [null, <div key="b" className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white border-2 border-white"><CheckCircle size={8} /></div>];
      case 'PIN_ADDED':
        return [null, <div key="b" className="w-4 h-4 rounded-full bg-[#1e78f0] flex items-center justify-center text-white border-2 border-white"><MapPin size={8} /></div>];
      case 'PHOTO_UPLOADED':
        return [<div key="m" className="w-full h-full bg-blue-50 text-[#1e78f0] flex items-center justify-center"><ImageIcon size={18} /></div>, null];
      default:
        return [null, null];
    }
  };

  return (
    <div className="space-y-5">
      {activities.length === 0 && <p className="text-sm text-gray-400">No activity yet.</p>}
      {activities.map((act) => {
        const [MainIcon, Badge] = getIconAndBadge(act);
        
        return (
          <div key={act.id} className="flex gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                {MainIcon ? MainIcon : (
                  act.actor.avatarUrl ? (
                    <Image src={act.actor.avatarUrl} alt={act.actor.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-sm">
                      {act.actor.name.charAt(0)}
                    </div>
                  )
                )}
              </div>
              {Badge && (
                <div className="absolute -bottom-0.5 -right-0.5">
                  {Badge}
                </div>
              )}
            </div>
            <div className="pt-0.5">
              {renderActivityContent(act)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
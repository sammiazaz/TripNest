'use client';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket } from '@/lib/socket';

export function useSocket(tripId: string): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Only runs on the client
    const s = getSocket();
    s.emit('join-trip', tripId);
    setSocket(s);

    // Cleanup: leave room (optional — socket stays connected as singleton)
    return () => {
      s.off('activity');
    };
  }, [tripId]);

  return socket;
}
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

// Lazily create a singleton socket only on the client side
export function getSocket(): Socket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_APP_URL ?? '', {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
    });
  }
  return socket;
}

export function joinTrip(tripId: string) {
  getSocket().emit('join-trip', tripId);
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
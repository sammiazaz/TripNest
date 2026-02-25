import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const socketUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
      const newSocket = io(socketUrl, {
        withCredentials: true,
      });

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  const joinTrip = (tripId) => {
    if (socket) {
      socket.emit('join-trip', tripId);
    }
  };

  const leaveTrip = (tripId) => {
    if (socket) {
      socket.emit('leave-trip', tripId);
    }
  };

  const value = {
    socket,
    joinTrip,
    leaveTrip,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
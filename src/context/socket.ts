import React from 'react';
import io from 'socket.io-client';

export const socket = io('http://localhost:5000', {
  autoConnect: false,
});
console.log(typeof socket);

export type SocketType = typeof socket;

export const SocketContext = React.createContext<SocketType>(socket);

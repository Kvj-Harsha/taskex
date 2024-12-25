import { io, Socket } from "socket.io-client";

// Initialize socket with correct server URL
let socket: Socket;

export const getSocket = (): Socket => {
  if (socket) {
    return socket;
  }
  socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:3000", {
    autoConnect: false,
  });
  return socket;
};

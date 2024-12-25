import { createServer } from "http";
import express from "express";
import { Server as SocketIOServer } from "socket.io";

const app = express();
const server = createServer(app);

// Initialize socket.io
const io = new SocketIOServer(server, {
  // Ensure the appropriate settings for socket.io (e.g., transport)
  cors: {
    origin: "*", // or specific domains
    methods: ["GET", "POST"],
  },
});

// Set up socket event listeners
io.on("connection", (socket) => {
  console.log("A user connected");
  
  // Listen for events
  socket.on("newNote", (note) => {
    io.emit("newNote", note); // Broadcast the new note to all clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Your server should listen on the specified port
server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

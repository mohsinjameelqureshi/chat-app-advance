import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "../utils/env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";
import { app } from "../app.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// this is storing online user
const userSocketMap = {}; // {userId: Set<socketId>}

// we will use this function to check if user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connect", socket.user.fullname);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullname);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server };

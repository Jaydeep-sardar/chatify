import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// we will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// this is for storig online users
const userSocketMap = {}; // {userId:socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Voice/Video Call Events
  socket.on("call-user", (data) => {
    const { to, offer, callType, caller } = data;
    const receiverSocketId = getReceiverSocketId(to);
    
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("incoming-call", {
        from: userId,
        offer,
        callType,
        caller
      });
    }
  });

  socket.on("answer-call", (data) => {
    const { to, answer } = data;
    const callerSocketId = getReceiverSocketId(to);
    
    if (callerSocketId) {
      io.to(callerSocketId).emit("call-answered", {
        from: userId,
        answer
      });
    }
  });

  socket.on("ice-candidate", (data) => {
    const { to, candidate } = data;
    const targetSocketId = getReceiverSocketId(to);
    
    if (targetSocketId) {
      io.to(targetSocketId).emit("ice-candidate", {
        from: userId,
        candidate
      });
    }
  });

  socket.on("end-call", (data) => {
    const { to } = data;
    const targetSocketId = getReceiverSocketId(to);
    
    if (targetSocketId) {
      io.to(targetSocketId).emit("call-ended", {
        from: userId
      });
    }
  });

  socket.on("reject-call", (data) => {
    const { to } = data;
    const callerSocketId = getReceiverSocketId(to);
    
    if (callerSocketId) {
      io.to(callerSocketId).emit("call-rejected", {
        from: userId
      });
    }
  });

  // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };

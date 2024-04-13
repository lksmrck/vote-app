import { NextFunction } from "express";

export const socketMiddleware = (socket: any, next: any) => {
  const userID = socket.handshake.auth.userID;
  socket.userID = userID;
  next();
};

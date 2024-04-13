import { Server } from "socket.io";
import { socketMiddleware } from "./socketMiddleware";
import { messageHandler } from "../controllers/socket/messageHandler";

export const socketConfiguration = (server: number) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use(socketMiddleware);

  io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    socket.on("join_chat", async (roomID) => {
      socket.join(roomID); //Room ID = conversation ID from FE
    });

    // Send and receive message
    socket.on("send_message", (message) => messageHandler(socket, message));

    // socket.on("add_conversation", (conversation) =>
    //   addConversationHandler(socket, conversation)
    // );

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });

  return io;
};

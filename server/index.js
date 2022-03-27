const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();
const { userJoin, userLeave, checkUser } = require("./User.js");
const { appendFile } = require("fs");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAR_ROOM_ID = "12345!@#$";

app.use(cors());

app.get("/checkUsername/:username", (req, res) => {
  return res.send(checkUser(req.params.username));
});

io.on("connect", (socket) => {
  //User Joined The Chat Room
  socket.on("joinRoom", (username) => {
    //Join the Chat room
    socket.join(CHAR_ROOM_ID);
    //Add user to List of Users
    userJoin(socket.id, username);
  });

  socket.on("sendMessage", (data) => {
    socket.to(CHAR_ROOM_ID).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    userLeave(socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

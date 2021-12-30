const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
  console.log("a user connected with id " + socket.id);

  let userName;
  socket.on('set nickname', (nickname) => {
    userName = nickname;
    // console.log(socket)
    io.emit('newUserConnected', nickname);
  })

  socket.on("chat message", (payload) => {
    console.log(payload);
    io.emit("chat message", { name: payload.name, message: payload.message});
  });


  socket.on('disconnect', () => {
    io.emit('userDisconnected', userName);
    console.log(socket.id + " disconnected");
  })

});



server.listen(3000, () => {
  console.log("listening on *:3000");
});

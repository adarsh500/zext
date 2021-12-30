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
  io.emit('newUserConnected', socket.id);

  //
  socket.on('chat message', (message) => {
    console.log("message: " + message);
    io.emit("chat message", message);
  });

  socket.on('disconnect', () => {
    io.emit('userDisconnected', socket.id);
    console.log(socket.id + " disconnected");
  })

});



server.listen(3000, () => {
  console.log("listening on *:3000");
});

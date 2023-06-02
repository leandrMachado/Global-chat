require("dotenv").config();

const express = require("express");
const serve_static = require("serve-static");
const path = require("path");

const PORT = process.env.PORT || 3000;
const public_directory = path.join(__dirname, "./public");
const app = express();

app.use(express.static(public_directory));

app.use(serve_static(public_directory, { index: ["index.html", "index.htm"] }));

const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const connection = socket(server, { cors: { origin: "*" }})

connection.on('connection', socket => {
  console.log(socket.id)
  
  socket.on("global_message", (data) => {
    socket.emit("emit_global_message", data);
  })
})

server.listen(PORT, () => {
  console.log(`[Server] listening on port ${PORT}`);
});

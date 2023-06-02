const express = require("express");
const serve_static = require("serve-static");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const public_directory = path.join(__dirname, "./public");
const app = express();

app.use(express.static(public_directory));
app.use(cors());

app.use(serve_static(public_directory, { index: ["index.html", "index.htm" ]}));

const server = require("http").createServer(app);
const connection = require("socket.io")(server, { cors: { origin: "*"} });

connection.on("connection", socket => {
    console.log(socket.id)

    socket.on("global_chat", data => {
        connection.emit("global_chat", data);
    })

    socket.on("user_connected", data => {
        connection.emit("user_connected", data);
    })
})

server.listen(PORT, () => {
    console.log(`[Server] listening on port ${PORT}`);
})
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

server.listen(5000, () => {
	console.log(`server is listening on port 5000`);
});

io.on("connection", (socket) => {
	console.log(`User ${socket.id} connected`);

	socket.on("message", (data) => {
		console.log(data);
		socket.broadcast.emit("message", data);
	});
});

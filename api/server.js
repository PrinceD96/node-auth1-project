const express = require("express");
const helmet = require("helmet");

const usersRouter = require("./routes/users/usersRouter");

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
	res.json({ api: "up" });
});

module.exports = server;

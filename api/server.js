const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const restricted = require("../auth/restricted-middleware");

const usersRouter = require("./routes/users/usersRouter");
const authRouter = require("../auth/authRouter");

const server = express();

const sessionConfig = {
	name: "unknown",
	secret: "If I knew I would've told you already",
	cookie: {
		maxAge: 1000 * 30,
		secure: false,
		httpOnly: true
	},
	resave: false,
	saveUninitialized: false
};

server.use(express.json());
server.use(helmet());
server.use(session(sessionConfig));
server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
	res.json({ api: "up" });
});

module.exports = server;

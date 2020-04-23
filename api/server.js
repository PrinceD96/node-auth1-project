const server = require("express")();
const json = require("express").json();
const cors = require("cors")();
const helmet = require("helmet")();
const session = require("express-session");
const restricted = require("../auth/restricted-middleware");
const knexSessionStore = require("connect-session-knex")(session);

const usersRouter = require("./routes/users/usersRouter");
const authRouter = require("../auth/authRouter");

const sessionConfig = {
	name: "unknown",
	secret: "If I knew I would've told you already",
	cookie: {
		maxAge: 1000 * 30,
		secure: false,
		httpOnly: true
	},
	resave: false,
	saveUninitialized: false,

	store: new knexSessionStore({
		knex: require("../database/db-config"),
		tableName: "sessions",
		sidfieldname: "sid",
		createtable: true,
		clearInterval: 1000 * 30
	})
};

server.use(json, cors, helmet, session(sessionConfig));
server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
	res.json({ api: "up" });
});

module.exports = server;

const express = require("express");
const helmet = require("helmet");

const server = express();

server.get("/", (req, res) => {
	res.json({ api: "up" });
});

module.exports = server;

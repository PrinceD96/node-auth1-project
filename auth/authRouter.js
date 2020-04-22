const bcrypt = require("bcryptjs");

const router = require("express").Router();
const Users = require("../api/routes/users/usersModel");
const { validateUser } = require("../api/routes/users/usersMiddleware");

router.post("/register", validateUser, (req, res) => {
	let user = req.body;

	const hash = bcrypt.hashSync(user.password, 12);

	user.password = hash;

	Users.add(user)
		.then(newUser => {
			res.status(201).json({ newUser });
		})
		.catch(error => {
			res.status(500).json({ error: "Problem with the database", error });
		});
});

router.post("/login", validateUser, (req, res) => {
	const { username, password } = req.body;

	Users.findBy({ username })
		.then(([user]) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				req.session.user = username;
				res.status(200).json({ message: "Welcome" });
			} else {
				res.status(401).json({ message: "Invalid credentials" });
			}
		})
		.catch(error =>
			res.status(500).json({ error: "Problem with the database", error })
		);
});

module.exports = router;

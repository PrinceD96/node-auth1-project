const db = require("../../../database/db-config");

const find = () => {
	return db("users");
};

const findBy = filter => {
	return db("users").where(filter);
};

const findById = id => {
	return db("users").where({ id }).first();
};

const add = user => {
	return db("users").insert(user);
};

const update = (id, changes) => {
	return db("users").where({ id }).update(changes);
};

const remove = id => {
	return db("users").where({ id }).del();
};

module.exports = {
	find,
	findBy,
	findById,
	add,
	update,
	remove
};

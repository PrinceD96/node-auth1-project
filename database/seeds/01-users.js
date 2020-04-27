exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("users")
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex("users").insert([
				{
					id: 1,
					username: "devOne",
					password: "password1",
					bio: "I am a software developer"
				},
				{
					id: 2,
					username: "DocTwo",
					password: "password2",
					bio: "I am a doctor"
				},
				{
					id: 3,
					username: "PilotThree",
					password: "password3",
					bio: "I am a pilot"
				}
			]);
		});
};

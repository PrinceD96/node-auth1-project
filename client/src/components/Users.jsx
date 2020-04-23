import React, { useState } from "react";
import axios from "axios";

const Users = () => {
	const [users, setUsers] = useState([]);

	const fetchUsers = () => {
		axios
			.get("http://localhost:5000/api/users")
			.then(users => console.log(users));
	};

	return (
		<>
			<h1>Yet another users list</h1>
			<button onClick={fetchUsers}>Fetch users</button>
		</>
	);
};

export default Users;

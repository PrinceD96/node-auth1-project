import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
	const [users, setUsers] = useState([]);

	const fetchUsers = () => {
		axios
			.get("http://localhost:5000/api/users")
			.then(res => {
				console.log(users);
				setUsers(res.data);
			})
			.catch(error => console.log(error));
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<>
			<h1>Yet another users list</h1>
			{users ? (
				<>
					<h3>List of users</h3>
					{users.map(user => (
						<p>{user.username}</p>
					))}
				</>
			) : null}
		</>
	);
};

export default Users;

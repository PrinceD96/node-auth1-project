import React, { useState, useEffect } from "react";
import { Form, Input, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = props => {
	const [credentials, setCredentials] = useState({
		username: "",
		password: ""
	});
	const [token, setToken] = useState(
		localStorage.getItem("token") ? localStorage.getItem("token") : null
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleChange = e => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
		setError("");
		console.log(credentials);
	};

	const handleSubmit = creds => {
		setIsSubmitting(true);
		axios
			.post("http://localhost:5000/api/auth/login", {
				username: credentials.username,
				password: credentials.password
			})
			.then(res => {
				console.log(res.data);
				setCredentials({
					username: "",
					password: ""
				});
				setIsSubmitting(false);
				console.log("TOKEN", res.data.token);
				setToken(res.data.token);
				console.log("token", token);
				props.history.push("/users");
			})
			.catch(error => {
				console.log(error);
				setCredentials({
					username: "",
					password: ""
				});
				setIsSubmitting(false);
				setError("Invalid username or password. Please try again.");
				// alert("Invalid credentials");
			});
	};

	useEffect(() => {
		localStorage.setItem("token", token);
	}, [token]);

	const SignUpSchema = Yup.object().shape({
		username: Yup.string()
			.min(3, "Username must be 3 characters min!")
			.max(50, "Too Long!")
			.required("Required"),
		password: Yup.string()
			.min(8, "Password must be 8 characters min!")
			.max(50, "Too Long!")
			.required("Required")
	});

	return (
		<div className='register_form_container'>
			<h3>Welcome Back!</h3>
			{/* {error ? <p className='login_error'>{error}</p> : null} */}
			<p className='login_error'>{error}</p>
			<Formik
				initialValues={credentials}
				onSubmit={() => handleSubmit(credentials)}
				validationSchema={SignUpSchema}
				render={() => (
					<Form>
						<Form.Item name='username' showValidateSuccess>
							<Input
								name='username'
								placeholder='Username'
								onChange={handleChange}
								value={credentials.username}
								allowClear
							/>
						</Form.Item>

						<Form.Item name='password' showValidateSuccess>
							<Input.Password
								name='password'
								placeholder='Password'
								onChange={handleChange}
								value={credentials.password}
								allowClear
							/>
						</Form.Item>
						<SubmitButton block loading={isSubmitting}>
							Login
						</SubmitButton>
					</Form>
				)}
			/>
			<p>
				Don't have an account yet? <Link to='/register'>Register</Link>
			</p>
		</div>
	);
};

export default Login;

import React, { useState, useEffect } from "react";
import { Form, Input, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = props => {
	const [credentials, setCredentials] = useState({
		username: "",
		password: ""
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = e => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
		console.log(credentials);
	};

	const handleSubmit = creds => {
		setIsSubmitting(true);
		axios
			.post("http://localhost:5000/api/auth/register", {
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
			})
			.catch(error => console.log(error));
	};

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
			<h3>Register Below!</h3>
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
							Sign Up
						</SubmitButton>
					</Form>
				)}
			/>
			<p>
				Already have an account? <Link to='/login'>Login</Link>
			</p>
		</div>
	);
};

export default Register;

import React, { useState } from "react"
import axios from 'axios';
import api from "../utils/api"

function Signin(props) {
	const [error, setError] = useState()
	const [data, setData] = useState({
		email: "",
		password: "",
	})

	const handleChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		// We are using an axios instance with predefined values, (in utils folder api.js)
		// rather than just plain old axios
		api()
			.post("/signin", data)
			.then(result => {
				// console.log(result.data)
				localStorage.setItem("token", result.data.token)
				// Redirect the user to their account page after logging in
				props.history.push("/account")
			})
			.catch(err => {
				setError(err.response.data.message)
			})
	}

	// const handleSubmit = (event) => {
	// 	event.preventDefault()
	// 	axios
	// 		.post("http://localhost:8080/signin", data)
	// 		.then(result => {
	// 			// console.log(result.data)
	// 			localStorage.setItem('token', result.data.token)
	// 		})
	// 		.catch(err => {
	// 			setError(err.response.data.message)
	// 		})
	// }
	
	return (
		<form onSubmit={handleSubmit}>
			{error && <div className="error">{error}</div>}
			<input 
				type="email" 
				name="email" 
				placeholder="Email" 
				value={data.email} 
				onChange={handleChange} 
			/>
			<input 
				type="password" 
				name="password" 
				placeholder="Password" 
				value={data.password} 
				onChange={handleChange} 
			/>
			<button type="submit">Sign In</button>
		</form>
	)
}

export default Signin
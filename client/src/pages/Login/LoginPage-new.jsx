import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, loading, error, user } = useAuth();
	const navigate = useNavigate();

	// Redirect if already logged in
	if (user) {
		return <Navigate to="/dashboard" replace />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await login(email, password);
		if (result.success) {
			navigate("/dashboard");
		}
	};

	return (
		<div className="login-container">
			<h1>Lost & Found</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit" disabled={loading}>
					{loading ? "Logging in..." : "Login"}
				</button>
				{error && <p style={{ color: "red" }}>{error}</p>}
				<p>
					Don't have an account? <a href="/register">Register</a>
				</p>
			</form>
		</div>
	);
};

export default LoginPage;

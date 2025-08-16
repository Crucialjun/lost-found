import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
		<div className="min-h-screen bg-white flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="card">
					<div className="card-header text-center">
						<h1 className="text-3xl font-bold text-gradient mb-2">
							Welcome Back
						</h1>
						<p className="text-gray-600">Sign in to your Lost & Found account</p>
					</div>

					<div className="card-body">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="form-group">
								<label className="form-label">
									Email Address
								</label>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									required
									className="form-input"
								/>
							</div>

							<div className="form-group">
								<label className="form-label">
									Password
								</label>
								<input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Enter your password"
									required
									className="form-input"
								/>
							</div>

							<button
								type="submit"
								disabled={loading}
								className="btn btn-primary w-full"
							>
								{loading ? (
									<div className="flex items-center justify-center">
										<div className="loading-spinner spinner-sm mr-2"></div>
										Signing in...
									</div>
								) : (
									"Sign In"
								)}
							</button>

							{error && (
								<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
									{error}
								</div>
							)}
						</form>

						<div className="mt-8 text-center">
							<p className="text-gray-600">
								Don't have an account?{" "}
								<Link 
									to="/register" 
									className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
								>
									Create one here
								</Link>
							</p>
						</div>
					</div>
				</div>

				<div className="text-center mt-6">
					<Link 
						to="/" 
						className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
					>
						← Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	const { register, loading, error, user } = useAuth();
	const navigate = useNavigate();

	// Redirect if already logged in
	if (user) {
		return <Navigate to="/dashboard" replace />;
	}

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (form.password !== form.confirmPassword) {
			alert("Passwords don't match!");
			return;
		}

		const result = await register(form.name, form.email, form.password);
		if (result.success) {
			navigate("/dashboard");
		}
	};

	return (
		<div className="min-h-screen bg-white flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
							Join Lost & Found
						</h1>
						<p className="text-gray-600">Create your account to start helping reunite lost items</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Full Name
							</label>
							<input
								type="text"
								name="name"
								value={form.name}
								onChange={handleChange}
								placeholder="Enter your full name"
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/90"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Email Address
							</label>
							<input
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								placeholder="Enter your email"
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/90"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Password
							</label>
							<input
								type="password"
								name="password"
								value={form.password}
								onChange={handleChange}
								placeholder="Create a password"
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/90"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Confirm Password
							</label>
							<input
								type="password"
								name="confirmPassword"
								value={form.confirmPassword}
								onChange={handleChange}
								placeholder="Confirm your password"
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/90"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold"
						>
							{loading ? (
								<div className="flex items-center justify-center">
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
									Creating Account...
								</div>
							) : (
								"Create Account"
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
							Already have an account?{" "}
							<Link 
								to="/login" 
								className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
							>
								Sign in here
							</Link>
						</p>
					</div>
				</div>

				<div className="text-center mt-6">
					<Link 
						to="/" 
						className="text-white/80 hover:text-white transition-colors duration-200"
					>
						← Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
}

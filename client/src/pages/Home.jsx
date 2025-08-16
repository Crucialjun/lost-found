import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
	const { user } = useAuth();

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="hero py-20 px-4">
				<div className="container mx-auto text-center hero-content">
					<h1 className="hero-title">
						Lost & Found
					</h1>
					<p className="hero-subtitle">
						Reuniting people with their lost belongings through the power of community
					</p>

					{user ? (
						<div className="space-y-6">
							<p className="text-lg md:text-xl mb-8 text-gray-600">
								Welcome back! Ready to help reunite lost items with their owners?
							</p>
							<div className="flex flex-wrap justify-center gap-4">
								<Link 
									to="/dashboard" 
									className="btn btn-primary btn-lg"
								>
									View All Items
								</Link>
								<Link 
									to="/post-lost" 
									className="btn btn-danger btn-lg"
								>
									Report Lost Item
								</Link>
								<Link 
									to="/post-found" 
									className="btn btn-success btn-lg"
								>
									Report Found Item
								</Link>
							</div>
						</div>
					) : (
						<div className="space-y-6">
							<p className="text-lg md:text-xl mb-8 text-gray-600">
								Join our community to post lost or found items and help reunite people with their belongings
							</p>
							<div className="flex flex-wrap justify-center gap-4 mb-8">
								<Link 
									to="/register" 
									className="btn btn-success btn-lg"
								>
									Get Started
								</Link>
								<Link 
									to="/login" 
									className="btn btn-outline btn-lg"
								>
									Login
								</Link>
							</div>
							<Link 
								to="/dashboard" 
								className="text-primary-600 hover:text-primary-700 transition-colors duration-200 underline text-lg"
							>
								Browse Items Without Account →
							</Link>
						</div>
					)}
				</div>
			</section>

			{/* How It Works Section */}
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
						How It Works
					</h2>
					<div className="steps-grid">
						{/* Step 1 */}
						<div className="step-card">
							<div className="step-number step-1 text-white">
								1
							</div>
							<h3 className="text-2xl font-bold mb-4">Report Lost Item</h3>
							<p className="text-lg text-gray-600 leading-relaxed">
								Lost something? Create a detailed post with description, location, and contact information to help others find it.
							</p>
						</div>

						{/* Step 2 */}
						<div className="step-card">
							<div className="step-number step-2 text-white">
								2
							</div>
							<h3 className="text-2xl font-bold mb-4">Report Found Item</h3>
							<p className="text-lg text-gray-600 leading-relaxed">
								Found something? Post it here with details and location to help reunite it with its rightful owner.
							</p>
						</div>

						{/* Step 3 */}
						<div className="step-card">
							<div className="step-number step-3 text-white">
								3
							</div>
							<h3 className="text-2xl font-bold mb-4">Connect & Reunite</h3>
							<p className="text-lg text-gray-600 leading-relaxed">
								Browse items, contact owners directly, and help make someone's day by reuniting them with their belongings.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4 text-center text-gray-800">
					<h2 className="text-3xl md:text-4xl font-bold mb-12">Making a Difference</h2>
					<div className="stats-grid">
						<div className="stat-card">
							<div className="stat-number">
								100+
							</div>
							<p className="stat-label">Items Posted</p>
						</div>
						<div className="stat-card">
							<div className="stat-number">
								50+
							</div>
							<p className="stat-label">Successful Reunions</p>
						</div>
						<div className="stat-card">
							<div className="stat-number">
								24/7
							</div>
							<p className="stat-label">Community Support</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;

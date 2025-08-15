import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
	const { user } = useAuth();

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="py-20 px-4">
				<div className="container mx-auto text-center text-gray-800">
					<h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
						Lost & Found
					</h1>
					<p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-600">
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
									className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
								>
									View All Items
								</Link>
								<Link 
									to="/post-lost" 
									className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
								>
									Report Lost Item
								</Link>
								<Link 
									to="/post-found" 
									className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
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
									className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
								>
									Get Started
								</Link>
								<Link 
									to="/login" 
									className="bg-gray-600 text-white px-8 py-4 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
								>
									Login
								</Link>
							</div>
							<Link 
								to="/dashboard" 
								className="text-purple-600 hover:text-purple-700 transition-colors duration-200 underline text-lg"
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
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{/* Step 1 */}
						<div className="text-center text-gray-800">
							<div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold shadow-lg text-white">
								1
							</div>
							<h3 className="text-2xl font-bold mb-4">Report Lost Item</h3>
							<p className="text-lg text-gray-600 leading-relaxed">
								Lost something? Create a detailed post with description, location, and contact information to help others find it.
							</p>
						</div>

						{/* Step 2 */}
						<div className="text-center text-gray-800">
							<div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold shadow-lg text-white">
								2
							</div>
							<h3 className="text-2xl font-bold mb-4">Report Found Item</h3>
							<p className="text-lg text-gray-600 leading-relaxed">
								Found something? Post it here with details and location to help reunite it with its rightful owner.
							</p>
						</div>

						{/* Step 3 */}
						<div className="text-center text-gray-800">
							<div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold shadow-lg text-white">
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
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
						<div className="bg-gray-50 rounded-xl p-8 border border-gray-200 shadow-lg">
							<div className="text-4xl md:text-5xl font-bold mb-2 text-orange-600">
								100+
							</div>
							<p className="text-lg text-gray-600">Items Posted</p>
						</div>
						<div className="bg-gray-50 rounded-xl p-8 border border-gray-200 shadow-lg">
							<div className="text-4xl md:text-5xl font-bold mb-2 text-green-600">
								50+
							</div>
							<p className="text-lg text-gray-600">Successful Reunions</p>
						</div>
						<div className="bg-gray-50 rounded-xl p-8 border border-gray-200 shadow-lg">
							<div className="text-4xl md:text-5xl font-bold mb-2 text-purple-600">
								24/7
							</div>
							<p className="text-lg text-gray-600">Community Support</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;

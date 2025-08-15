import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

const PostFound = () => {
	const { user, loading: authLoading } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		location: {
			address: "",
			city: "",
			coordinates: {
				lat: "",
				lng: ""
			}
		},
		dateFound: "",
		contactInfo: {
			phone: "",
			email: "",
			preferredContact: "email"
		}
	});

	// Redirect if not logged in
	if (!authLoading && !user) {
		return <Navigate to="/login" replace />;
	}

	const categories = ["electronics", "clothing", "accessories", "documents", "keys", "pets", "other"];

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		
		if (name.includes('.')) {
			const [parent, child, grandchild] = name.split('.');
			if (grandchild) {
				setFormData(prev => ({
					...prev,
					[parent]: {
						...prev[parent],
						[child]: {
							...prev[parent][child],
							[grandchild]: value
						}
					}
				}));
			} else {
				setFormData(prev => ({
					...prev,
					[parent]: {
						...prev[parent],
						[child]: value
					}
				}));
			}
		} else {
			setFormData(prev => ({
				...prev,
				[name]: value
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		
		try {
			const postData = {
				...formData,
				status: "found"
			};
			
			await api.post("/items", postData);
			alert("Found item posted successfully!");
			navigate("/dashboard");
		} catch (error) {
			console.error("Error posting found item:", error);
			alert("Error posting item. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (authLoading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="spinner"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white py-8">
			<div className="container mx-auto px-4">
				<div className="max-w-2xl mx-auto">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="text-6xl mb-4">✅</div>
						<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
							Post Found Item
						</h1>
						<p className="text-gray-600 text-lg">Help reunite lost items with their owners</p>
					</div>

					{/* Form */}
					<div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Basic Information */}
							<div className="space-y-6">
								<h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
									📝 Basic Information
								</h3>
								
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Item Title *
									</label>
									<input
										type="text"
										name="title"
										value={formData.title}
										onChange={handleInputChange}
										required
										placeholder="e.g., Black iPhone 13 Pro"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Description *
									</label>
									<textarea
										name="description"
										value={formData.description}
										onChange={handleInputChange}
										required
										rows="4"
										placeholder="Provide detailed description including brand, color, size, distinguishing features..."
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white resize-vertical"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Category *
									</label>
									<select
										name="category"
										value={formData.category}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
									>
										<option value="">Select a category</option>
										{categories.map(category => (
											<option key={category} value={category}>
												{category.charAt(0).toUpperCase() + category.slice(1)}
											</option>
										))}
									</select>
								</div>
							</div>

							{/* Location Information */}
							<div className="space-y-6">
								<h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
									📍 Location Information
								</h3>
								
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Where did you find it? *
									</label>
									<input
										type="text"
										name="location.address"
										value={formData.location.address}
										onChange={handleInputChange}
										required
										placeholder="e.g., Starbucks on Main Street, University Library..."
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										City *
									</label>
									<input
										type="text"
										name="location.city"
										value={formData.location.city}
										onChange={handleInputChange}
										required
										placeholder="e.g., New York, Los Angeles..."
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										When did you find it? *
									</label>
									<input
										type="date"
										name="dateFound"
										value={formData.dateFound}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
									/>
								</div>
							</div>

							{/* Contact Information */}
							<div className="space-y-6">
								<h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
									📞 Contact Information
								</h3>
								
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Phone Number
									</label>
									<input
										type="tel"
										name="contactInfo.phone"
										value={formData.contactInfo.phone}
										onChange={handleInputChange}
										placeholder="(555) 123-4567"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Email *
									</label>
									<input
										type="email"
										name="contactInfo.email"
										value={formData.contactInfo.email}
										onChange={handleInputChange}
										required
										placeholder="your@email.com"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Preferred Contact Method
									</label>
									<select
										name="contactInfo.preferredContact"
										value={formData.contactInfo.preferredContact}
										onChange={handleInputChange}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
									>
										<option value="email">Email</option>
										<option value="phone">Phone</option>
									</select>
								</div>
							</div>

							{/* Submit Button */}
							<div className="pt-6">
								<button
									type="submit"
									disabled={loading}
									className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
								>
									{loading ? (
										<div className="flex items-center justify-center">
											<div className="spinner mr-2"></div>
											Posting...
										</div>
									) : (
										"✅ Post Found Item"
									)}
								</button>
							</div>
						</form>
					</div>

					{/* Help Section */}
					<div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
						<h3 className="text-lg font-semibold text-green-800 mb-3">💡 Tips for Better Results</h3>
						<ul className="text-green-700 space-y-2 text-sm">
							<li>• Be as specific as possible in your description</li>
							<li>• Include unique identifying features or markings</li>
							<li>• Mention the exact location and time when found</li>
							<li>• Keep the item safe until the owner claims it</li>
							<li>• Respond quickly to potential owner inquiries</li>
						</ul>
					</div>

					{/* Safety Notice */}
					<div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
						<h3 className="text-lg font-semibold text-blue-800 mb-3">🛡️ Safety Guidelines</h3>
						<ul className="text-blue-700 space-y-2 text-sm">
							<li>• Meet in public places when returning items</li>
							<li>• Ask for proof of ownership before returning</li>
							<li>• Trust your instincts - if something feels wrong, don't proceed</li>
							<li>• Consider involving local authorities for valuable items</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostFound;

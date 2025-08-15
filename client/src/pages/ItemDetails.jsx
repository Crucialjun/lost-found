import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

const ItemDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchItem();
	}, [id]);

	const fetchItem = async () => {
		try {
			setLoading(true);
			const response = await api.get(`/items/${id}`);
			setItem(response.data);
		} catch (error) {
			console.error("Error fetching item:", error);
			setError("Item not found");
		} finally {
			setLoading(false);
		}
	};

	const markAsResolved = async () => {
		if (!window.confirm("Are you sure you want to mark this item as resolved?")) {
			return;
		}

		try {
			await api.patch(`/items/${id}/resolve`);
			setItem(prev => ({ ...prev, isResolved: true }));
			alert("Item marked as resolved!");
		} catch (error) {
			console.error("Error marking as resolved:", error);
			alert("Error marking item as resolved");
		}
	};

	const deleteItem = async () => {
		if (!window.confirm("Are you sure you want to delete this item?")) {
			return;
		}

		try {
			await api.delete(`/items/${id}`);
			navigate("/dashboard");
		} catch (error) {
			console.error("Error deleting item:", error);
			alert("Error deleting item");
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
				<div className="spinner"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
				<div className="text-center bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 max-w-md">
					<div className="text-6xl mb-4">❌</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-4">Item Not Found</h2>
					<p className="text-gray-600 mb-6">{error}</p>
					<Link 
						to="/dashboard"
						className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 font-semibold"
					>
						← Back to Dashboard
					</Link>
				</div>
			</div>
		);
	}

	if (!item) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
				<div className="text-center bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8">
					<div className="text-6xl mb-4">🔍</div>
					<h2 className="text-2xl font-bold text-gray-800">Item not found</h2>
				</div>
			</div>
		);
	}

	const isOwner = user && user.id === item.user._id;

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					{/* Back Button */}
					<div className="mb-8">
						<Link 
							to="/dashboard"
							className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-200"
						>
							<span className="mr-2">←</span>
							Back to Dashboard
						</Link>
					</div>

					{/* Main Card */}
					<div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
						{/* Header */}
						<div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
							<div className="flex flex-wrap justify-between items-start gap-4">
								<div className="flex flex-wrap gap-3">
									<span className={`px-4 py-2 rounded-full text-sm font-semibold ${
										item.status === "lost" 
											? "bg-gradient-to-r from-red-500 to-pink-500 text-white" 
											: "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
									}`}>
										{item.status === "lost" ? "🔍 LOST" : "✅ FOUND"}
									</span>
									<span className="px-3 py-2 bg-white/80 rounded-full text-sm font-medium text-gray-600 border border-gray-200">
										{item.category.charAt(0).toUpperCase() + item.category.slice(1)}
									</span>
								</div>
								{item.isResolved && (
									<span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full text-sm font-semibold">
										✅ RESOLVED
									</span>
								)}
							</div>
						</div>

						{/* Content */}
						<div className="p-8">
							{/* Title and Description */}
							<div className="mb-8">
								<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
									{item.title}
								</h1>
								<p className="text-gray-600 text-lg leading-relaxed">
									{item.description}
								</p>
							</div>

							{/* Details Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
								{/* Location */}
								<div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
									<div className="flex items-center mb-3">
										<span className="text-2xl mr-3">📍</span>
										<h3 className="text-lg font-semibold text-gray-800">Location</h3>
									</div>
									<p className="text-gray-600">{item.location.address}</p>
									{item.location.city && (
										<p className="text-gray-500 text-sm mt-1">{item.location.city}</p>
									)}
								</div>

								{/* Date */}
								<div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
									<div className="flex items-center mb-3">
										<span className="text-2xl mr-3">📅</span>
										<h3 className="text-lg font-semibold text-gray-800">Date</h3>
									</div>
									<p className="text-gray-600 font-medium">
										{item.status === "lost" ? "Lost on:" : "Found on:"}
									</p>
									<p className="text-gray-500">
										{item.dateLost || item.dateFound 
											? new Date(item.dateLost || item.dateFound).toLocaleDateString('en-US', {
												weekday: 'long',
												year: 'numeric',
												month: 'long',
												day: 'numeric'
											})
											: "Date not specified"
										}
									</p>
								</div>

								{/* Posted By */}
								<div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
									<div className="flex items-center mb-3">
										<span className="text-2xl mr-3">👤</span>
										<h3 className="text-lg font-semibold text-gray-800">Posted By</h3>
									</div>
									<p className="text-gray-600 font-medium">{item.user.name}</p>
									<p className="text-gray-500 text-sm">
										Posted on {new Date(item.createdAt).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</p>
								</div>

								{/* Contact Info */}
								{(item.contactInfo?.phone || item.contactInfo?.email) && (
									<div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100 md:col-span-2 lg:col-span-3">
										<div className="flex items-center mb-3">
											<span className="text-2xl mr-3">📞</span>
											<h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{item.contactInfo.phone && (
												<div>
													<p className="text-gray-600 text-sm font-medium">Phone:</p>
													<p className="text-gray-800 font-semibold">{item.contactInfo.phone}</p>
												</div>
											)}
											{item.contactInfo.email && (
												<div>
													<p className="text-gray-600 text-sm font-medium">Email:</p>
													<p className="text-gray-800 font-semibold">{item.contactInfo.email}</p>
												</div>
											)}
										</div>
									</div>
								)}

								{/* Reward (if applicable) */}
								{item.reward && (
									<div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-100">
										<div className="flex items-center mb-3">
											<span className="text-2xl mr-3">💰</span>
											<h3 className="text-lg font-semibold text-gray-800">Reward</h3>
										</div>
										<p className="text-gray-600 font-medium">{item.reward}</p>
									</div>
								)}
							</div>

							{/* Actions */}
							{!item.isResolved && (
								<div className="border-t border-gray-200 pt-8">
									{isOwner ? (
										/* Owner Actions */
										<div>
											<h3 className="text-lg font-semibold text-gray-800 mb-4">Manage Your Item</h3>
											<div className="flex flex-wrap gap-4">
												<button
													onClick={markAsResolved}
													className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg"
												>
													✅ Mark as Resolved
												</button>
												<button
													onClick={deleteItem}
													className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg"
												>
													🗑️ Delete Item
												</button>
											</div>
										</div>
									) : (
										/* Contact Actions for Non-Owners */
										<div>
											<div className="text-center mb-6">
												<h3 className="text-xl font-bold text-gray-800 mb-2">
													{item.status === "lost" 
														? "Found this item or have information about it?" 
														: "Is this your item?"
													}
												</h3>
												<p className="text-gray-600">Contact the owner to help reunite them with their item!</p>
											</div>
											
											<div className="flex flex-wrap justify-center gap-4">
												{item.contactInfo?.phone && (
													<a
														href={`tel:${item.contactInfo.phone}`}
														className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg"
													>
														📞 Call {item.contactInfo.phone}
													</a>
												)}
												{item.contactInfo?.email && (
													<a
														href={`mailto:${item.contactInfo.email}?subject=Regarding your ${item.status} item: ${item.title}&body=Hi ${item.user.name},%0D%0A%0D%0AI saw your ${item.status} item posting for "${item.title}" and I wanted to contact you about it.%0D%0A%0D%0ADetails:%0D%0A- Item: ${item.title}%0D%0A- Category: ${item.category}%0D%0A- Location: ${item.location.address}%0D%0A%0D%0APlease let me know how we can proceed.%0D%0A%0D%0ABest regards`}
														className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg"
													>
														📧 Send Email
													</a>
												)}
											</div>
										</div>
									)}
								</div>
							)}

							{/* Resolved Message */}
							{item.isResolved && (
								<div className="border-t border-gray-200 pt-8">
									<div className="text-center bg-green-50 border border-green-200 rounded-xl p-6">
										<div className="text-4xl mb-4">🎉</div>
										<h3 className="text-xl font-bold text-green-800 mb-2">Item Resolved!</h3>
										<p className="text-green-700">This item has been successfully reunited with its owner.</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemDetails;

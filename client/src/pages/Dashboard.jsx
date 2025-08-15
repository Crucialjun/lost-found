import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

const Dashboard = () => {
	const { user, loading: authLoading } = useAuth();
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState("all");
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("");

	// Redirect if not logged in
	if (!authLoading && !user) {
		return <Navigate to="/login" replace />;
	}

	useEffect(() => {
		fetchItems();
	}, [filter, category, search]);

	const fetchItems = async () => {
		try {
			setLoading(true);
			const params = new URLSearchParams();
			
			if (filter !== "all") params.append("status", filter);
			if (category) params.append("category", category);
			if (search) params.append("search", search);

			const response = await api.get(`/items?${params.toString()}`);
			setItems(response.data);
		} catch (error) {
			console.error("Error fetching items:", error);
		} finally {
			setLoading(false);
		}
	};

	const categories = ["electronics", "clothing", "accessories", "documents", "keys", "pets", "other"];

	if (authLoading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="spinner"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
						Dashboard
					</h1>
					<p className="text-gray-600 text-lg">Browse lost and found items from our community</p>
				</div>
				
				{/* Quick Actions */}
				<div className="flex flex-wrap justify-center gap-4 mb-12">
					<Link 
						to="/post-lost" 
						className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
					>
						📱 Post Lost Item
					</Link>
					<Link 
						to="/post-found" 
						className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
					>
						🔍 Post Found Item
					</Link>
				</div>

				{/* Filters */}
				<div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-200">
					<h3 className="text-lg font-semibold mb-4 text-gray-800">Filter & Search</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
							<select 
								value={filter} 
								onChange={(e) => setFilter(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
							>
								<option value="all">All Items</option>
								<option value="lost">Lost Items</option>
								<option value="found">Found Items</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
							<select 
								value={category} 
								onChange={(e) => setCategory(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
							>
								<option value="">All Categories</option>
								{categories.map(cat => (
									<option key={cat} value={cat}>
										{cat.charAt(0).toUpperCase() + cat.slice(1)}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
							<input
								type="text"
								placeholder="Search items..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
							/>
						</div>
					</div>
				</div>

				{/* Loading State */}
				{loading && (
					<div className="flex justify-center py-12">
						<div className="spinner"></div>
					</div>
				)}

				{/* Items Grid */}
				{!loading && (
					<>
						{items.length === 0 ? (
							<div className="text-center py-12">
								<div className="text-6xl mb-4">📦</div>
								<h3 className="text-2xl font-semibold text-gray-700 mb-2">No items found</h3>
								<p className="text-gray-500 mb-6">Be the first to post an item in this category!</p>
								<div className="flex flex-wrap justify-center gap-4">
									<Link 
										to="/post-lost" 
										className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
									>
										Post Lost Item
									</Link>
									<Link 
										to="/post-found" 
										className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
									>
										Post Found Item
									</Link>
								</div>
							</div>
						) : (
							<>
								<div className="text-center mb-6">
									<p className="text-gray-600">
										Showing <span className="font-semibold">{items.length}</span> items
									</p>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{items.map((item) => (
										<div 
											key={item._id} 
											className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20 overflow-hidden"
										>
											<div className="p-6">
												{/* Status and Category */}
												<div className="flex justify-between items-center mb-4">
													<span className={`px-3 py-1 rounded-full text-sm font-semibold ${
														item.status === "lost" 
															? "bg-gradient-to-r from-red-500 to-pink-500 text-white" 
															: "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
													}`}>
														{item.status === "lost" ? "🔍 LOST" : "✅ FOUND"}
													</span>
													<span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">
														{item.category}
													</span>
												</div>
												
												{/* Title */}
												<h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
													{item.title}
												</h3>
												
												{/* Description */}
												<p className="text-gray-600 mb-4 line-clamp-3">
													{item.description.length > 120 
														? `${item.description.substring(0, 120)}...` 
														: item.description
													}
												</p>
												
												{/* Details */}
												<div className="space-y-2 mb-6">
													<div className="flex items-center text-sm text-gray-500">
														<span className="mr-2">📍</span>
														<span className="truncate">{item.location.address}</span>
													</div>
													<div className="flex items-center text-sm text-gray-500">
														<span className="mr-2">👤</span>
														<span>{item.user.name}</span>
													</div>
													<div className="flex items-center text-sm text-gray-500">
														<span className="mr-2">📅</span>
														<span>{new Date(item.createdAt).toLocaleDateString()}</span>
													</div>
												</div>

												{/* View Button */}
												<Link 
													to={`/item/${item._id}`}
													className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 font-semibold text-center block"
												>
													View Details
												</Link>
											</div>
										</div>
									))}
								</div>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Dashboard;

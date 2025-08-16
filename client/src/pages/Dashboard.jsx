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
				<div className="loading-spinner"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
						Dashboard
					</h1>
					<p className="text-gray-600 text-lg">Browse lost and found items from our community</p>
				</div>
				
				{/* Quick Actions */}
				<div className="flex flex-wrap justify-center gap-4 mb-12">
					<Link 
						to="/post-lost" 
						className="btn btn-danger btn-lg"
					>
						📱 Post Lost Item
					</Link>
					<Link 
						to="/post-found" 
						className="btn btn-success btn-lg"
					>
						🔍 Post Found Item
					</Link>
				</div>

				{/* Filters */}
				<div className="filter-section p-6 mb-8">
					<h3 className="text-lg font-semibold mb-4 text-gray-800">Filter & Search</h3>
					<div className="filter-grid">
						<div className="form-group">
							<label className="form-label">Status</label>
							<select 
								value={filter} 
								onChange={(e) => setFilter(e.target.value)}
								className="form-select"
							>
								<option value="all">All Items</option>
								<option value="lost">Lost Items</option>
								<option value="found">Found Items</option>
							</select>
						</div>

						<div className="form-group">
							<label className="form-label">Category</label>
							<select 
								value={category} 
								onChange={(e) => setCategory(e.target.value)}
								className="form-select"
							>
								<option value="">All Categories</option>
								{categories.map(cat => (
									<option key={cat} value={cat}>
										{cat.charAt(0).toUpperCase() + cat.slice(1)}
									</option>
								))}
							</select>
						</div>

						<div className="form-group">
							<label className="form-label">Search</label>
							<input
								type="text"
								placeholder="Search items..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="form-input"
							/>
						</div>
					</div>
				</div>

				{/* Loading State */}
				{loading && (
					<div className="flex justify-center py-12">
						<div className="loading-spinner"></div>
					</div>
				)}

				{/* Items Grid */}
				{!loading && (
					<>
						{items.length === 0 ? (
							<div className="empty-state">
								<div className="empty-icon">📦</div>
								<h3 className="text-2xl font-semibold text-gray-700 mb-2">No items found</h3>
								<p className="text-gray-500 mb-6">Be the first to post an item in this category!</p>
								<div className="flex flex-wrap justify-center gap-4">
									<Link 
										to="/post-lost" 
										className="btn btn-danger"
									>
										Post Lost Item
									</Link>
									<Link 
										to="/post-found" 
										className="btn btn-success"
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
								<div className="items-grid">
									{items.map((item) => (
										<div 
											key={item._id} 
											className="card item-card"
										>
											<div className="card-body">
												{/* Status and Category */}
												<div className="flex justify-between items-center mb-4">
													<span className={`status-badge ${
														item.status === "lost" 
															? "status-lost" 
															: "status-found"
													}`}>
														{item.status === "lost" ? "🔍 LOST" : "✅ FOUND"}
													</span>
													<span className="category-badge">
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
												<div className="item-details">
													<div className="item-meta">
														<span className="item-meta-icon">📍</span>
														<span className="truncate">{item.location.address}</span>
													</div>
													<div className="item-meta">
														<span className="item-meta-icon">👤</span>
														<span>{item.user.name}</span>
													</div>
													<div className="item-meta">
														<span className="item-meta-icon">📅</span>
														<span>{new Date(item.createdAt).toLocaleDateString()}</span>
													</div>
												</div>

												{/* View Button */}
												<Link 
													to={`/item/${item._id}`}
													className="btn btn-primary w-full"
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

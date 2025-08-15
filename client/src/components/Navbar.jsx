import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/");
		setIsMenuOpen(false);
	};

	const closeMenu = () => setIsMenuOpen(false);

	return (
		<nav className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-md">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link 
						to="/" 
						className="text-2xl font-bold text-gray-800 hover:text-purple-600"
						onClick={closeMenu}
					>
						Lost & Found
					</Link>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center space-x-8">
						<Link 
							to="/" 
							className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-medium"
						>
							Home
						</Link>
						
						{user ? (
							<>
								<Link 
									to="/dashboard" 
									className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-medium"
								>
									Dashboard
								</Link>
								<Link 
									to="/post-lost" 
									className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-medium"
								>
									Post Lost
								</Link>
								<Link 
									to="/post-found" 
									className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-medium"
								>
									Post Found
								</Link>
								<button 
									onClick={handleLogout} 
									className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 font-medium"
								>
									Logout
								</button>
							</>
						) : (
							<>
								<Link 
									to="/login" 
									className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-medium"
								>
									Login
								</Link>
								<Link 
									to="/register" 
									className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 font-medium"
								>
									Register
								</Link>
							</>
						)}
					</div>

					{/* Mobile menu button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-800"
					>
						<svg 
							className="w-6 h-6" 
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
						>
							{isMenuOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden pb-4 border-t border-gray-200 mt-2 pt-4">
						<div className="flex flex-col space-y-3">
							<Link 
								to="/" 
								className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-medium py-2"
								onClick={closeMenu}
							>
								Home
							</Link>
							
							{user ? (
								<>
									<Link 
										to="/dashboard" 
										className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-medium py-2"
										onClick={closeMenu}
									>
										Dashboard
									</Link>
									<Link 
										to="/post-lost" 
										className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-medium py-2"
										onClick={closeMenu}
									>
										Post Lost
									</Link>
									<Link 
										to="/post-found" 
										className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-medium py-2"
										onClick={closeMenu}
									>
										Post Found
									</Link>
									<button 
										onClick={handleLogout} 
										className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-medium text-left"
									>
										Logout
									</button>
								</>
							) : (
								<>
									<Link 
										to="/login" 
										className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-medium py-2"
										onClick={closeMenu}
									>
										Login
									</Link>
									<Link 
										to="/register" 
										className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium text-center"
										onClick={closeMenu}
									>
										Register
									</Link>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;

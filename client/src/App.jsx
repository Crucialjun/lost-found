import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login/LoginPage";
import Register from "./pages/Register";
import PostLost from "./pages/PostLost";
import PostFound from "./pages/PostFound";
import ItemDetails from "./pages/ItemDetails";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="min-h-screen flex flex-col">
					<Navbar />
					<main className="flex-1">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/post-lost" element={<PostLost />} />
							<Route path="/post-found" element={<PostFound />} />
							<Route path="/item/:id" element={<ItemDetails />} />
							<Route path="/dashboard" element={<Dashboard />} />
						</Routes>
					</main>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;

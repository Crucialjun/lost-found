const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const C = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const userExists = await User.findOne({ email });
		if (userExists)
			return res.status(400).json({ message: "User already exists" });

		const user = await User.create({ name, email, password });
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		res.json({ token, user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Login user
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ message: "Invalid credentials" });

		const isMatch = await user.matchPassword(password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		res.json({ token, user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/refresh", C.refresh);
router.post("/logout", C.logout);
router.get("/me", requireAuth, C.me);

module.exports = router;

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { signAccess, signRefresh, verifyRefresh } = require("../utils/jwt");

function sendRefresh(res, token) {
  // httpOnly cookie for refresh
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    const access = signAccess({ id: user._id, email: user.email });
    const refresh = signRefresh({ id: user._id, email: user.email });
    sendRefresh(res, refresh);

    res.status(201).json({ user: { id: user._id, name, email }, access });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const access = signAccess({ id: user._id, email: user.email });
    const refresh = signRefresh({ id: user._id, email: user.email });
    sendRefresh(res, refresh);

    res.json({ user: { id: user._id, name: user.name, email: user.email }, access });
  } catch (e) { next(e); }
};

exports.refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "Missing refresh token" });
    const payload = verifyRefresh(token);
    const access = signAccess({ id: payload.id, email: payload.email });
    res.json({ access });
  } catch (e) { next({ status: 401, message: "Invalid/expired refresh" }); }
};

exports.logout = async (_req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("_id name email createdAt");
    res.json({ user });
  } catch (e) { next(e); }
};

const jwt = require("jsonwebtoken");

function requireAuth(req, _res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return next({ status: 401, message: "Missing token" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch {
    next({ status: 401, message: "Invalid/expired token" });
  }
}

module.exports = { requireAuth };

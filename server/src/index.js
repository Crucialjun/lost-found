const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
require("dotenv").config();

const app = express();

app.use(helmet());
app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (_req, res) =>
	res.json({ status: "ok", time: new Date().toISOString() })
);

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/items", require("./routes/items"));

// error handler
app.use((err, _req, res, _next) => {
	const status = err.status || 500;
	res.status(status).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI)
	.then(() =>
		app.listen(PORT, () => console.log(`API http://localhost:${PORT}`))
	)
	.catch((e) => {
		console.error("DB connection failed", e);
		process.exit(1);
	});

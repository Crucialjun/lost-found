const mongoose = require("mongoose");

async function connectDB(uri) {
  await mongoose.connect(uri, { autoIndex: true });
  console.log("MongoDB connected");
}
module.exports = { connectDB };

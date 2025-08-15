const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["lost", "found"], required: true },
    category: { 
      type: String, 
      enum: ["electronics", "clothing", "accessories", "documents", "keys", "pets", "other"], 
      required: true 
    },
    location: {
      address: { type: String, required: true },
      latitude: { type: Number },
      longitude: { type: Number }
    },
    dateFound: { type: Date },
    dateLost: { type: Date },
    images: [{ type: String }], // URLs to uploaded images
    contactInfo: {
      phone: { type: String },
      email: { type: String }
    },
    isResolved: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);

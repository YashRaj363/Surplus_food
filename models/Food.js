const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String },
  quantity: { type: Number, required: true },
  freshnessStatus: { type: String },
  location: { type: String, required: true },
  expiryTime: { type: Date, required: true },
  provider: { type: String },
  images: [{ type: String }],
  notes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // ADDED: Soft delete flag
  isClaimed: {
    type: Boolean,
    default: false,
  },
  // ADDED: Timestamp for when the food was claimed
  claimedAt: {
    type: Date,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Food", foodSchema);
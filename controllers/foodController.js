const Food = require("../models/Food");

exports.addFood = async (req, res) => {
  try {
    const { title, type, quantity, freshnessStatus, location, expiryTime, provider, notes } = req.body;

    if (!title || !quantity || !location || !expiryTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Handle multiple images
    const images = req.files ? req.files.map(file => file.filename) : [];

    const food = new Food({
      title,
      type,
      quantity,
      freshnessStatus,
      location,
      expiryTime,
      provider,
      notes,
      images, // <-- store array of images
      user: req.user.id
    });

    await food.save();
    res.status(201).json(food);
  } catch (err) {
    console.error("Add Food Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFood = async (req, res) => {
  try {
    // UPDATED: Now also filters out items where isClaimed is true
    const foods = await Food.find({
      expiryTime: { $gt: new Date() },
      claimedBy: { $exists: false },
      isClaimed: false // ADDED: Soft delete filter
    }).populate("user", "name email");

    res.json(foods);
  } catch (err) {
    console.error("Get Food Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.claimFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    // UPDATED: Check for the new isClaimed flag
    if (food.isClaimed || food.claimedBy) {
      return res.status(400).json({ message: "Food has already been claimed" });
    }

    if (food.user.toString() === req.user.id) {
      return res.status(400).json({ message: "You cannot claim your own listing" });
    }

    // UPDATED: Set both the claimedBy and soft delete flags
    food.claimedBy = req.user.id;
    food.isClaimed = true; // ADDED: Soft delete flag
    food.claimedAt = new Date(); // ADDED: Claim timestamp
    await food.save();

    // The frontend will now handle the redirect
    res.json(food);
  } catch (err) {
    console.error("Claim Food Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
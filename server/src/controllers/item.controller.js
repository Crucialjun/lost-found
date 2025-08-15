const Item = require("../models/Item");

// Get all items (with filtering)
const getItems = async (req, res) => {
  try {
    const { status, category, search } = req.query;
    
    let filter = { isResolved: false }; // Only show unresolved items
    
    if (status) filter.status = status;
    if (category) filter.category = category;
    
    let query = Item.find(filter).populate("user", "name email").sort({ createdAt: -1 });
    
    if (search) {
      query = query.where({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { "location.address": { $regex: search, $options: "i" } }
        ]
      });
    }
    
    const items = await query;
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single item
const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("user", "name email");
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new item
const createItem = async (req, res) => {
  try {
    const itemData = {
      ...req.body,
      user: req.user.id
    };
    
    const item = await Item.create(itemData);
    const populatedItem = await Item.findById(item._id).populate("user", "name email");
    
    res.status(201).json(populatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    // Check if user owns the item
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("user", "name email");
    
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    // Check if user owns the item
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark item as resolved
const markAsResolved = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    // Check if user owns the item
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    
    item.isResolved = true;
    await item.save();
    
    const updatedItem = await Item.findById(item._id).populate("user", "name email");
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's items
const getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  markAsResolved,
  getUserItems
};

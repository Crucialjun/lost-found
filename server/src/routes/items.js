const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  markAsResolved,
  getUserItems
} = require("../controllers/item.controller");

const router = express.Router();

// Public routes
router.get("/", getItems);
router.get("/:id", getItem);

// Protected routes
router.use(requireAuth);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.patch("/:id/resolve", markAsResolved);
router.get("/user/my-items", getUserItems);

module.exports = router;

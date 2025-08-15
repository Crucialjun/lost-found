const express = require("express");
const { body } = require("express-validator");
const C = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/register",
  [body("name").isLength({ min: 2 }), body("email").isEmail(), body("password").isLength({ min: 6 })],
  C.register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  C.login
);

router.post("/refresh", C.refresh);
router.post("/logout", C.logout);
router.get("/me", requireAuth, C.me);

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/user_profiles");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
module.exports = router; // ✅ Must export the router directly
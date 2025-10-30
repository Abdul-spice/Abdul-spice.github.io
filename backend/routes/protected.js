const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getProtectedData } = require("../controller/protectedController");

router.get("/", verifyToken, getProtectedData);

module.exports = router;
console.log("🔍 getProtectedData:", getProtectedData);
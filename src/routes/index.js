const express = require("express");
const userRoutes = require('./users');
const authRoutes = require('./auth');
const router = express.Router();

router.use("/api/users", userRoutes);
router.use("/api/login", authRoutes);

module.exports = router;
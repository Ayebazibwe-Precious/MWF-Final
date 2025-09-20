const express = require("express");
const router = express.Router();
const { ensureauthenticated, ensureAgent } = require("../middleware/auth");

const salesModel = require("../models/salesModel");
router.get("/salesEntry", (req, res) => {
  res.render("salesEntry");
});

module.exports = router;
